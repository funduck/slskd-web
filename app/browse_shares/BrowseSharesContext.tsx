"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "../AuthProvider";
import { browseUserSharesAction } from "./actions";
import { DirectoryTreeNode, findNodeByPath } from "@/lib/directories";

interface BrowseSharesContextType {
  username: string;
  filter?: string;
  tree: DirectoryTreeNode | null;
  loading: boolean;
  error: string | null;

  /** Currently selected directory path */
  selectedDirectory: string | null;

  /** Set of filenames selected in the current directory */
  selectedFiles: Set<string>;

  /** Map of directoryPath to set of filenames selected for download */
  selectionForDownload: Map<string, Set<string>>;

  /** Sets the currently selected directory */
  setSelectedDirectory: (directory: string | null) => void;

  /** Loads user shares for the given username and optional filter */
  browseShares: (username: string, filter?: string) => Promise<void>;

  /** Loads children directories for the given directory path */
  loadDirectoryChildren: (directoryPath: string) => Promise<void>;

  /** Toggles selection of a file in the current directory */
  toggleFileSelection: (filename: string) => void;

  /** Toggles selection of all files in a directory */
  toggleDirectorySelection: (directoryPath: string) => void;

  /** Clears all selected files */
  clearAllSelection: () => void;

  /** Selects all files in the current directory */
  selectAllInDirectory: () => void;

  /** Deselects all files in the current directory */
  deselectAllInDirectory: () => void;
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
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [tree, setTree] = useState<DirectoryTreeNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [selectionForDownload, setSelectionForDownload] = useState<Map<string, Set<string>>>(new Map());

  // Sync selectedFiles with selectionForDownload when directory changes
  useEffect(() => {
    if (selectedDirectory) {
      const filesInDir = selectionForDownload.get(selectedDirectory);
      if (filesInDir) {
        setSelectedFiles(new Set(filesInDir));
      } else {
        setSelectedFiles(new Set());
      }
    }
  }, [selectedDirectory, selectionForDownload]);

  const browseShares = async (newUsername: string, newFilter?: string) => {
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
    if (!selectedDirectory) return;

    setSelectedFiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(filename)) {
        newSet.delete(filename);
      } else {
        newSet.add(filename);
      }
      return newSet;
    });

    // Update selectionForDownload
    setSelectionForDownload((prev) => {
      const newMap = new Map(prev);
      const dirFiles = newMap.get(selectedDirectory) || new Set();
      const newDirFiles = new Set(dirFiles);

      if (newDirFiles.has(filename)) {
        newDirFiles.delete(filename);
      } else {
        newDirFiles.add(filename);
      }

      if (newDirFiles.size === 0) {
        newMap.delete(selectedDirectory);
      } else {
        newMap.set(selectedDirectory, newDirFiles);
      }

      return newMap;
    });
  };

  const toggleDirectorySelection = (directoryPath: string) => {
    if (!tree) return;

    const node = findNodeByPath(tree, directoryPath);
    if (!node) return;

    const files = node.files || [];
    const allSelected = files.every((file) => {
      const dirFiles = selectionForDownload.get(directoryPath);
      return file.filename && dirFiles?.has(file.filename);
    });

    setSelectionForDownload((prev) => {
      const newMap = new Map(prev);

      if (allSelected) {
        // Deselect all files in this directory
        newMap.delete(directoryPath);
      } else {
        // Select all files in this directory
        const fileSet = new Set(files.map((f) => f.filename).filter((f): f is string => !!f));
        newMap.set(directoryPath, fileSet);
      }

      return newMap;
    });

    // Update selectedFiles if this is the current directory
    if (directoryPath === selectedDirectory) {
      if (allSelected) {
        setSelectedFiles(new Set());
      } else {
        setSelectedFiles(new Set(files.map((f) => f.filename).filter((f): f is string => !!f)));
      }
    }
  };

  const clearAllSelection = () => {
    setSelectedFiles(new Set());
    setSelectionForDownload(new Map());
  };

  const selectAllInDirectory = () => {
    if (!tree || !selectedDirectory) return;

    const node = findNodeByPath(tree, selectedDirectory);
    if (!node) return;

    const files = node.files || [];
    const fileSet = new Set(files.map((f) => f.filename).filter((f): f is string => !!f));

    setSelectedFiles(fileSet);

    setSelectionForDownload((prev) => {
      if (!fileSet.size) return prev;

      const newMap = new Map(prev);
      newMap.set(selectedDirectory, fileSet);
      return newMap;
    });
  };

  const deselectAllInDirectory = () => {
    if (!selectedDirectory) return;

    // Clear selectedFiles for current directory
    setSelectedFiles(new Set());

    // Remove current directory from selectionForDownload
    setSelectionForDownload((prev) => {
      const newMap = new Map(prev);
      newMap.delete(selectedDirectory);
      return newMap;
    });
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
        selectionForDownload,
        setSelectedDirectory,
        browseShares,
        loadDirectoryChildren,
        toggleFileSelection,
        toggleDirectorySelection,
        clearAllSelection,
        selectAllInDirectory,
        deselectAllInDirectory,
      }}
    >
      {children}
    </BrowseSharesContext.Provider>
  );
}
