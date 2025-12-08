import { DirectoryTreeNode } from "@/lib/directories";
import { Box, Paper, Group, Badge, Collapse, Text } from "@mantine/core";
import { IconChevronDown, IconChevronRight, IconFolder, IconFolderOpen } from "@tabler/icons-react";
import { memo } from "react";

export const DirectoriesTreeNode = memo(
  ({
    node,
    depth,
    selectedDirectory,
    selection,
    selectDirectory,
    loadDirectoryChildren,
    expandedDirectories,
    toggleDirectoryExpansion,
  }: {
    node: DirectoryTreeNode;

    /** Depth level in the tree */
    depth: number;

    selectedDirectory: string | null;

    /** Map<directory path, set of selected file names> */
    selection: Map<string, Set<string>>;

    /** Function to select a directory by its path */
    selectDirectory: (path: string) => void;

    /** Function to load children of a directory by its path */
    loadDirectoryChildren: (path: string) => Promise<void>;

    /** Set of expanded directory paths */
    expandedDirectories: Set<string>;

    /** Function to toggle directory expansion */
    toggleDirectoryExpansion: (path: string) => void;
  }) => {
    const isOpen = expandedDirectories.has(node.path);

    const isSelected = selectedDirectory === node.path;
    const hasSelectedFiles = selection.has(node.path) && selection.get(node.path)!.size > 0;

    const hasChildren = node.children.size > 0 || node.hasChildren;
    const fileCount = node.files?.length || 0;
    const selectedCount = selection.get(node.path)?.size || 0;

    const handleClick = async () => {
      if (hasChildren) {
        const willOpen = !isOpen;

        if (willOpen) {
          // Load children when expanding if not already loaded
          if (!node.childrenLoaded) {
            await loadDirectoryChildren(node.path);
          }
          toggleDirectoryExpansion(node.path);
        } else {
          // Collapse immediately
          toggleDirectoryExpansion(node.path);
        }
      }

      selectDirectory(node.path);
    };

    return (
      <Box key={node.path}>
        <Paper
          p="xs"
          pl={depth * 20 + 12}
          style={{
            cursor: "pointer",
            borderLeft: hasSelectedFiles ? "3px solid var(--mantine-color-blue-6)" : undefined,
          }}
          bg={isSelected ? "var(--mantine-color-blue-light)" : undefined}
          onClick={handleClick}
        >
          <Group justify="space-between" align="center" wrap="nowrap">
            <Group gap="sm" align="center" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
              {hasChildren && (isOpen ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />)}
              {!hasChildren && <Box style={{ width: 16 }} />}
              {isOpen ? <IconFolderOpen size={20} /> : <IconFolder size={20} />}
              <Text fw={500} truncate style={{ flex: 1 }}>
                {node.name}
              </Text>
            </Group>
            <Group gap="xs" style={{ flexShrink: 0 }}>
              {hasSelectedFiles && (
                <Badge variant="filled" color="blue" size="sm">
                  {selectedCount} selected
                </Badge>
              )}
              {node.files && (
                <Badge variant="light" color={fileCount ? "blue" : "gray"}>
                  {fileCount} {fileCount === 1 ? "file" : "files"}
                </Badge>
              )}
            </Group>
          </Group>
        </Paper>

        {hasChildren && (
          <Collapse in={isOpen}>
            {Array.from(node.children.entries())
              .sort(([aName], [bName]) => aName.localeCompare(bName))
              .map(([childName, childNode]) => {
                return (
                  <DirectoriesTreeNode
                    key={childNode.path}
                    node={childNode}
                    depth={depth + 1}
                    selectedDirectory={selectedDirectory}
                    selection={selection}
                    selectDirectory={selectDirectory}
                    loadDirectoryChildren={loadDirectoryChildren}
                    expandedDirectories={expandedDirectories}
                    toggleDirectoryExpansion={toggleDirectoryExpansion}
                  />
                );
              })}
          </Collapse>
        )}
      </Box>
    );
  }
);

DirectoriesTreeNode.displayName = "DirectoriesTreeNode";
