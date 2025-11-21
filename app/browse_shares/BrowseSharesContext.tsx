"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "../AuthProvider";
import { browseUserSharesAction } from "./actions";
import type { UsersBrowseResponse } from "@/generated/slskd-api";

interface BrowseSharesContextType {
  username: string;
  page: number;
  pageSize: number;
  filter?: string;
  result: UsersBrowseResponse | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  browseShares: (params: Partial<Parameters<typeof browseUserSharesAction>[1]> & { append?: boolean }) => Promise<void>;
  loadMore: () => Promise<void>;
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
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<UsersBrowseResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const browseShares = async (
    params: Partial<Parameters<typeof browseUserSharesAction>[1]> & { append?: boolean } = {}
  ) => {
    console.log(`browseShares ${JSON.stringify(params)}`);
    if (!token) return;

    const args: Parameters<typeof browseUserSharesAction>[1] = {
      username: (params.username ?? username)!.trim(),
      page: params.page ?? page,
      pageSize: params.pageSize ?? pageSize,
      filter: params.filter,
    };

    if (!args.username) {
      return;
    }

    // new search
    if (args.username != username) {
      args.page = 0;
      args.filter = undefined;
      setHasMore(true);
      setResult(null);
    }

    // filter changed
    if (args.filter != filter) {
      args.page = 0;
      setHasMore(true);
    }

    setLoading(true);
    setError(null);
    setUsername(args.username);
    setPage(args.page!);
    setPageSize(args.pageSize!);
    setFilter(args.filter);

    try {
      const result = await browseUserSharesAction(token, args);

      // Check if we have more data
      if (!result.directories || result.directories.length < args.pageSize!) {
        setHasMore(false);
      }

      // Handle pagination
      if (params.append) {
        setResult((prev) => ({
          ...result,
          directories: [...(prev?.directories || []), ...(result.directories || [])],
        }));
      } else {
        setResult(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to browse shares");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore || loading) return;
    await browseShares({ page: page + 1, append: true });
  };

  return (
    <BrowseSharesContext.Provider
      value={{
        username,
        page,
        pageSize,
        filter,
        result,
        loading,
        error,
        hasMore,
        browseShares,
        loadMore,
      }}
    >
      {children}
    </BrowseSharesContext.Provider>
  );
}
