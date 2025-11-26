import { Paper, Text, Group, Badge, ScrollArea, Center, Loader, Collapse, Box } from "@mantine/core";
import { IconFolder, IconFolderOpen, IconChevronRight, IconChevronDown } from "@tabler/icons-react";
import { useCallback, useRef, useState, useMemo } from "react";
import { useBrowseShares } from "./BrowseSharesContext";
import { Directory } from "@/generated/slskd-api";
import { buildFSTreeFromDirectories, DirectoryTreeNode } from "@/lib/directories";

interface TreeNodeProps {
  name: string;
  node: DirectoryTreeNode;
  path: string;
  depth: number;
  directories: Directory[];
}

function TreeNode({ name, node, path, depth, directories }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedDirectory, setSelectedDirectory } = useBrowseShares();

  const isSelected = selectedDirectory === path;

  const hasChildren = node.children.size > 0;
  const fileCount = node.files?.length || 0;

  const handleClick = () => {
    setSelectedDirectory(path);
    if (hasChildren) {
      setIsOpen(!isOpen);
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
            .sort(([aName], [bName]) => aName.localeCompare(bName)) // May slow down with many children
            .map(([childName, childNode]) => {
              const childPath = childNode.name;
              return (
                <TreeNode
                  key={childPath}
                  name={childName}
                  node={childNode}
                  path={childPath}
                  depth={depth + 1}
                  directories={directories}
                />
              );
            })}
        </Collapse>
      )}
    </Box>
  );
}

export default function DirectoriesTreeView() {
  const { result, loading, hasMore, loadMore } = useBrowseShares();
  const directories = result?.directories || [];

  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const viewport = scrollViewportRef.current;
    if (!viewport || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = viewport;
    const scrolledToBottom = scrollHeight - scrollTop - clientHeight < clientHeight;

    if (scrolledToBottom) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

  const tree = useMemo(() => {
    return buildFSTreeFromDirectories(directories);
  }, [directories]);

  return (
    <ScrollArea viewportRef={scrollViewportRef} onScrollPositionChange={handleScroll} className="flex-column">
      {Array.from(tree.children.entries()).map(([name, node]) => (
        <TreeNode key={name} name={name} node={node} path={name} depth={0} directories={directories} />
      ))}
      {loading && (
        <Center p="md">
          <Loader size="sm" />
        </Center>
      )}
      {!hasMore && directories.length > 0 && (
        <Center p="md">
          <Text size="sm" c="dimmed">
            No more folders
          </Text>
        </Center>
      )}
    </ScrollArea>
  );
}
