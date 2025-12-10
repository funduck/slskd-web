"use client";

import { FileListItem } from "@/components/FileListItem";
import type { FileModel } from "@/lib/api-types";
import { Checkbox, Group, Paper, ScrollArea, Text } from "@mantine/core";
import { memo } from "react";

export const FilesList = memo(
  ({
    username,
    files,
    selectedFiles,
    toggleFileSelection,
    selectAll,
    deselectAll,
  }: {
    username: string;
    directory: string;
    files: FileModel[];
    selectedFiles: Set<string>;
    toggleFileSelection: (username: string, filename: string) => void;
    selectAll: () => void;
    deselectAll: () => void;
  }) => {
    if (files.length === 0) {
      return (
        <Text size="sm" c="dimmed" mt="sm">
          No files in this directory
        </Text>
      );
    }

    const sortedFiles = files.sort((a, b) => (a.filename ?? "").localeCompare(b.filename ?? ""));
    const allSelected = sortedFiles.every((file) => file.filename && selectedFiles.has(file.filename));
    const someSelected = sortedFiles.some((file) => file.filename && selectedFiles.has(file.filename)) && !allSelected;

    return (
      <ScrollArea className="flex-column">
        <Paper p="xs" mb="xs">
          <Group gap="sm" align="center">
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={() => {
                console.log("FilesList select/deselect all checkbox clicked:", { allSelected, someSelected });
                if (allSelected) {
                  deselectAll();
                } else {
                  selectAll();
                }
              }}
            />
            <Text size="sm" fw={500}>
              {allSelected ? "Deselect All" : "Select All"} ({sortedFiles.length} files)
            </Text>
          </Group>
        </Paper>
        {sortedFiles.map((file: FileModel) => (
          <FileListItem
            key={file.filename || ""}
            file={file}
            username={username}
            selectable
            selectOnRowClick
            isSelected={file.filename ? selectedFiles.has(file.filename) : false}
            toggleFileSelection={toggleFileSelection}
          />
        ))}
      </ScrollArea>
    );
  },
);

FilesList.displayName = "FilesList";
