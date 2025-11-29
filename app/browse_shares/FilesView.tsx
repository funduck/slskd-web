"use client";

import { FileModel } from "@/generated/slskd-api";
import { useBrowseShares } from "./BrowseSharesContext";
import { Text, ScrollArea, Table, Checkbox } from "@mantine/core";
import { IconMusic } from "@tabler/icons-react";
import { findNodeByPath } from "@/lib/directories";

export default function FilesView() {
  const {
    tree,
    selectedDirectory,
    selectedFiles,
    toggleFileSelection,
    selectAllInDirectory: selectAll,
    deselectAllInDirectory: deselectAll,
  } = useBrowseShares();

  if (!selectedDirectory) {
    return (
      <Text size="sm" c="dimmed" mt="sm">
        Select a directory to view its files
      </Text>
    );
  }

  // Find the selected directory node in the tree
  const node = tree ? findNodeByPath(tree, selectedDirectory) : null;
  const files = node?.files || [];

  if (!node) {
    return (
      <Text size="sm" c="dimmed" mt="sm">
        Directory not found
      </Text>
    );
  }

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
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={() => {
                  if (allSelected) {
                    deselectAll();
                  } else {
                    selectAll();
                  }
                }}
              />
            </Table.Th>
            <Table.Th>File</Table.Th>
            <Table.Th>Size</Table.Th>
            <Table.Th>Bitrate</Table.Th>
            <Table.Th>Duration</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedFiles.map((file: FileModel, index: number) => (
            <Table.Tr
              key={index}
              onClick={() => file.filename && toggleFileSelection(file.filename)}
              style={{ cursor: "pointer" }}
            >
              <Table.Td onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={file.filename ? selectedFiles.has(file.filename) : false}
                  onChange={() => file.filename && toggleFileSelection(file.filename)}
                />
              </Table.Td>
              <Table.Td>
                <Text size="sm" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <IconMusic size={16} />
                  {file.filename}
                </Text>
              </Table.Td>
              <Table.Td>{file.size && formatFileSize(file.size)}</Table.Td>
              <Table.Td>{file.bit_rate && `${file.bit_rate} kbps`}</Table.Td>
              <Table.Td>
                {file.length && `${Math.floor(file.length / 60)}:${("0" + (file.length % 60)).slice(-2)} min`}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
