"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useRef, useEffect } from "react";
import { useAuth } from "../AuthProvider";
import {
  getAllSearchesAction,
  searchFilesAction,
  getSearchTreeSummaryAction,
  getSearchUserTreeAction,
} from "./actions";
import { FileModel, Search } from "@/generated/slskd-api";
import { DirectoryTreeNode, DirectoryTreeNodeDto } from "@/lib/directories";

// Simple UUID generator
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface UserSummary {
  username: string;
  fileCount: number;
  lockedFileCount: number;
  hasFreeUploadSlot: boolean;
  uploadSpeed: number;
  queueLength: number;
}

export interface UserTree {
  tree: DirectoryTreeNode;
  filter?: string;
}

interface CurrentSearchContextType {
  searchQuery: string;
  userSummaries: UserSummary[];
  userTrees: Map<string, UserTree>; // username -> tree
  totalUsers: number;
  hasMoreUsers: boolean;
  loading: boolean;
  error: string | null;
  selectionForDownload: Map<string, Set<string>>; // username -> set of filepaths
  selectionTotalSize: number; // Total size in bytes of all selected files
  selectionTotalCount: number; // Total count of all selected files

  /** Start new search */
  performSearch: (query: string) => Promise<void>;

  /** Load a search results from history */
  loadSearch: (searchId: string) => Promise<void>;

  /** Load more user summaries for search results */
  loadMoreUsers: () => Promise<void>;

  /** Load tree for a specific user in search results */
  loadUserTree: (username: string, filter?: string) => Promise<void>;

  /** Load directory children for lazy loading */
  loadDirectoryChildren: (username: string, path: string) => Promise<void>;

  /** Apply filter to user tree */
  applyUserFilter: (username: string, filter?: string) => Promise<void>;

  addFilesToSelection: (username: string, files: FileModel[]) => void;
  removeFilesFromSelection: (username: string, files: FileModel[]) => void;

  clearSelection: () => void;
}

const CurrentSearchContext = createContext<CurrentSearchContextType | undefined>(undefined);

export function useCurrentSearch() {
  const context = useContext(CurrentSearchContext);
  if (!context) {
    throw new Error("useSearchFiles must be used within SearchProvider");
  }
  return context;
}

export function CurrentSearchProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchId, setSearchId] = useState<string | null>(null);
  const [userSummaries, setUserSummaries] = useState<UserSummary[]>([]);
  const [userTrees, setUserTrees] = useState<Map<string, UserTree>>(new Map());
  const [totalUsers, setTotalUsers] = useState(0);
  const [hasMoreUsers, setHasMoreUsers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectionForDownload, setSelectionForDownload] = useState<Map<string, Set<string>>>(new Map());
  const [selectionTotalSize, setSelectionTotalSize] = useState(0);
  const [selectionTotalCount, setSelectionTotalCount] = useState(0);

  // Use ref to keep stable reference to userTrees for callbacks
  const userTreesRef = useRef<Map<string, UserTree>>(userTrees);
  // Track the currently loaded searchId to avoid reloading
  const loadedSearchIdRef = useRef<string | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    userTreesRef.current = userTrees;
  }, [userTrees]);

  const performSearch = useCallback(
    async (query: string) => {
      if (!token) {
        setError("Not authenticated");
        return;
      }

      const trimmedQuery = query.trim();
      if (!trimmedQuery) {
        setError("Search query cannot be empty");
        return;
      }

      console.debug("CurrentSearchContext performing search with query:", trimmedQuery);

      setLoading(true);
      setError(null);
      setSearchQuery(trimmedQuery);
      setUserSummaries([]);
      setUserTrees(new Map());
      setSelectionForDownload(new Map());

      const newSearchId = generateUUID();
      setSearchId(newSearchId);
      // Reset the loaded search ID since we're starting a new search
      loadedSearchIdRef.current = null;

      try {
        const result = await searchFilesAction(token, {
          id: newSearchId,
          search_text: trimmedQuery,
        });

        if (typeof result === "string") {
          setError(result);
        }
        // NOTE: The search is initiated asynchronously
        // We'll load results separately using loadMoreUsers()
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const loadMoreUsers = useCallback(async () => {
    if (!token || !searchId) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getSearchTreeSummaryAction(token, searchId, {
        offset: userSummaries.length,
        limit: 20,
      });

      if (typeof result === "string") {
        setError(result);
      } else {
        // Filter out duplicate users before adding
        const usernamesSet = new Set(userSummaries.map((u) => u.username));
        const newUsers = result.users.filter((u: UserSummary) => !usernamesSet.has(u.username));

        setUserSummaries([...userSummaries, ...newUsers]);
        setTotalUsers(result.total);
        setHasMoreUsers(result.hasMore);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [token, searchId, userSummaries]);

  const loadUserTree = useCallback(
    async (username: string, filter?: string) => {
      if (!token || !searchId) return;

      // Check if already loaded using ref
      if (userTreesRef.current.has(username) && !filter) return;

      console.debug("CurrentSearchContext loading user tree for:", { username, filter });

      setLoading(true);
      setError(null);

      try {
        const result = await getSearchUserTreeAction(token, searchId, username, {
          directoryPath: "",
          filter,
        });

        if (typeof result === "string") {
          setError(result);
        } else {
          const tree = DirectoryTreeNode.fromPlain(result);
          setUserTrees((prev) => {
            const newMap = new Map(prev);
            newMap.set(username, { tree, filter });
            return newMap;
          });
        }
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    },
    [token, searchId]
  );

  const loadDirectoryChildren = useCallback(
    async (username: string, path: string) => {
      if (!token || !searchId) return;

      const userTree = userTreesRef.current.get(username);
      if (!userTree) return;

      console.debug("CurrentSearchContext loading directory children for:", { username, path });

      setLoading(true);
      setError(null);

      try {
        const result = await getSearchUserTreeAction(token, searchId, username, {
          directoryPath: path,
          filter: userTree.filter,
        });

        if (typeof result === "string") {
          setError(result);
        } else {
          // Merge the new children into the existing tree
          const node = DirectoryTreeNode.fromPlain(result);
          // Note: In a real implementation, we'd merge this into the existing tree
          // For now, we'll just update the whole tree
          setUserTrees((prev) => {
            const newMap = new Map(prev);
            newMap.set(username, { tree: userTree.tree, filter: userTree.filter });
            return newMap;
          });
        }
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    },
    [token, searchId]
  );

  const applyUserFilter = useCallback(
    async (username: string, filter?: string) => {
      await loadUserTree(username, filter);
    },
    [loadUserTree]
  );

  const addFilesToSelection = useCallback((username: string, files: FileModel[]) => {
    console.debug("CurrentSearchContext adding files to selection:", { username, files });
    const newMap = new Map(selectionForDownload);
    const userFilesSet = newMap.get(username) || new Set<string>();
    const newUserFilesSet = new Set(userFilesSet);

    let addedSize = 0;
    let addedCount = 0;

    for (const file of files) {
      if (file.filename && !newUserFilesSet.has(file.filename)) {
        newUserFilesSet.add(file.filename);
        addedSize += file.size || 0;
        addedCount++;
      }
    }

    if (addedCount > 0) {
      newMap.set(username, newUserFilesSet);
      console.debug("CurrentSearchContext updating selection stats:", { addedCount, addedSize });
      setSelectionTotalCount((c) => c + addedCount);
      setSelectionTotalSize((s) => s + addedSize);
    }

    setSelectionForDownload(newMap);
  }, []);

  const removeFilesFromSelection = useCallback((username: string, files: FileModel[]) => {
    console.debug("CurrentSearchContext removing files from selection:", { username, files });

    const newMap = new Map(selectionForDownload);
    const userFilesSet = newMap.get(username);
    if (!userFilesSet) return;

    const newUserFilesSet = new Set(userFilesSet);
    let removedSize = 0;
    let removedCount = 0;

    for (const file of files) {
      if (file.filename && newUserFilesSet.has(file.filename)) {
        newUserFilesSet.delete(file.filename);
        removedSize += file.size || 0;
        removedCount++;
      }
    }

    if (removedCount > 0) {
      if (newUserFilesSet.size === 0) {
        newMap.delete(username);
      } else {
        newMap.set(username, newUserFilesSet);
      }
      console.debug("CurrentSearchContext updating selection stats:", { removedCount, removedSize });
      setSelectionTotalCount((c) => c - removedCount);
      setSelectionTotalSize((s) => s - removedSize);
    }

    setSelectionForDownload(newMap);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectionForDownload(new Map());
    setSelectionTotalSize(0);
    setSelectionTotalCount(0);
  }, []);

  const loadSearch = useCallback(
    async (searchId: string) => {
      if (!token) {
        setError("Not authenticated");
        return;
      }

      if (!searchId) {
        setError("Invalid search ID");
        return;
      }

      // Don't reload if already loaded
      if (loadedSearchIdRef.current === searchId) {
        return;
      }

      console.debug("CurrentSearchContext loading search from history:", { searchId });

      setLoading(true);
      setError(null);
      setSearchId(searchId);
      setUserSummaries([]);
      setUserTrees(new Map());
      setSelectionForDownload(new Map());

      try {
        // Load first page of user summaries
        const result = await getSearchTreeSummaryAction(token, searchId, {
          offset: 0,
          limit: 20,
        });

        if (typeof result === "string") {
          setError(result);
        } else {
          setSearchQuery(result.search_text || "");
          setUserSummaries(result.users);
          setTotalUsers(result.total);
          setHasMoreUsers(result.hasMore);
          // Mark this search as loaded
          loadedSearchIdRef.current = searchId;
        }
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return (
    <CurrentSearchContext.Provider
      value={{
        searchQuery,
        userSummaries,
        userTrees,
        totalUsers,
        hasMoreUsers,
        loading,
        error,
        selectionForDownload,
        selectionTotalSize,
        selectionTotalCount,
        performSearch,
        loadSearch,
        loadMoreUsers,
        loadUserTree,
        loadDirectoryChildren,
        applyUserFilter,
        addFilesToSelection,
        removeFilesFromSelection,
        clearSelection,
      }}
    >
      {children}
    </CurrentSearchContext.Provider>
  );
}
