"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../AuthProvider";
import { browseUserSharesAction } from "./actions";
import { UsersBrowseResponse } from "@/generated/slskd-api";

interface BrowseSharesContextType {
  username: string;
  page: number;
  pageSize: number;
  filter?: string;
  result: UsersBrowseResponse | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  selectedDirectory: string | null;
  setSelectedDirectory: (directory: string | null) => void;
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState(searchParams?.get("username") || "");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [filter, setFilter] = useState<string | undefined>(searchParams?.get("filter") || undefined);
  const [result, setResult] = useState<UsersBrowseResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);

  // Update URL when username or filter changes
  const updateURL = (newUsername: string, newFilter?: string) => {
    const params = new URLSearchParams();
    if (newUsername) {
      params.set("username", newUsername);
    }
    if (newFilter) {
      params.set("filter", newFilter);
    }
    router.push(`/browse_shares?${params.toString()}`, { scroll: false });
  };

  // Load shares on initial mount if URL params exist
  useEffect(() => {
    const urlUsername = searchParams?.get("username");
    const urlFilter = searchParams?.get("filter");

    if (urlUsername && token) {
      browseShares({
        username: urlUsername,
        filter: urlFilter || undefined,
      });
    }
  }, [token]); // Only run on mount when token is available

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

    // Update URL with new params
    updateURL(args.username, args.filter);

    try {
      const result = await browseUserSharesAction(token, args);
      if (typeof result === "string") {
        setResult(null);
        setError(result);
        return;
      }

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
      setError(String(err));
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
        selectedDirectory,
        setSelectedDirectory,
        browseShares,
        loadMore,
      }}
    >
      {children}
    </BrowseSharesContext.Provider>
  );
}
