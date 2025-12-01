import { Text, ScrollArea, Center, Loader } from "@mantine/core";
import { DirectoriesTreeNode } from "@/components/DirectoriesTreeNode";
import { memo } from "react";
import { DirectoryTreeNode } from "@/lib/directories";

export const DirectoriesTree = memo(
  ({
    tree,
    loading,
    error,
    selectedDirectory,
    selectDirectory,
    loadDirectoryChildren,
    selection,
  }: {
    tree: DirectoryTreeNode | null;
    loading: boolean;
    error: string | null;
    selectedDirectory: string | null;
    selectDirectory: (path: string) => void;
    loadDirectoryChildren: (path: string) => Promise<void>;
    selection: Map<string, Set<string>>;
  }) => {
    if (error) {
      return (
        <Center p="md">
          <Text c="red">{error}</Text>
        </Center>
      );
    }

    if (!tree) {
      return (
        <Center p="md">
          <Loader size="sm" />
        </Center>
      );
    }

    return (
      <ScrollArea className="flex-column">
        {Array.from(tree.children.values()).map((node) => (
          <DirectoriesTreeNode
            key={node.path}
            node={node}
            depth={0}
            selectedDirectory={selectedDirectory}
            selection={selection}
            selectDirectory={selectDirectory}
            loadDirectoryChildren={loadDirectoryChildren}
          />
        ))}
        {loading && (
          <Center p="md">
            <Loader size="sm" />
          </Center>
        )}
      </ScrollArea>
    );
  }
);

DirectoriesTree.displayName = "DirectoriesTree";
