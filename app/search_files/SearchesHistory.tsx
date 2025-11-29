"use client";

import { Box, Text, Table, Badge, Group, ActionIcon, Tooltip } from "@mantine/core";
import { useSearchFiles } from "./SearchFilesContext";
import { IconRefresh, IconClock } from "@tabler/icons-react";

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function SearchesHistory() {
  const { searches, loading, refreshSearches, loadSearch } = useSearchFiles();

  if (searches.length === 0 && !loading) {
    return (
      <Box>
        <Group justify="space-between" pb="xs">
          <Text size="sm" fw={500}>
            Search History
          </Text>
          <Tooltip label="Refresh">
            <ActionIcon variant="subtle" onClick={() => refreshSearches()}>
              <IconRefresh size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <Text size="sm" c="dimmed">
          No search history yet.
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Group justify="space-between" pb="xs">
        <Group gap="xs">
          <IconClock size={20} />
          <Text size="sm" fw={500}>
            Search History
          </Text>
          <Badge variant="light" size="sm">
            {searches.length}
          </Badge>
        </Group>
        <Tooltip label="Refresh">
          <ActionIcon variant="subtle" onClick={() => refreshSearches()} loading={loading}>
            <IconRefresh size={18} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Query</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Files</Table.Th>
            <Table.Th>Responses</Table.Th>
            <Table.Th>Started</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {searches
            .sort((a, b) => {
              const dateA = a.started_at ? new Date(a.started_at).getTime() : 0;
              const dateB = b.started_at ? new Date(b.started_at).getTime() : 0;
              return dateB - dateA; // Most recent first
            })
            .map((search) => (
              <Table.Tr
                key={search.id}
                onClick={() => {
                  if (search.id) {
                    console.log(`Loading search from history: ${search.id}`);
                    loadSearch(search.id);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <Table.Td>
                  <Group>
                    <Text size="xs" c="dimmed" style={{ fontFamily: "monospace" }}>
                      {search.id}
                    </Text>
                    <Text size="sm" fw={500}>
                      {search.search_text || "Unknown"}
                    </Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge
                    variant="light"
                    color={search.is_complete ? (search.file_count ? "green" : "yellow") : "blue"}
                    size="sm"
                  >
                    {search.state || "Unknown"}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Text size="sm">{search.file_count || 0}</Text>
                    {search.locked_file_count ? (
                      <Badge variant="dot" color="orange" size="sm">
                        {search.locked_file_count} locked
                      </Badge>
                    ) : null}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{search.response_count || 0}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">
                    {search.started_at ? formatDate(new Date(search.started_at)) : "-"}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
