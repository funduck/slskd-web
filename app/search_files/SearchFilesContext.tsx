"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useAuth } from "../AuthProvider";
import {
  getAllSearchesAction,
  searchFilesAction,
  getSearchUserSummariesAction,
  getSearchUserFilesAction,
} from "./actions";
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

interface SearchFilesContextType {
  searchQuery: string;
  searchId: string | null;
  userSummaries: UserSummary[];
  userFiles: Map<string, UserFiles>; // username -> files
  totalUsers: number;
  hasMoreUsers: boolean;
  searches: Search[];
  activeTab: string;
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

  /** Refresh the list of saved searches */
  refreshSearches: () => Promise<void>;

  toggleFileSelection: (username: string, filepath: string) => void;

  clearSelection: () => void;

  /** Switch between searches history and current search results */
  setActiveTab: (tab: string) => void;
}

const SearchFilesContext = createContext<SearchFilesContextType | undefined>(undefined);

export function useSearchFiles() {
  const context = useContext(SearchFilesContext);
  if (!context) {
    throw new Error("useSearchFiles must be used within SearchProvider");
  }
  return context;
}

export function SearchFilesProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchId, setSearchId] = useState<string | null>(null);
  const [userSummaries, setUserSummaries] = useState<UserSummary[]>([]);
  const [userFiles, setUserFiles] = useState<Map<string, UserFiles>>(new Map());
  const [totalUsers, setTotalUsers] = useState(0);
  const [hasMoreUsers, setHasMoreUsers] = useState(false);
  const [searches, setSearches] = useState<Search[]>([]);
  const [activeTab, setActiveTab] = useState("history");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [selectionForDownload, setSelectionForDownload] = useState<Map<string, Set<string>>>(new Map());
  const [selectionTotalSize, setSelectionTotalSize] = useState(0);
  const [selectionTotalCount, setSelectionTotalCount] = useState(0);

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
      setActiveTab("current");

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
      const result = await getSearchUserSummariesAction(token, searchId, {
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

      // Check if already loaded
      if (userFiles.has(username)) return;

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
    [token, searchId, userFiles]
  );

  const toggleFileSelection = useCallback(
    (username: string, filepath: string) => {
      // Find the file to get its size
      const userFileData = userFiles.get(username);
      if (!userFileData) return;

      const file = userFileData.filesMap.get(filepath);
      const fileSize = file?.size || 0;

      setSelectionForDownload((prev) => {
        const newMap = new Map(prev);
        const userFilesSet = newMap.get(username) || new Set();
        const newUserFilesSet = new Set(userFilesSet);
        const wasSelected = newUserFilesSet.has(filepath);

        if (wasSelected) {
          newUserFilesSet.delete(filepath);
          // Update size and count
          setSelectionTotalCount((c) => c - 1);
          setSelectionTotalSize((s) => s - fileSize);
        } else {
          newUserFilesSet.add(filepath);
          // Update size and count
          setSelectionTotalCount((c) => c + 1);
          setSelectionTotalSize((s) => s + fileSize);
        }

        if (newUserFilesSet.size === 0) {
          newMap.delete(username);
        } else {
          newMap.set(username, newUserFilesSet);
        }

        return newMap;
      });

      // Update selectedFiles for UI (for current user's accordion)
      setSelectedFiles((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(filepath)) {
          newSet.delete(filepath);
        } else {
          newSet.add(filepath);
        }
        return newSet;
      });
    },
    [userFiles]
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
        // Find the search in the searches list to get the query
        const search = searches.find((s) => s.id === searchId);
        if (search?.search_text) {
          setSearchQuery(search.search_text);
        }

        // Load first page of user summaries
        const result = await getSearchUserSummariesAction(token, searchId, {
          offset: 0,
          limit: 20,
        });

        if (typeof result === "string") {
          setError(result);
        } else {
          setUserSummaries(result.users);
          setTotalUsers(result.total);
          setHasMoreUsers(result.hasMore);
          setActiveTab("current");
        }
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    },
    [token, searches]
  );

  return (
    <SearchFilesContext.Provider
      value={{
        searchQuery,
        searchId,
        userSummaries,
        userFiles,
        totalUsers,
        hasMoreUsers,
        searches,
        activeTab,
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
        refreshSearches,
        setActiveTab,
      }}
    >
      {children}
    </SearchFilesContext.Provider>
  );
}
