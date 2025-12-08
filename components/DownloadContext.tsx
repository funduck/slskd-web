"use client";

import { useAuth } from "@/app/AuthProvider";
import { enqueueDownloadsAction } from "@/app/downloads/actions";
import { DownloadRequest } from "@/app/downloads/DownloadsContext";
import { createContext, useContext, useRef, useState } from "react";

export interface FileForDownloadType {
  // Property name is intentionally different from FileModel to avoid confusion
  // because filename in FileModel is just the name, not the full path
  fullpath: string;

  size?: number;
}

interface DownloadContextType {
  loading: boolean;
  error: string | null;

  /** Statistics about the selected files */
  stats: { count: number; size: number };

  /** Get all selected files grouped by username */
  getSelectedFiles: () => Map<string, Map<string, FileForDownloadType>>;

  /** Modify the selection of files to download */
  addFilesToSelection: (username: string, files: FileForDownloadType[]) => void;
  /** Modify the selection of files to download */
  removeFilesFromSelection: (username: string, files: FileForDownloadType[]) => void;
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
  const files = useRef(new Map<string, Map<string, FileForDownloadType>>());

  const modifyFilesToSelection = (op: "add" | "remove", username: string, filesToModify: FileForDownloadType[]) => {
    console.log(`Modifying files to selection: ${op}`, { username, filesToModify });
    if (!files.current.has(username)) {
      files.current.set(username, new Map());
    }
    const userFiles = files.current.get(username)!;
    for (const file of filesToModify) {
      const key = file.fullpath || "";
      if (op === "add") {
        userFiles.set(key, file);
      } else if (op === "remove") {
        userFiles.delete(key);
      }
    }
    const modifyCount = filesToModify.length * (op === "add" ? 1 : -1);
    const modifySize = filesToModify.reduce((acc, file) => acc + (file.size || 0), 0) * (op === "add" ? 1 : -1);
    console.log(`Updated selection for ${username}: count change ${modifyCount}, size change ${modifySize}`);
    setStats((prevStats) => ({
      count: prevStats.count + modifyCount,
      size: prevStats.size + modifySize,
    }));
  };

  const addFilesToSelection = (username: string, filesToAdd: FileForDownloadType[]) => {
    modifyFilesToSelection("add", username, filesToAdd);
  };

  const removeFilesFromSelection = (username: string, filesToRemove: FileForDownloadType[]) => {
    modifyFilesToSelection("remove", username, filesToRemove);
  };

  const getSelectedFiles = () => {
    return files.current;
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
          downloadRequests.push({ username, filename: file.fullpath || "", size: file.size });
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
        getSelectedFiles,
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
