"use client";

import { FileModel } from "@/generated/slskd-api";
import { useBrowseShares } from "./BrowseSharesContext";
import { Text, Badge, ScrollArea, Stack, Table } from "@mantine/core";
import { IconMusic } from "@tabler/icons-react";

export default function FilesView() {
  const { result, selectedDirectory } = useBrowseShares();

  if (!selectedDirectory) {
    return (
      <Text size="sm" c="dimmed">
        Select a directory to view its files
      </Text>
    );
  }

  // TODO: Not sure about this approach
  const directory = result?.directories?.find((d) => d.name === selectedDirectory);

  const files = directory?.files || [];

  console.log(files[0]);

  if (!directory) {
    return (
      <Text size="sm" c="dimmed">
        Directory not found
      </Text>
    );
  }

  if (files.length === 0) {
    return (
      <Text size="sm" c="dimmed">
        No files in this directory
      </Text>
    );
  }

  return (
    <ScrollArea className="flex-column">
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>File</Table.Th>
            <Table.Th>Size</Table.Th>
            <Table.Th>Bitrate</Table.Th>
            <Table.Th>Duration</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {files
            .sort((a, b) => (a.filename ?? "").localeCompare(b.filename ?? ""))
            .map((file: FileModel, index: number) => (
              <Table.Tr key={index}>
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
