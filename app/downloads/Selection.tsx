"use client";

import { Box, Text, Table, ScrollArea, Button, Group, Badge } from "@mantine/core";
import { IconX, IconDownload } from "@tabler/icons-react";
import { useDownload } from "@/components/DownloadContext";
import { notifications } from "@mantine/notifications";

export function Selection() {
  const { stats, getSelectedFiles, removeFilesFromSelection, enqueueSelection } = useDownload();

  const selectedFiles = getSelectedFiles();

  // Flatten the selected files for display
  const allSelectedFiles: Array<{ username: string; fullpath: string; size?: number }> = [];
  selectedFiles.forEach((userFiles, username) => {
    userFiles.forEach((file) => {
      allSelectedFiles.push({
        username,
        fullpath: file.fullpath,
        size: file.size,
      });
    });
  });

  const handleRemove = (username: string, fullpath: string) => {
    removeFilesFromSelection(username, [{ fullpath }]);
  };

  const handleEnqueueAll = async () => {
    try {
      await enqueueSelection();
      notifications.show({
        title: "Downloads enqueued",
        message: `Enqueued ${stats.count} file(s)`,
        color: "green",
      });
    } catch (err) {
      console.error("Failed to enqueue downloads:", err);
      notifications.show({
        title: "Failed to enqueue",
        message: String(err),
        color: "red",
      });
    }
  };

  if (allSelectedFiles.length === 0) {
    return (
      <Text size="sm" c="dimmed">
        No files selected. Browse or search for files to add them to your selection.
      </Text>
    );
  }

  return (
    <Box>
      <Group justify="space-between" mb="md">
        <Group gap="md">
          <Badge size="lg" variant="light">
            {stats.count} file{stats.count !== 1 ? "s" : ""}
          </Badge>
          <Badge size="lg" variant="light" color="blue">
            {formatFileSize(stats.size)}
          </Badge>
        </Group>
        <Button leftSection={<IconDownload size={16} />} onClick={handleEnqueueAll} color="green">
          Enqueue All
        </Button>
      </Group>

      <ScrollArea>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>File</Table.Th>
              <Table.Th>User</Table.Th>
              <Table.Th>Size</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {allSelectedFiles.map((file, index) => {
              const filename = file.fullpath.split("/").pop() || file.fullpath;
              return (
                <Table.Tr key={`${file.username}-${file.fullpath}-${index}`}>
                  <Table.Td>
                    <Box>
                      <Text size="sm" fw={500}>
                        {filename}
                      </Text>
                      <Text size="xs" c="dimmed" truncate="end" style={{ maxWidth: 400 }}>
                        {file.fullpath}
                      </Text>
                    </Box>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{file.username}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{file.size ? formatFileSize(file.size) : "Unknown"}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Button
                      size="xs"
                      variant="light"
                      color="red"
                      onClick={() => handleRemove(file.username, file.fullpath)}
                      leftSection={<IconX size={14} />}
                    >
                      Remove
                    </Button>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
