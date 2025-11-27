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
  setSelectedDirectory: (directory: string | null) => void;
  browseShares: (username: string, filter?: string) => Promise<void>;
  loadDirectoryChildren: (directoryPath: string) => Promise<void>;
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

  return (
    <BrowseSharesContext.Provider
      value={{
        username,
        filter,
        tree,
        loading,
        error,
        selectedDirectory,
        setSelectedDirectory,
        browseShares,
        loadDirectoryChildren,
      }}
    >
      {children}
    </BrowseSharesContext.Provider>
  );
}
