"use client";

import { Text, Box, Accordion, Table, Checkbox, Badge, Group, Button, Loader, ActionIcon } from "@mantine/core";
import { useSearchFiles } from "./SearchFilesContext";
import { DownloadButton } from "./DownloadButton";
import { IconUser, IconChevronDown, IconFolderOpen } from "@tabler/icons-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function CurrentSearch() {
  const {
    userSummaries,
    userFiles,
    totalUsers,
    hasMoreUsers,
    loading,
    error,
    selectedFiles,
    toggleFileSelection,
    loadMoreUsers,
    loadUserFiles,
    searchId,
    searchQuery,
  } = useSearchFiles();
  const router = useRouter();

  // Load initial results when searchId changes
  useEffect(() => {
    if (searchId && userSummaries.length === 0) {
      loadMoreUsers();
    }
  }, [searchId, userSummaries.length, loadMoreUsers]);

  if (loading && userSummaries.length === 0) {
    return (
      <Box ta="center" py="xl">
        <Loader size="md" />
        <Text size="sm" c="dimmed" mt="md">
          Loading search results...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Text size="sm" c="red">
        {error}
      </Text>
    );
  }

  if (userSummaries.length === 0) {
    return (
      <Text size="sm" c="dimmed">
        No results yet. Enter a search query above or select a search from history.
      </Text>
    );
  }

  const totalFiles = userSummaries.reduce((sum, user) => sum + user.fileCount, 0);

  return (
    <Box>
      <Group justify="space-between" pb="xs">
        <Text size="sm" c="dimmed">
          Found {totalFiles} files from {userSummaries.length} users
          {totalUsers > userSummaries.length ? ` (showing ${userSummaries.length} of ${totalUsers})` : ""}
        </Text>
        <Group gap="xs">
          {selectedFiles.size > 0 && (
            <Badge variant="light" color="blue">
              {selectedFiles.size} selected
            </Badge>
          )}
          <DownloadButton />
        </Group>
      </Group>

      <Accordion variant="separated">
        {userSummaries.map((user) => {
          const files = userFiles.get(user.username);
          return (
            <Accordion.Item key={user.username} value={user.username}>
              <Box>
                <Group gap={0} wrap="nowrap">
                  <Box style={{ flex: 1 }}>
                    <Accordion.Control
                      icon={<IconUser size={20} />}
                      onClick={() => {
                        if (!files) {
                          loadUserFiles(user.username);
                        }
                      }}
                    >
                      <Group justify="space-between" pr="md" wrap="nowrap">
                        <Text fw={500} style={{ flex: 1 }}>
                          {user.username}
                        </Text>
                        <Group gap="xs" wrap="nowrap">
                          <Badge variant="light">{user.fileCount} files</Badge>
                          {user.lockedFileCount > 0 && (
                            <Badge variant="dot" color="orange" size="sm">
                              {user.lockedFileCount} locked
                            </Badge>
                          )}
                          {user.hasFreeUploadSlot && (
                            <Badge variant="dot" color="green" size="sm">
                              Free slot
                            </Badge>
                          )}
                          <Text size="xs" c="dimmed">
                            {Math.round(user.uploadSpeed / 1024)} KB/s
                          </Text>
                        </Group>
                      </Group>
                    </Accordion.Control>
                  </Box>
                  <ActionIcon
                    variant="light"
                    color="blue"
                    size="lg"
                    onClick={() => {
                      router.push(
                        `/browse_shares?username=${encodeURIComponent(user.username)}&filter=${encodeURIComponent(
                          searchQuery || ""
                        )}`
                      );
                    }}
                    title="Browse user shares"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderLeft: "1px solid var(--mantine-color-gray-3)",
                    }}
                  >
                    <IconFolderOpen size={18} />
                  </ActionIcon>
                </Group>
              </Box>
              <Accordion.Panel>
                {!files ? (
                  <Box ta="center" py="md">
                    <Loader size="sm" />
                  </Box>
                ) : (
                  <Table striped highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th style={{ width: 40 }}></Table.Th>
                        <Table.Th>File</Table.Th>
                        <Table.Th>Size</Table.Th>
                        <Table.Th>Bitrate</Table.Th>
                        <Table.Th>Duration</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {files.files
                        .sort((a, b) => (a.filename ?? "").localeCompare(b.filename ?? ""))
                        .map((file, index) => {
                          const fileKey = `${user.username}:${file.path || file.filename}`;
                          return (
                            <Table.Tr
                              key={index}
                              onClick={() => toggleFileSelection(user.username, file.path || file.filename || "")}
                              style={{ cursor: "pointer" }}
                            >
                              <Table.Td onClick={(e) => e.stopPropagation()}>
                                <Checkbox
                                  checked={selectedFiles.has(fileKey)}
                                  onChange={() => toggleFileSelection(user.username, file.path || file.filename || "")}
                                />
                              </Table.Td>
                              <Table.Td>
                                <Text size="sm" truncate>
                                  {file.filename}
                                </Text>
                              </Table.Td>
                              <Table.Td>{file.size ? formatFileSize(file.size) : "-"}</Table.Td>
                              <Table.Td>{file.bit_rate ? `${file.bit_rate} kbps` : "-"}</Table.Td>
                              <Table.Td>
                                {file.length
                                  ? `${Math.floor(file.length / 60)}:${("0" + (file.length % 60)).slice(-2)}`
                                  : "-"}
                              </Table.Td>
                            </Table.Tr>
                          );
                        })}
                    </Table.Tbody>
                  </Table>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>

      {hasMoreUsers && (
        <Box ta="center" mt="md">
          <Button variant="light" onClick={loadMoreUsers} loading={loading} leftSection={<IconChevronDown size={16} />}>
            Load More Users ({totalUsers - userSummaries.length} remaining)
          </Button>
        </Box>
      )}
    </Box>
  );
}
