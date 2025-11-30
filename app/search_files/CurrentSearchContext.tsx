"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useRef, useEffect } from "react";
import { useAuth } from "../AuthProvider";
import { getAllSearchesAction, searchFilesAction, getSearchSummaryAction, getSearchUserFilesAction } from "./actions";
import { FileModel, Search } from "@/generated/slskd-api";

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

export interface UserFiles {
  files: FileModel[];
  filesMap: Map<string, FileModel>;
  lockedFiles: FileModel[];
  hasMore: boolean;
}

interface CurrentSearchContextType {
  searchQuery: string;
  userSummaries: UserSummary[];
  userFiles: Map<string, UserFiles>; // username -> files
  totalUsers: number;
  hasMoreUsers: boolean;
  loading: boolean;
  error: string | null;
  selectedFiles: Set<string>; // Set of filenames for current user (UI only)
  selectionForDownload: Map<string, Set<string>>; // username -> set of filepaths
  selectionTotalSize: number; // Total size in bytes of all selected files
  selectionTotalCount: number; // Total count of all selected files

  /** Start new search */
  performSearch: (query: string) => Promise<void>;

  /** Load a search results from history */
  loadSearch: (searchId: string) => Promise<void>;

  /** Load more user summaries for search results */
  loadMoreUsers: () => Promise<void>;

  /** Load files for a specific user in search results */
  loadUserFiles: (username: string) => Promise<void>;

  toggleFileSelection: (username: string, filepath: string) => void;

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
  const [userFiles, setUserFiles] = useState<Map<string, UserFiles>>(new Map());
  const [totalUsers, setTotalUsers] = useState(0);
  const [hasMoreUsers, setHasMoreUsers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [selectionForDownload, setSelectionForDownload] = useState<Map<string, Set<string>>>(new Map());
  const [selectionTotalSize, setSelectionTotalSize] = useState(0);
  const [selectionTotalCount, setSelectionTotalCount] = useState(0);

  // Use ref to keep stable reference to userFiles for callbacks
  const userFilesRef = useRef<Map<string, UserFiles>>(userFiles);

  // Keep ref in sync with state
  useEffect(() => {
    userFilesRef.current = userFiles;
  }, [userFiles]);

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

      setLoading(true);
      setError(null);
      setSearchQuery(trimmedQuery);
      setUserSummaries([]);
      setUserFiles(new Map());
      setSelectedFiles(new Set());
      setSelectionForDownload(new Map());

      const newSearchId = generateUUID();
      setSearchId(newSearchId);

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
      const result = await getSearchSummaryAction(token, searchId, {
        offset: userSummaries.length,
        limit: 20,
      });

      if (typeof result === "string") {
        setError(result);
      } else {
        // Filter out duplicate users before adding
        const usernamesSet = new Set(userSummaries.map((u) => u.username));
        const newUsers = result.users.filter((u) => !usernamesSet.has(u.username));

        setUserSummaries([...userSummaries, ...newUsers]);
        setTotalUsers(result.total);
        setHasMoreUsers(result.hasMore);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [token, searchId, userSummaries.length]);

  const loadUserFiles = useCallback(
    async (username: string) => {
      if (!token || !searchId) return;

      // Check if already loaded using ref
      if (userFilesRef.current.has(username)) return;

      setLoading(true);
      setError(null);

      try {
        const result = await getSearchUserFilesAction(token, searchId, username, {
          offset: 0,
          limit: 100,
        });

        if (typeof result === "string") {
          setError(result);
        } else {
          setUserFiles((prev) => {
            const newMap = new Map(prev);
            newMap.set(username, {
              files: result.files,
              filesMap: new Map(result.files.map((file) => [file.filename || "", file])),
              lockedFiles: result.lockedFiles,
              hasMore: result.hasMore,
            });
            return newMap;
          });
        }
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    },
    [token, searchId] // Removed userFiles from deps
  );

  const toggleFileSelection = useCallback(
    (username: string, filepath: string) => {
      // Use ref to access current userFiles without adding it to dependencies
      const userFileData = userFilesRef.current.get(username);
      if (!userFileData) return;

      const file = userFileData.filesMap.get(filepath);
      const fileSize = file?.size || 0;

      setSelectionForDownload((prev) => {
        const newMap = new Map(prev);
        const userFilesSet = newMap.get(username);

        if (!userFilesSet) {
          // First selection for this user
          const newUserFilesSet = new Set([filepath]);
          newMap.set(username, newUserFilesSet);
          setSelectionTotalCount((c) => c + 1);
          setSelectionTotalSize((s) => s + fileSize);
          return newMap;
        }

        const newUserFilesSet = new Set(userFilesSet);
        const wasSelected = newUserFilesSet.has(filepath);

        if (wasSelected) {
          newUserFilesSet.delete(filepath);
          // Update size and count
          setSelectionTotalCount((c) => c - 1);
          setSelectionTotalSize((s) => s - fileSize);

          if (newUserFilesSet.size === 0) {
            newMap.delete(username);
          } else {
            newMap.set(username, newUserFilesSet);
          }
        } else {
          newUserFilesSet.add(filepath);
          // Update size and count
          setSelectionTotalCount((c) => c + 1);
          setSelectionTotalSize((s) => s + fileSize);
          newMap.set(username, newUserFilesSet);
        }

        return newMap;
      });
    },
    [] // Empty deps - function is now stable!
  );

  const clearSelection = useCallback(() => {
    setSelectedFiles(new Set());
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

      setLoading(true);
      setError(null);
      setSearchId(searchId);
      setUserSummaries([]);
      setUserFiles(new Map());
      setSelectedFiles(new Set());
      setSelectionForDownload(new Map());

      try {
        // Load first page of user summaries
        const result = await getSearchSummaryAction(token, searchId, {
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
        userFiles,
        totalUsers,
        hasMoreUsers,
        loading,
        error,
        selectedFiles,
        selectionForDownload,
        selectionTotalSize,
        selectionTotalCount,
        performSearch,
        loadSearch,
        loadMoreUsers,
        loadUserFiles,
        toggleFileSelection,
        clearSelection,
      }}
    >
      {children}
    </CurrentSearchContext.Provider>
  );
}
