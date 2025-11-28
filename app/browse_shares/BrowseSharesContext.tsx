"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../AuthProvider";
import { browseUserSharesAction } from "./actions";
import { DirectoryTreeNode, findNodeByPath } from "@/lib/directories";

interface BrowseSharesContextType {
  username: string;
  filter?: string;
  tree: DirectoryTreeNode | null;
  loading: boolean;
  error: string | null;
  selectedDirectory: string | null;
  selectedFiles: Set<string>;
  setSelectedDirectory: (directory: string | null) => void;
  browseShares: (username: string, filter?: string) => Promise<void>;
  loadDirectoryChildren: (directoryPath: string) => Promise<void>;
  toggleFileSelection: (filename: string) => void;
  toggleDirectorySelection: (directoryPath: string) => void;
  clearSelection: () => void;
  selectAll: () => void;
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
  const [filter, setFilter] = useState<string | undefined>(searchParams?.get("filter") || undefined);
  const [tree, setTree] = useState<DirectoryTreeNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

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
      browseShares(urlUsername, urlFilter || undefined);
    }
  }, [token]); // Only run on mount when token is available

  const browseShares = async (newUsername: string, newFilter?: string) => {
    console.log(`browseShares username=${newUsername} filter=${newFilter}`);
    if (!token) return;

    const trimmedUsername = newUsername.trim();
    if (!trimmedUsername) return;

    // Reset state for new search
    if (trimmedUsername !== username) {
      setTree(null);
      setError(null);
    }

    setLoading(true);
    setUsername(trimmedUsername);
    setFilter(newFilter);

    // Update URL with new params
    updateURL(trimmedUsername, newFilter);

    try {
      // Load the root level of tree from the server (cached)
      const rootNodeDto = await browseUserSharesAction(token, {
        username: trimmedUsername,
        directoryPath: "",
        filter: newFilter,
        depth: newFilter ? undefined : 1,
      });

      if (typeof rootNodeDto === "string") {
        setError(rootNodeDto);
        setTree(null);
        return;
      }

      const rootNode = DirectoryTreeNode.fromPlain(rootNodeDto);
      console.log(`Loaded tree with ${rootNode.children.size} root directories`);

      setTree(rootNode);
    } catch (err) {
      setError(String(err));
      setTree(null);
    } finally {
      setLoading(false);
    }
  };

  const loadDirectoryChildren = async (directoryPath: string) => {
    if (!tree) {
      console.error("Cannot load directory children: tree is null");
      return;
    }
    let node = findNodeByPath(tree, directoryPath);
    if (!node) {
      console.error(`Node not found for ${directoryPath} when loading children`);
      return;
    }

    const dto = await browseUserSharesAction(token!, {
      username,
      directoryPath,
      filter: filter,
      depth: filter ? undefined : 2,
    });
    if (typeof dto === "string") {
      setError(dto);
      console.error(`Failed to load children for ${directoryPath}: ${dto}`);
      return;
    }

    setError(null);
    const loadedNode = DirectoryTreeNode.fromPlain(dto);

    // Update the tree with loaded children, we need to clone to trigger reactivity
    const newTree = tree.clone();
    node = findNodeByPath(newTree, directoryPath);
    if (!node) {
      console.error(`Node disappeared for ${directoryPath} after cloning tree`);
      return;
    }
    // Update the node's children
    node.children = loadedNode.children;
    node.childrenLoaded = true;

    // Force a re-render by cloning the tree
    setTree(newTree);
  };

  const toggleFileSelection = (filename: string) => {
    setSelectedFiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(filename)) {
        newSet.delete(filename);
      } else {
        newSet.add(filename);
      }
      return newSet;
    });
  };

  const toggleDirectorySelection = (directoryPath: string) => {
    if (!tree) return;

    const node = findNodeByPath(tree, directoryPath);
    if (!node) return;

    setSelectedFiles((prev) => {
      const newSet = new Set(prev);
      const files = node.files || [];

      // Check if all files in this directory are already selected
      const allSelected = files.every((file) => file.filename && prev.has(file.filename));

      if (allSelected) {
        // Deselect all files in this directory
        files.forEach((file) => {
          if (file.filename) newSet.delete(file.filename);
        });
      } else {
        // Select all files in this directory
        files.forEach((file) => {
          if (file.filename) newSet.add(file.filename);
        });
      }

      return newSet;
    });
  };

  const clearSelection = () => {
    setSelectedFiles(new Set());
  };

  const selectAll = () => {
    if (!tree || !selectedDirectory) return;

    const node = findNodeByPath(tree, selectedDirectory);
    if (!node) return;

    const files = node.files || [];
    setSelectedFiles(new Set(files.map((f) => f.filename).filter((f): f is string => !!f)));
  };

  return (
    <BrowseSharesContext.Provider
      value={{
        username,
        filter,
        tree,
        loading,
        error,
        selectedDirectory,
        selectedFiles,
        setSelectedDirectory,
        browseShares,
        loadDirectoryChildren,
        toggleFileSelection,
        toggleDirectorySelection,
        clearSelection,
        selectAll,
      }}
    >
      {children}
    </BrowseSharesContext.Provider>
  );
}
