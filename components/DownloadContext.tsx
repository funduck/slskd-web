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

  /** Get all selected files grouped by username and directory */
  getSelectedFiles: () => Map<string, Map<string, Map<string, FileForDownloadType>>>;

  /** Check if a specific file is selected */
  isFileSelected: (username: string, fullpath: string) => boolean;

  /** Get all selected files in a specific directory */
  getSelectedFilesInDirectory: (username: string, directoryPath: string) => FileForDownloadType[];

  /** Get set of selected filenames in a specific directory (for UI checkboxes) */
  getSelectedFilenamesInDirectory: (username: string, directoryPath: string) => Set<string>;

  /** Get selection summary for all directories for a user (for tree badges) */
  getSelectionSummaryForUser: (username: string) => Map<string, Set<string>>;

  /** Clear all selections */
  clearAllSelections: () => void;

  /** Modify the selection of files to download */
  addFilesToSelection: (username: string, directoryPath: string, files: FileForDownloadType[]) => void;
  /** Modify the selection of files to download */
  removeFilesFromSelection: (username: string, directoryPath: string, files: FileForDownloadType[]) => void;
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
  // Store selected files in a ref to avoid re-renders
  // Map<username, Map<directoryPath, Map<fullpath, FileForDownloadType>>>
  const files = useRef(new Map<string, Map<string, Map<string, FileForDownloadType>>>());

  const modifyFilesInSelection = (
    op: "add" | "remove",
    username: string,
    directoryPath: string,
    filesToModify: FileForDownloadType[]
  ) => {
    console.log(`Modifying files in selection: ${op}`, { username, directoryPath, filesToModify });

    // Ensure username map exists
    if (!files.current.has(username)) {
      files.current.set(username, new Map());
    }
    const userFiles = files.current.get(username)!;

    // Ensure directory map exists
    if (!userFiles.has(directoryPath)) {
      userFiles.set(directoryPath, new Map());
    }
    const directoryFiles = userFiles.get(directoryPath)!;

    // Modify files
    for (const file of filesToModify) {
      const key = file.fullpath || "";
      if (op === "add") {
        directoryFiles.set(key, file);
      } else if (op === "remove") {
        directoryFiles.delete(key);
      }
    }

    // Clean up empty maps
    if (directoryFiles.size === 0) {
      userFiles.delete(directoryPath);
    }
    if (userFiles.size === 0) {
      files.current.delete(username);
    }

    const modifyCount = filesToModify.length * (op === "add" ? 1 : -1);
    const modifySize = filesToModify.reduce((acc, file) => acc + (file.size || 0), 0) * (op === "add" ? 1 : -1);
    console.log(
      `Updated selection for ${username}/${directoryPath}: count change ${modifyCount}, size change ${modifySize}`
    );
    setStats((prevStats) => ({
      count: prevStats.count + modifyCount,
      size: prevStats.size + modifySize,
    }));
  };

  const addFilesToSelection = (username: string, directoryPath: string, filesToAdd: FileForDownloadType[]) => {
    modifyFilesInSelection("add", username, directoryPath, filesToAdd);
  };

  const removeFilesFromSelection = (username: string, directoryPath: string, filesToRemove: FileForDownloadType[]) => {
    modifyFilesInSelection("remove", username, directoryPath, filesToRemove);
  };

  const getSelectedFiles = () => {
    return files.current;
  };

  const isFileSelected = (username: string, fullpath: string): boolean => {
    const userFiles = files.current.get(username);
    if (!userFiles) return false;

    for (const directoryFiles of userFiles.values()) {
      if (directoryFiles.has(fullpath)) {
        return true;
      }
    }
    return false;
  };

  const getSelectedFilesInDirectory = (username: string, directoryPath: string): FileForDownloadType[] => {
    const userFiles = files.current.get(username);
    if (!userFiles) return [];

    const directoryFiles = userFiles.get(directoryPath);
    if (!directoryFiles) return [];

    return Array.from(directoryFiles.values());
  };

  const getSelectedFilenamesInDirectory = (username: string, directoryPath: string): Set<string> => {
    const userFiles = files.current.get(username);
    if (!userFiles) return new Set();

    const directoryFiles = userFiles.get(directoryPath);
    if (!directoryFiles) return new Set();

    // Extract just the filename from the fullpath
    const filenames = new Set<string>();
    for (const file of directoryFiles.values()) {
      const filename = file.fullpath.split("/").pop() || "";
      if (filename) {
        filenames.add(filename);
      }
    }
    return filenames;
  };

  const getSelectionSummaryForUser = (username: string): Map<string, Set<string>> => {
    const userFiles = files.current.get(username);
    if (!userFiles) return new Map();

    const summary = new Map<string, Set<string>>();
    for (const [directoryPath, directoryFiles] of userFiles) {
      const filenames = new Set<string>();
      for (const file of directoryFiles.values()) {
        const filename = file.fullpath.split("/").pop() || "";
        if (filename) {
          filenames.add(filename);
        }
      }
      summary.set(directoryPath, filenames);
    }
    return summary;
  };

  const clearAllSelections = () => {
    console.log("Clearing all selections");
    files.current.clear();
    setStats({ count: 0, size: 0 });
  };

  const enqueueSelection = async () => {
    if (!token) return;

    setLoading(true);
    setError(null);
    const newStats = { ...stats };

    try {
      for (const [username, userDirectories] of files.current) {
        const downloadRequests: DownloadRequest[] = [];

        // Flatten all files from all directories for this user
        for (const directoryFiles of userDirectories.values()) {
          for (const file of directoryFiles.values()) {
            downloadRequests.push({ username, filename: file.fullpath || "", size: file.size });
          }
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
        isFileSelected,
        getSelectedFilesInDirectory,
        getSelectedFilenamesInDirectory,
        getSelectionSummaryForUser,
        clearAllSelections,
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
