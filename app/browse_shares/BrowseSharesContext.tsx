"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../AuthProvider";
import { browseUserDirectoryAction } from "./actions";
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
      // Load the full tree from the server (cached)
      const rootNodeDto = await browseUserDirectoryAction(token, {
        username: trimmedUsername,
        directoryPath: "",
      });

      if (typeof rootNodeDto === "string") {
        setError(rootNodeDto);
        setTree(null);
        return;
      }

      const rootNode = DirectoryTreeNode.fromPlain(rootNodeDto);
      console.log(`Loaded tree with ${rootNode.children.size} root directories`);

      // Apply filter if needed
      if (newFilter) {
        const filtered = rootNode.filter({ name: newFilter });
        setTree(filtered);
      } else {
        setTree(rootNode);
      }
    } catch (err) {
      setError(String(err));
      setTree(null);
    } finally {
      setLoading(false);
    }
  };

  const loadDirectoryChildren = async (directoryPath: string) => {
    // With the full tree cached on initial load, we don't need to load children
    // They're already in the tree structure
    console.log(`Children for ${directoryPath} already in tree`);

    // Mark the node as having loaded children
    if (tree) {
      const node = findNodeByPath(tree, directoryPath);
      if (node) {
        node.childrenLoaded = true;
        // Force a re-render by cloning the tree
        setTree(tree.clone());
      }
    }
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
