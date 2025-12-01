"use client";

import { Text, Box, Accordion, Table, Badge, Group, Button, Loader, ActionIcon } from "@mantine/core";
import { useCurrentSearch, UserSummary, UserFiles } from "./CurrentSearchContext";
import { DownloadButton } from "./DownloadButton";
import { IconUser, IconChevronDown, IconFolderOpen } from "@tabler/icons-react";
import { useEffect, memo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FileModel } from "@/generated/slskd-api";
import { FileListItem } from "@/components/FileListItem";

// Separate component for rendering a user summary
const UserSummaryComponent = memo(
  ({
    user,
    files,
    userSelectedFiles,
    searchQuery,
    onLoadUserFiles,
    onToggleFileSelection,
  }: {
    user: UserSummary;
    files: UserFiles | undefined;
    userSelectedFiles: Set<string> | undefined;
    searchQuery: string;
    onLoadUserFiles: (username: string) => void;
    onToggleFileSelection: (username: string, filepath: string) => void;
  }) => {
    const router = useRouter();
    const hasSelectedFiles = (userSelectedFiles?.size || 0) > 0;

    const handleAccordionClick = useCallback(() => {
      if (!files) {
        onLoadUserFiles(user.username);
      }
    }, [files, onLoadUserFiles, user.username]);

    const handleBrowseClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(
          `/browse_shares?username=${encodeURIComponent(user.username)}&filter=${encodeURIComponent(searchQuery || "")}`
        );
      },
      [router, user.username, searchQuery]
    );

    return (
      <Accordion.Item key={user.username} value={user.username}>
        <Box>
          <Group gap={0} wrap="nowrap">
            <Box
              style={{
                flex: 1,
                borderLeft: hasSelectedFiles ? "3px solid var(--mantine-color-blue-6)" : undefined,
              }}
            >
              <Accordion.Control icon={<IconUser size={20} />} onClick={handleAccordionClick}>
                <Group justify="space-between" pr="md" wrap="nowrap">
                  <Text fw={500} style={{ flex: 1 }}>
                    {user.username}
                  </Text>
                  <Group gap="xs" wrap="nowrap">
                    {hasSelectedFiles && (
                      <Badge variant="filled" color="blue" size="sm">
                        {userSelectedFiles?.size || 0} selected
                      </Badge>
                    )}
                    {user.hasFreeUploadSlot && (
                      <Badge variant="dot" color="green" size="sm">
                        Free slot
                      </Badge>
                    )}
                    <Badge variant="light">{user.fileCount} files</Badge>
                    {user.lockedFileCount > 0 && (
                      <Badge variant="dot" color="orange" size="sm">
                        {user.lockedFileCount} locked
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
              onClick={handleBrowseClick}
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
                {files!.files.map((file: FileModel, index: number) => {
                  const filepath = file.filename || "";
                  const isSelected = userSelectedFiles?.has(filepath) || false;
                  return (
                    <FileListItem
                      key={index}
                      file={file}
                      username={user.username}
                      isSelected={isSelected}
                      toggleFileSelection={onToggleFileSelection}
                    />
                  );
                })}
              </Table.Tbody>
            </Table>
          )}
        </Accordion.Panel>
      </Accordion.Item>
    );
  }
);

UserSummaryComponent.displayName = "UserSummaryComponent";

export function CurrentSearch() {
  // Get searchId from URL params
  const searchParams = useSearchParams();
  const searchId = searchParams?.get("searchId") || null;

  const {
    userSummaries,
    userFiles,
    totalUsers,
    hasMoreUsers,
    loading,
    error,
    selectionForDownload,
    loadSearch,
    toggleFileSelection,
    loadMoreUsers,
    loadUserFiles,
    searchQuery,
  } = useCurrentSearch();

  // Load search from URL params
  useEffect(() => {
    if (searchId) {
      loadSearch(searchId);
    }
  }, [searchId, loadSearch]);

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

        <DownloadButton />
      </Group>

      <Accordion variant="separated">
        {userSummaries.map((user) => {
          const files = userFiles.get(user.username);

          return (
            <UserSummaryComponent
              key={user.username}
              user={user}
              files={files}
              userSelectedFiles={selectionForDownload.get(user.username)}
              searchQuery={searchQuery}
              onLoadUserFiles={loadUserFiles}
              onToggleFileSelection={toggleFileSelection}
            />
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
