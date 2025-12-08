"use client";

import { Text, Box, Accordion, Badge, Group, Button, Loader, Anchor } from "@mantine/core";
import { useCurrentSearch } from "./CurrentSearchContext";
import { IconChevronDown } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UserFilesBrowser } from "@/components/UserFilesBrowser";
import { useDownload } from "@/components/DownloadContext";
import { DownloadButton } from "@/components/DownloadButton";
import { ShowSelectionButton } from "@/components/ShowSelectionButton";

const ACCORDION_STATE_KEY = "search-accordion-state";

export function CurrentSearch() {
  // Get searchId from URL params
  const searchParams = useSearchParams();
  const searchId = searchParams?.get("searchId") || null;

  const {
    searchQuery,
    userSummaries,
    userTrees,
    totalUsers,
    hasMoreUsers,
    loading,
    error,
    loadSearch,
    loadMoreUsers,
    loadUserTree,
    loadDirectoryChildren,
    applyUserFilter,
  } = useCurrentSearch();

  const { clearAllSelections } = useDownload();

  // Manage accordion state (which items are open)
  const [accordionValue, setAccordionValue] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Restore accordion state from sessionStorage after mount
  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem(ACCORDION_STATE_KEY);
    if (stored) {
      try {
        setAccordionValue(JSON.parse(stored));
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  // Save accordion state to sessionStorage
  useEffect(() => {
    if (mounted && accordionValue) {
      sessionStorage.setItem(ACCORDION_STATE_KEY, JSON.stringify(accordionValue));
    }
  }, [accordionValue, mounted]);

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

  // Load trees for accordion items that are restored as open
  useEffect(() => {
    if (mounted && accordionValue.length > 0 && userSummaries.length > 0) {
      // Load trees for any open accordion items that don't have trees yet
      accordionValue.forEach((username) => {
        if (!userTrees.has(username)) {
          loadUserTree(username);
        }
      });
    }
  }, [mounted, accordionValue, userSummaries, userTrees, loadUserTree]);

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
          <ShowSelectionButton />
          <DownloadButton onClearSelection={clearAllSelections} />
        </Group>
      </Group>

      <Accordion variant="separated" multiple value={accordionValue} onChange={setAccordionValue}>
        {userSummaries.map((user) => {
          const userTree = userTrees.get(user.username);

          return (
            <Accordion.Item key={user.username} value={user.username}>
              <Accordion.Control onClick={() => !userTree && loadUserTree(user.username)}>
                <Group justify="space-between">
                  <Group gap="xs">
                    <Text fw={500}>{user.username}</Text>
                    <Anchor
                      href={`/browse_shares?username=${encodeURIComponent(user.username)}&filter=${encodeURIComponent(
                        searchQuery
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Text size="xs">Browse all shares</Text>
                    </Anchor>
                  </Group>

                  <Group gap="xs">
                    <Badge size="sm" variant="light">
                      {user.fileCount} files
                    </Badge>
                    {user.lockedFileCount > 0 && (
                      <Badge size="sm" variant="light" color="orange">
                        {user.lockedFileCount} locked
                      </Badge>
                    )}
                  </Group>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                {!userTree ? (
                  <Box ta="center" py="md">
                    <Loader size="sm" />
                    <Text size="sm" c="dimmed" mt="xs">
                      Loading files...
                    </Text>
                  </Box>
                ) : null}
                {/* Always render UserFilesBrowser once loaded to preserve state */}
                {userTree && (
                  <UserFilesBrowser
                    tree={userTree.tree}
                    loading={loading}
                    username={user.username}
                    filter={userTree.filter}
                    loadDirectoryChildren={(path) => loadDirectoryChildren(user.username, path)}
                    applyFilter={(filter) => applyUserFilter(user.username, filter)}
                    hideFilterAndDownload
                  />
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
