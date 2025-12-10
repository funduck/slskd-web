"use client";

import { DirectoryTreeNode } from "@/lib/directories";
import { Box, Group, Space, Text } from "@mantine/core";
import { memo, useCallback } from "react";

import { DownloadButton } from "../app/downloads/DownloadButton";
import { useDownload } from "../app/downloads/DownloadContext";
import { DirectoriesTree } from "./DirectoriesTree";
import { FilesList } from "./FilesList";
import { FilterInput } from "./FilterInput";
import { ShowSelectionButton } from "./ShowSelectionButton";
import { useUserFiles } from "./UserFilesContext";

export const UserFilesBrowser = memo(
  ({
    tree,
    loading,
    username,
    filter,
    hideFilterAndDownload = false,
    loadDirectoryChildren,
    applyFilter,
  }: {
    tree: DirectoryTreeNode | null;
    loading: boolean;
    username: string;
    filter?: string;
    hideFilterAndDownload?: boolean;
    loadDirectoryChildren: (path: string) => Promise<void>;
    applyFilter: (filter?: string) => Promise<void>;
  }) => {
    // Get UI state from UserFilesContext (directory selection, expanded state)
    const { selectedDirectory, expandedDirectories, selectDirectory, toggleDirectoryExpansion } =
      useUserFiles(username);

    // Get selection state and actions from DownloadContext
    const {
      getSelectedFilenamesInDirectory,
      getSelectionSummaryForUser,
      clearAllSelections,
      addFilesToSelection,
      removeFilesFromSelection,
    } = useDownload();

    // Get selection summary for the tree (shows badges)
    const selectionSummary = getSelectionSummaryForUser(username);

    const toggleFileSelection = useCallback(
      (username: string, filename: string) => {
        console.log("UserFilesBrowser toggling file selection:", {
          username,
          selectedDirectory,
          filename,
        });
        if (!selectedDirectory) return;
        const node = tree ? tree.findNodeByPath(selectedDirectory) : null;
        if (!node) return;
        const file = node?.files?.find((f) => f.filename === filename) || null;
        if (!file || !file.filename) return;
        const fileForDownload = {
          fullpath: node!.getFullPath(file),
          size: file.size,
          filename: file.filename,
          separator: node!.separator,
        };
        console.log("UserFilesBrowser file found for toggling selection:", fileForDownload);

        const selectedFilenames = getSelectedFilenamesInDirectory(username, selectedDirectory);
        const isAdding = !selectedFilenames.has(file.filename);
        console.log("UserFilesBrowser is adding file to selection:", isAdding, fileForDownload);

        // Update DownloadContext directly (no more sync needed!)
        if (isAdding) {
          addFilesToSelection(username, selectedDirectory, [fileForDownload]);
        } else {
          removeFilesFromSelection(username, selectedDirectory, [fileForDownload]);
        }
      },
      [tree, selectedDirectory, getSelectedFilenamesInDirectory, addFilesToSelection, removeFilesFromSelection],
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
          .map((file) => ({
            filename: file.filename!,
            fullpath: node!.getFullPath(file),
            size: file.size,
            separator: node!.separator,
          }));

        const selectedFilenames = getSelectedFilenamesInDirectory(username, selectedDirectory);
        const changing = filesForDownload.filter((file) => {
          const has = selectedFilenames.has(file.filename!);
          return (mode == "add" && !has) || (mode == "remove" && has);
        });

        if (changing.length === 0) return;

        // Update DownloadContext directly (no more sync needed!)
        if (mode === "add") {
          addFilesToSelection(username, selectedDirectory, changing);
        } else {
          removeFilesFromSelection(username, selectedDirectory, changing);
        }
      },
      [
        tree,
        selectedDirectory,
        username,
        getSelectedFilenamesInDirectory,
        addFilesToSelection,
        removeFilesFromSelection,
      ],
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
              <Group gap="xs">
                <ShowSelectionButton />
                <DownloadButton onClearSelection={clearAllSelections} />
              </Group>
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
              selection={selectionSummary}
              expandedDirectories={expandedDirectories}
              toggleDirectoryExpansion={toggleDirectoryExpansion}
            />
            {selectedDirectory ? (
              node ? (
                <FilesList
                  username={username}
                  directory={selectedDirectory}
                  files={files}
                  selectedFiles={getSelectedFilenamesInDirectory(username, selectedDirectory)}
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
  },
);

UserFilesBrowser.displayName = "UserFilesBrowser";
