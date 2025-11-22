"use client";

import { useBrowseShares } from "./BrowseSharesContext";
import { Paper, Text, Group, Badge, ScrollArea, Stack } from "@mantine/core";
import { IconMusic } from "@tabler/icons-react";

export default function FilesView() {
  const { result, selectedDirectory } = useBrowseShares();

  if (!selectedDirectory) {
    return (
      <Stack h="80vh" align="center" justify="center">
        <Text size="sm" c="dimmed">
          Select a directory to view its files
        </Text>
      </Stack>
    );
  }

  // TODO: Not sure about this approach
  const directory = result?.directories?.find((d) => d.name === selectedDirectory);

  const files = directory?.files || [];

  console.log(files[0]);

  if (!directory) {
    return (
      <Stack h="80vh" align="center" justify="center">
        <Text size="sm" c="dimmed">
          Directory not found
        </Text>
      </Stack>
    );
  }

  if (files.length === 0) {
    return (
      <Stack h="80vh" align="center" justify="center">
        <Text size="sm" c="dimmed">
          Empty directory
        </Text>
      </Stack>
    );
  }

  return (
    <ScrollArea h="80vh">
      {/* TODO: maybe table is better? */}
      <Stack gap="xs">
        {files.map((file: any, index: number) => (
          <Paper key={index}>
            <Group justify="space-between" align="center">
              <Group gap="sm" align="center">
                <IconMusic size={16} />
                <Text size="sm">{file.filename || file.name || "Unknown"}</Text>
              </Group>
              {file.size && (
                <Badge variant="light" color="gray">
                  {formatFileSize(file.size)}
                </Badge>
              )}
            </Group>
          </Paper>
        ))}
      </Stack>
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
