"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { useAuth } from "../AuthProvider";
import { TransfersByUser } from "@/generated/slskd-api";
import { enqueueDownloadsAction, getAllDownloadsAction, cancelDownloadAction } from "./actions";

export interface DownloadRequest {
  username: string;
  filename: string;
  size?: number;
}

interface DownloadsContextType {
  downloads: TransfersByUser[];
  loading: boolean;
  error: string | null;
  autoRefresh: boolean;
  activeTab: string;
  setAutoRefresh: (enabled: boolean) => void;
  setActiveTab: (tab: string) => void;
  setPageActive: (active: boolean) => void;
  enqueueDownloads: (username: string, files: DownloadRequest[]) => Promise<void>;
  refreshDownloads: () => Promise<void>;
  cancelDownload: (username: string, id: string, remove?: boolean) => Promise<void>;
}

const DownloadsContext = createContext<DownloadsContextType | undefined>(undefined);

export function useDownloads() {
  const context = useContext(DownloadsContext);
  if (!context) {
    throw new Error("useDownloads must be used within DownloadsProvider");
  }
  return context;
}

export function DownloadsProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [downloads, setDownloads] = useState<TransfersByUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeTab, setActiveTab] = useState("history");
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isPageActive, setIsPageActive] = useState(false);

  // Track page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    // Set initial state
    setIsPageVisible(!document.hidden);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const setPageActive = useCallback((active: boolean) => {
    setIsPageActive(active);
  }, []);

  const refreshDownloads = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getAllDownloadsAction(token);
      if (typeof result === "string") {
        setError(result);
        setDownloads([]);
      } else {
        setDownloads(result);
      }
    } catch (err) {
      setError(String(err));
      setDownloads([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Load downloads on mount
  useEffect(() => {
    if (token) {
      refreshDownloads();
    }
  }, [token, refreshDownloads]);

  // Auto-refresh downloads every 5 seconds
  useEffect(() => {
    if (!token || !autoRefresh || !isPageVisible || !isPageActive) return;

    const interval = setInterval(() => {
      refreshDownloads();
    }, 5000);

    return () => clearInterval(interval);
  }, [token, autoRefresh, isPageVisible, isPageActive, refreshDownloads]);

  const enqueueDownloads = async (username: string, files: DownloadRequest[]) => {
    if (!token) return;

    setError(null);

    try {
      const result = await enqueueDownloadsAction(token, username, files);
      if (typeof result === "string") {
        setError(result);
        throw new Error(result);
      }

      // Refresh downloads list after enqueueing
      await refreshDownloads();
    } catch (err) {
      setError(String(err));
      throw err;
    }
  };

  const cancelDownload = async (username: string, id: string, remove?: boolean) => {
    if (!token) return;

    setError(null);

    try {
      const result = await cancelDownloadAction(token, username, id, remove);
      if (typeof result === "string") {
        setError(result);
        throw new Error(result);
      }

      // Refresh downloads list after canceling
      await refreshDownloads();
    } catch (err) {
      setError(String(err));
      throw err;
    }
  };

  return (
    <DownloadsContext.Provider
      value={{
        downloads,
        loading,
        error,
        autoRefresh,
        activeTab,
        setAutoRefresh,
        setActiveTab,
        setPageActive,
        enqueueDownloads,
        refreshDownloads,
        cancelDownload,
      }}
    >
      {children}
    </DownloadsContext.Provider>
  );
}
