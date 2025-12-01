"use client";

import { Text, Box, Group, Space } from "@mantine/core";
import { DirectoryTreeNode } from "@/lib/directories";
import { memo, useState, useCallback } from "react";
import { DirectoriesTree } from "./DirectoriesTree";
import { FilesList } from "./FilesList";
import { FileModel } from "@/generated/slskd-api";
import { DownloadButton } from "./DownloadButton";
import { FilterInput } from "./FilterInput";

export const UserFilesBrowser = memo(
  ({
    tree,
    loading,
    username,
    filter,
    addFilesToSelection,
    removeFilesFromSelection,
    loadDirectoryChildren,
    applyFilter,
  }: {
    tree: DirectoryTreeNode | null;
    loading: boolean;
    username: string;
    filter?: string;
    addFilesToSelection: (username: string, files: FileModel[]) => void;
    removeFilesFromSelection: (username: string, files: FileModel[]) => void;
    loadDirectoryChildren: (path: string) => Promise<void>;
    applyFilter: (filter?: string) => Promise<void>;
  }) => {
    const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
    const [selection, setSelection] = useState<Map<string, Set<string>>>(new Map()); // TODO: optimize? setSelection is very expensive
    const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

    // TODO useRef for these functions to avoid re-renders

    const clearAllSelection = () => {
      setSelection(new Map());
      setSelectedFiles(new Set());
    };

    const selectDirectory = (directory: string | null) => {
      setSelectedDirectory(directory);
      setSelectedFiles(selection.get(directory || "") || new Set());
    };

    const toggleFileSelection = useCallback(
      (username: string, filepath: string) => {
        const file =
          tree && selectedDirectory
            ? tree.findNodeByPath(selectedDirectory)?.files?.find((f) => f.filename === filepath)
            : null;
        if (!file) return;

        setSelection((prevSelection) => {
          const newSelection = new Map(prevSelection);
          const prevSelectedFiles = newSelection.get(selectedDirectory || "") || new Set();
          const newSelectedFiles = new Set(prevSelectedFiles);
          const isAdding = !newSelectedFiles.has(filepath);

          if (isAdding) {
            newSelectedFiles.add(filepath);
            // Update global selection after determining the action
            setTimeout(() => addFilesToSelection(username, [file]), 0);
          } else {
            newSelectedFiles.delete(filepath);
            // Update global selection after determining the action
            setTimeout(() => removeFilesFromSelection(username, [file]), 0);
          }

          newSelection.set(selectedDirectory || "", newSelectedFiles);

          // Update local selectedFiles state
          setSelectedFiles(newSelectedFiles);

          return newSelection;
        });
      },
      [tree, selectedDirectory, addFilesToSelection, removeFilesFromSelection]
    );

    const selectAllInDirectory = useCallback(() => {
      const files = tree && selectedDirectory ? tree.findNodeByPath(selectedDirectory)?.files || [] : [];

      setSelection((prevSelection) => {
        const newSelection = new Map(prevSelection);
        const prevSelectedFiles = newSelection.get(selectedDirectory || "") || new Set();
        const newSelectedFiles = new Set(prevSelectedFiles);
        const adding = files.filter((file) => !newSelectedFiles.has(file.filename || ""));

        for (const file of adding) {
          newSelectedFiles.add(file.filename || "");
        }

        // Update local selectedFiles state
        setSelectedFiles(newSelectedFiles);

        newSelection.set(selectedDirectory || "", newSelectedFiles);

        // Update global selection after state update
        if (adding.length > 0) {
          setTimeout(() => addFilesToSelection(username, adding), 0);
        }

        return newSelection;
      });
    }, [tree, selectedDirectory, username, addFilesToSelection]);

    const deselectAllInDirectory = useCallback(() => {
      const files = tree && selectedDirectory ? tree.findNodeByPath(selectedDirectory)?.files || [] : [];

      setSelection((prevSelection) => {
        const newSelection = new Map(prevSelection);
        const prevSelectedFiles = newSelection.get(selectedDirectory || "") || new Set();
        const newSelectedFiles = new Set(prevSelectedFiles);
        const removing = files.filter((file) => newSelectedFiles.has(file.filename || ""));

        for (const file of removing) {
          newSelectedFiles.delete(file.filename || "");
        }

        // Update local selectedFiles state
        setSelectedFiles(newSelectedFiles);

        newSelection.set(selectedDirectory || "", newSelectedFiles);

        // Update global selection after state update
        if (removing.length > 0) {
          setTimeout(() => removeFilesFromSelection(username, removing), 0);
        }

        return newSelection;
      });
    }, [tree, selectedDirectory, username, removeFilesFromSelection]);

    if (loading && !tree) {
      return (
        <Text size="sm" c="dimmed">
          Searching...
        </Text>
      );
    }

    if (tree && tree.children.size === 0) {
      return (
        <Text size="sm" c="dimmed">
          No directories found
        </Text>
      );
    }

    // Find the selected directory node in the tree
    const node = tree && selectedDirectory ? tree.findNodeByPath(selectedDirectory) : null;
    const files = node?.files || [];

    return (
      <Box id="browse-shares-results" className="flex-column">
        <Group justify="space-between">
          <FilterInput disabled={loading} filter={filter} applyFilter={applyFilter} />
          <DownloadButton onClearSelection={clearAllSelection} />
        </Group>
        <Space h="xs" />

        {tree && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="flex-column">
            <DirectoriesTree
              tree={tree}
              loading={loading}
              error={null}
              selectedDirectory={selectedDirectory}
              selectDirectory={selectDirectory}
              loadDirectoryChildren={loadDirectoryChildren}
              selection={selection}
            />
            {selectedDirectory ? (
              node ? (
                <FilesList
                  username={username}
                  directory={selectedDirectory}
                  files={files}
                  selectedFiles={selectedFiles}
                  toggleFileSelection={toggleFileSelection}
                  selectAll={() => selectAllInDirectory()}
                  deselectAll={() => deselectAllInDirectory()}
                />
              ) : (
                <Text size="sm" c="dimmed" mt="sm">
                  Directory not found
                </Text>
              )
            ) : (
              <Text size="sm" c="dimmed" mt="sm">
                Select a directory to view its files
              </Text>
            )}
          </div>
        )}
      </Box>
    );
  }
);

UserFilesBrowser.displayName = "UserFilesBrowser";
