"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useAuth } from "../AuthProvider";
import { getAllSearchesAction } from "./actions";
import type { SearchModel } from "@/lib/api-types";

interface SearchesHistoryContextType {
  searches: SearchModel[];
  loading: boolean;
  error?: string | null;

  /** Refresh the list of saved searches */
  refreshSearches: () => Promise<void>;

  /** Load a specific search (updates URL and triggers load) */
  loadSearchById: (searchId: string) => void;
}

const SearchesHistoryContext = createContext<SearchesHistoryContextType | undefined>(undefined);

export function useSearchesHistory() {
  const context = useContext(SearchesHistoryContext);
  if (!context) {
    throw new Error("useSearchesHistory must be used within SearchesHistoryProvider");
  }
  return context;
}

export function SearchesHistoryProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [searches, setSearches] = useState<SearchModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshSearches = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getAllSearchesAction(token);
      if (typeof result === "string") {
        setError(result);
      } else {
        setSearches(result);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [token]);

  const loadSearchById = useCallback((searchId: string | null) => {
    // Set searchId in URL
    const params = new URLSearchParams(window.location.search);
    if (searchId) {
      params.set("searchId", searchId);
    } else {
      params.delete("searchId");
    }
    const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
    window.history.replaceState({}, "", newUrl);
  }, []);

  return (
    <SearchesHistoryContext.Provider
      value={{
        searches,
        loading,
        error,
        refreshSearches,
        loadSearchById,
      }}
    >
      {children}
    </SearchesHistoryContext.Provider>
  );
}
