"use client";

import { useAuth } from "@/app/AuthProvider";
import { enqueueDownloadsAction } from "@/app/downloads/actions";
import { DownloadRequest } from "@/app/downloads/DownloadsContext";
import { FileModel } from "@/generated/slskd-api";
import { createContext, useContext, useRef, useState } from "react";

interface DownloadContextType {
  loading: boolean;
  error: string | null;

  /** Statistics about the selected files */
  stats: { count: number; size: number };

  /** Modify the selection of files to download */
  addFilesToSelection: (username: string, files: FileModel[]) => void;
  /** Modify the selection of files to download */
  removeFilesFromSelection: (username: string, files: FileModel[]) => void;
  /** Enqueue all selected files for download */
  enqueueSelection: () => Promise<void>;

  /** Enqueue specific files for download */
  enqueueDownloads: (username: string, files: DownloadRequest[]) => Promise<void>;
}

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export function useDownload() {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error("useDownload must be used within DownloadProvider");
  }
  return context;
}

export function DownloadProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    count: 0,
    size: 0,
  });
  const files = useRef(new Map<string, Map<string, FileModel>>());

  const modifyFilesToSelection = (op: "add" | "remove", username: string, filesToModify: FileModel[]) => {
    if (!files.current.has(username)) {
      files.current.set(username, new Map());
    }
    const userFiles = files.current.get(username)!;
    for (const file of filesToModify) {
      const key = file.filename || "";
      if (op === "add") {
        userFiles.set(key, file);
      } else if (op === "remove") {
        userFiles.delete(key);
      }
    }
    setStats((prevStats) => ({
      count: prevStats.count + filesToModify.length * (op === "add" ? 1 : -1),
      size: prevStats.size + filesToModify.reduce((acc, file) => acc + (file.size || 0), 0) * (op === "add" ? 1 : -1),
    }));
  };

  const addFilesToSelection = (username: string, filesToAdd: FileModel[]) => {
    modifyFilesToSelection("add", username, filesToAdd);
  };

  const removeFilesFromSelection = (username: string, filesToRemove: FileModel[]) => {
    modifyFilesToSelection("remove", username, filesToRemove);
  };

  const enqueueSelection = async () => {
    if (!token) return;

    setLoading(true);
    setError(null);
    const newStats = { ...stats };

    try {
      for (const [username, userFiles] of files.current) {
        const downloadRequests: DownloadRequest[] = [];
        for (const file of userFiles.values()) {
          downloadRequests.push({ username, filename: file.filename || "", size: file.size });
        }
        if (downloadRequests.length > 0) {
          const result = await enqueueDownloadsAction(token, username, downloadRequests);
          if (typeof result === "string") {
            throw new Error(result);
          }
          console.log(`Enqueued ${downloadRequests.length} downloads for ${username}`);
          files.current.delete(username);
          newStats.count -= downloadRequests.length;
          newStats.size -= downloadRequests.reduce((acc, file) => acc + (file.size || 0), 0);
        }
      }
    } catch (err) {
      setError(String(err));
      throw err;
    } finally {
      setStats(newStats);
      setLoading(false);
    }
  };

  const enqueueDownloads = async (username: string, files: DownloadRequest[]) => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const result = await enqueueDownloadsAction(token, username, files);
      if (typeof result === "string") {
        setError(result);
        throw new Error(result);
      }
      setLoading(false);
    } catch (err) {
      setError(String(err));
      setLoading(false);
      throw err;
    }
  };

  return (
    <DownloadContext.Provider
      value={{
        loading,
        error,
        stats,
        addFilesToSelection,
        removeFilesFromSelection,
        enqueueSelection,
        enqueueDownloads,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
}
