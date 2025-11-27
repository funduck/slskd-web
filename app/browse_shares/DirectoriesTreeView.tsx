import { Paper, Text, Group, Badge, ScrollArea, Center, Loader, Collapse, Box } from "@mantine/core";
import { IconFolder, IconFolderOpen, IconChevronRight, IconChevronDown } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { useBrowseShares } from "./BrowseSharesContext";
import { DirectoryTreeNode } from "@/lib/directories";

interface TreeNodeProps {
  name: string;
  node: DirectoryTreeNode;
  path: string;
  depth: number;
}

function TreeNode({ name, node, path, depth }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedDirectory, setSelectedDirectory, loadDirectoryChildren } = useBrowseShares();

  const isSelected = selectedDirectory === path;

  const hasChildren = node.children.size > 0 || node.hasChildren;
  const fileCount = node.files?.length || 0;

  const handleClick = async () => {
    setSelectedDirectory(path);

    if (hasChildren) {
      const willOpen = !isOpen;

      if (willOpen) {
        // Load children when expanding if not already loaded
        if (!node.childrenLoaded) {
          await loadDirectoryChildren(path);
        } else {
          console.debug(`Children already loaded for ${path}`);
        }
        // Only set isOpen to true after children are loaded
        setIsOpen(true);
      } else {
        // Collapse immediately
        setIsOpen(false);
      }
    } else {
      console.debug(`No children to load for ${path}`);
    }
  };

  return (
    <Box>
      <Paper
        p="xs"
        pl={depth * 20 + 12}
        style={{ cursor: "pointer" }}
        bg={isSelected ? "var(--mantine-color-blue-light)" : undefined}
        onClick={handleClick}
      >
        <Group justify="space-between" align="center" wrap="nowrap">
          <Group gap="sm" align="center" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
            {hasChildren && (isOpen ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />)}
            {!hasChildren && <Box style={{ width: 16 }} />}
            {isOpen ? <IconFolderOpen size={20} /> : <IconFolder size={20} />}
            <Text fw={500} truncate style={{ flex: 1 }}>
              {name}
            </Text>
          </Group>
          {node.files && (
            <Badge variant="light" color={fileCount ? "blue" : "gray"} style={{ flexShrink: 0 }}>
              {fileCount} {fileCount === 1 ? "file" : "files"}
            </Badge>
          )}
        </Group>
      </Paper>

      {hasChildren && (
        <Collapse in={isOpen}>
          {Array.from(node.children.entries())
            .sort(([aName], [bName]) => aName.localeCompare(bName))
            .map(([childName, childNode]) => {
              const childPath = childNode.name;
              return <TreeNode key={childPath} name={childName} node={childNode} path={childPath} depth={depth + 1} />;
            })}
        </Collapse>
      )}
    </Box>
  );
}

export default function DirectoriesTreeView() {
  const { tree, loading, error } = useBrowseShares();

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
      {Array.from(tree.children.entries()).map(([name, node]) => (
        <TreeNode key={name} name={name} node={node} path={name} depth={0} />
      ))}
      {loading && (
        <Center p="md">
          <Loader size="sm" />
        </Center>
      )}
    </ScrollArea>
  );
}
