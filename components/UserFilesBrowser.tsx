"use client";

import { Text, Box, Group, Space } from "@mantine/core";
import { DirectoryTreeNode } from "@/lib/directories";
import { memo, useState, useCallback, useEffect } from "react";
import { DirectoriesTree } from "./DirectoriesTree";
import { FilesList } from "./FilesList";
import { DownloadButton } from "./DownloadButton";
import { FilterInput } from "./FilterInput";
import { FileForDownloadType } from "./DownloadContext";

const getStorageKey = (username: string) => `expanded-dirs-${username}`;
const getSelectedDirKey = (username: string) => `selected-dir-${username}`;

export const UserFilesBrowser = memo(
  ({
    tree,
    loading,
    username,
    filter,
    hideFilterAndDownload = false,
    addFilesToSelection,
    removeFilesFromSelection,
    loadDirectoryChildren,
    applyFilter,
  }: {
    tree: DirectoryTreeNode | null;
    loading: boolean;
    username: string;
    filter?: string;
    hideFilterAndDownload?: boolean;
    addFilesToSelection: (username: string, files: FileForDownloadType[]) => void;
    removeFilesFromSelection: (username: string, files: FileForDownloadType[]) => void;
    loadDirectoryChildren: (path: string) => Promise<void>;
    applyFilter: (filter?: string) => Promise<void>;
  }) => {
    // Currently selected directory path
    const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);

    /** Map<directory path, set of selected file names> */
    const [selectedInDirectories, setSelecedInDirectories] = useState<Map<string, Set<string>>>(new Map()); // TODO: optimize? setSelection is very expensive

    /** Set of expanded directory paths */
    const [expandedDirectories, setExpandedDirectories] = useState<Set<string>>(new Set());
    const [mounted, setMounted] = useState(false);

    // Restore expanded directories from sessionStorage after mount
    useEffect(() => {
      setMounted(true);
      const stored = sessionStorage.getItem(getStorageKey(username));
      if (stored) {
        try {
          setExpandedDirectories(new Set(JSON.parse(stored)));
        } catch (e) {
          // Ignore parse errors
        }
      }

      // Restore selected directory
      const storedSelectedDir = sessionStorage.getItem(getSelectedDirKey(username));
      if (storedSelectedDir) {
        setSelectedDirectory(storedSelectedDir);
      }
    }, [username]);

    // Save expanded directories to sessionStorage when they change
    useEffect(() => {
      if (mounted) {
        if (expandedDirectories.size > 0) {
          sessionStorage.setItem(getStorageKey(username), JSON.stringify(Array.from(expandedDirectories)));
        } else {
          // Clear storage if no directories are expanded
          sessionStorage.removeItem(getStorageKey(username));
        }
      }
    }, [expandedDirectories, username, mounted]);

    // Save selected directory to sessionStorage when it changes
    useEffect(() => {
      if (mounted) {
        if (selectedDirectory) {
          sessionStorage.setItem(getSelectedDirKey(username), selectedDirectory);
        } else {
          sessionStorage.removeItem(getSelectedDirKey(username));
        }
      }
    }, [selectedDirectory, username, mounted]);

    // TODO useRef for these functions to avoid re-renders

    const clearAllSelection = () => {
      setSelecedInDirectories(new Map());
    };

    const selectDirectory = (directory: string | null) => {
      setSelectedDirectory(directory);
    };

    const toggleDirectoryExpansion = (path: string) => {
      setExpandedDirectories((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(path)) {
          newSet.delete(path);
        } else {
          newSet.add(path);
        }
        return newSet;
      });
    };

    const toggleFileSelection = useCallback(
      (username: string, filename: string) => {
        console.log("UserFilesBrowser toggling file selection in UserFilesBrowser:", {
          username,
          selectedDirectory,
          filename,
        });
        if (!selectedDirectory) return;
        const node = tree ? tree.findNodeByPath(selectedDirectory) : null;
        if (!node) return;
        const file = node?.files?.find((f) => f.filename === filename) || null;
        if (!file || !file.filename) return;
        const fileForDownload = { fullpath: node!.getFullPath(file), size: file.size };
        console.log("UserFilesBrowser file found for toggling selection:", fileForDownload);

        const newSelectedInDirectories = new Map(selectedInDirectories);
        const selectedFilenames = newSelectedInDirectories.get(selectedDirectory) || new Set();
        const newSelectedFilenames = new Set(selectedFilenames);
        const isAdding = !newSelectedFilenames.has(file.filename);
        console.log("UserFilesBrowser is adding file to selection:", isAdding, fileForDownload);

        if (isAdding) {
          newSelectedFilenames.add(file.filename);
          // Update global selection after determining the action
          setTimeout(() => addFilesToSelection(username, [fileForDownload]), 0);
        } else {
          newSelectedFilenames.delete(file.filename);
          // Update global selection after determining the action
          setTimeout(() => removeFilesFromSelection(username, [fileForDownload]), 0);
        }

        newSelectedInDirectories.set(selectedDirectory, newSelectedFilenames);

        // Update the selection state
        setSelecedInDirectories(newSelectedInDirectories);
      },
      [tree, selectedDirectory, selectedInDirectories, addFilesToSelection, removeFilesFromSelection]
    );

    const modifyAllIndirectory = useCallback(
      (mode: "add" | "remove") => {
        console.log("UserFilesBrowser modifying all files in directory:", { mode, username, selectedDirectory });
        if (!selectedDirectory) return;
        const node = tree ? tree.findNodeByPath(selectedDirectory) : null;
        if (!node) return;
        const files = node?.files || [];
        if (files.length === 0) return;
        const filesForDownload = files
          .filter((file) => file.filename)
          .map((file) => ({ filename: file.filename, fullpath: node!.getFullPath(file), size: file.size }));

        const newSelectedInDirectories = new Map(selectedInDirectories);
        const selectedFilenames = newSelectedInDirectories.get(selectedDirectory) || new Set();
        const newSelectedFilenames = new Set(selectedFilenames);

        const changing = filesForDownload.filter((file) => {
          const has = newSelectedFilenames.has(file.filename!);
          return (mode == "add" && !has) || (mode == "remove" && has);
        });
        for (const file of changing) {
          if (mode === "add") {
            newSelectedFilenames.add(file.filename!);
          } else {
            newSelectedFilenames.delete(file.filename!);
          }
        }

        newSelectedInDirectories.set(selectedDirectory, newSelectedFilenames);

        // Update global selection after state update
        if (changing.length > 0) {
          if (mode === "add") {
            setTimeout(() => addFilesToSelection(username, changing), 0);
          } else {
            setTimeout(() => removeFilesFromSelection(username, changing), 0);
          }
        }

        setSelecedInDirectories(newSelectedInDirectories);
      },
      [tree, selectedDirectory, selectedInDirectories, username, addFilesToSelection, removeFilesFromSelection]
    );

    const selectAllInDirectory = useCallback(() => {
      modifyAllIndirectory("add");
    }, [modifyAllIndirectory]);

    const deselectAllInDirectory = useCallback(() => {
      modifyAllIndirectory("remove");
    }, [modifyAllIndirectory]);

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
        {!hideFilterAndDownload && (
          <>
            <Group justify="space-between">
              <FilterInput disabled={loading} filter={filter} applyFilter={applyFilter} />
              <DownloadButton onClearSelection={clearAllSelection} />
            </Group>
            <Space h="xs" />
          </>
        )}

        {tree && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="flex-column">
            <DirectoriesTree
              tree={tree}
              loading={loading}
              error={null}
              selectedDirectory={selectedDirectory}
              selectDirectory={selectDirectory}
              loadDirectoryChildren={loadDirectoryChildren}
              selection={selectedInDirectories}
              expandedDirectories={expandedDirectories}
              toggleDirectoryExpansion={toggleDirectoryExpansion}
            />
            {selectedDirectory ? (
              node ? (
                <FilesList
                  username={username}
                  directory={selectedDirectory}
                  files={files}
                  selectedFiles={selectedInDirectories.get(selectedDirectory) || new Set()}
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
