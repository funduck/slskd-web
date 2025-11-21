"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "../AuthProvider";
import { browseUserSharesAction } from "./actions";
import type { Directory, UsersBrowseResponse } from "@/generated/slskd-api";

interface BrowseSharesContextType {
  username: string;
  result: UsersBrowseResponse | null;
  loading: boolean;
  error: string | null;
  browseShares: (username: string) => Promise<void>;
}

const BrowseSharesContext = createContext<BrowseSharesContextType | undefined>(undefined);

export function useBrowseShares() {
  const context = useContext(BrowseSharesContext);
  if (!context) {
    throw new Error("useBrowseShares must be used within BrowseSharesProvider");
  }
  return context;
}

export function BrowseSharesProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<UsersBrowseResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const browseShares = async (searchUsername: string) => {
    if (!searchUsername.trim() || !token) return;

    setLoading(true);
    setError(null);
    setUsername(searchUsername.trim());

    try {
      const result = await browseUserSharesAction(token, { username: searchUsername.trim() });
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to browse shares");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowseSharesContext.Provider
      value={{
        username,
        result,
        loading,
        error,
        browseShares,
      }}
    >
      {children}
    </BrowseSharesContext.Provider>
  );
}
