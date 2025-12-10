"use client";

import type { TransferModel } from "@/lib/api-types";
import { Accordion, Badge, Box, Button, Group, Progress, ScrollArea, Table, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { useDownloads } from "./DownloadsContext";

export function History() {
  const { downloads, loading, cancelDownload } = useDownloads();

  const handleCancel = async (transfer: TransferModel) => {
    // The ID for a transfer is the filename
    const id = transfer.id || transfer.filename;
    if (!transfer.username || !id) {
      console.error("Cannot cancel: missing username or id/filename", transfer);
      notifications.show({
        title: "Cannot cancel",
        message: "Missing username or download ID",
        color: "red",
      });
      return;
    }
    try {
      await cancelDownload(transfer.username, id, false);
      notifications.show({
        title: "Download cancelled",
        message: `Cancelled download of ${transfer.filename}`,
        color: "blue",
      });
    } catch (err) {
      console.error("Failed to cancel download:", err);
      notifications.show({
        title: "Failed to cancel",
        message: String(err),
        color: "red",
      });
    }
  };

  const handleRemove = async (transfer: TransferModel) => {
    // The ID for a transfer is the filename
    const id = transfer.id || transfer.filename;
    if (!transfer.username || !id) {
      console.error("Cannot remove: missing username or id/filename", transfer);
      notifications.show({
        title: "Cannot remove",
        message: "Missing username or download ID",
        color: "red",
      });
      return;
    }
    try {
      await cancelDownload(transfer.username, id, true);
      notifications.show({
        title: "Download removed",
        message: `Removed ${transfer.filename} from list`,
        color: "green",
      });
    } catch (err) {
      console.error("Failed to remove download:", err);
      notifications.show({
        title: "Failed to remove",
        message: String(err),
        color: "red",
      });
    }
  };

  if (downloads.length === 0 && !loading) {
    return (
      <Text size="sm" c="dimmed">
        No downloads
      </Text>
    );
  }

  return (
    <ScrollArea>
      <Accordion multiple>
        {downloads.map((userGroup) => {
          const username = userGroup.username || "Unknown";
          const allTransfers: TransferModel[] = userGroup.directories?.flatMap((dir) => dir.files || []) || [];
          const inProgressCount = allTransfers.filter((transfer) => isInProgress(transfer)).length;
          const queuedCount = allTransfers.filter((transfer) => isQueued(transfer)).length;
          const erroredCount = allTransfers.filter((transfer) => isErrored(transfer)).length;

          if (allTransfers.length === 0) return null;

          return (
            <Accordion.Item key={username} value={username}>
              <Accordion.Control>
                <Group justify="space-between" pr="md">
                  <Text fw={500}>{username}</Text>
                  <Group gap="xs">
                    <LastUpdatedBadge transfers={allTransfers} />
                    {inProgressCount > 0 && (
                      <Badge color="green" variant="light">
                        {inProgressCount} in progress
                      </Badge>
                    )}
                    {queuedCount > 0 && (
                      <Badge color="yellow" variant="light">
                        {queuedCount} queued
                      </Badge>
                    )}
                    {erroredCount > 0 && (
                      <Badge color="red" variant="light">
                        {erroredCount} errored
                      </Badge>
                    )}
                    <Badge color="blue" variant="light">
                      {allTransfers.length} {allTransfers.length === 1 ? "file" : "files"}
                    </Badge>
                  </Group>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Accordion multiple>
                  {userGroup.directories?.map((directory, dirIndex) => {
                    const dirPath = directory.directory || "Unknown";
                    const dirFiles = directory.files || [];
                    const dirInProgressCount = dirFiles.filter((transfer) => isInProgress(transfer)).length;
                    const dirQueuedCount = dirFiles.filter((transfer) => isQueued(transfer)).length;
                    const dirErroredCount = dirFiles.filter((transfer) => isErrored(transfer)).length;

                    if (dirFiles.length === 0) return null;

                    return (
                      <Accordion.Item key={`${username}-${dirIndex}`} value={`${username}-${dirPath}`}>
                        <Accordion.Control>
                          <Group justify="space-between" pr="md">
                            <Text size="sm" fw={500} truncate="end">
                              {dirPath}
                            </Text>
                            <Group gap="xs">
                              <LastUpdatedBadge transfers={dirFiles} />
                              {dirInProgressCount > 0 && (
                                <Badge color="green" variant="light" size="sm">
                                  {dirInProgressCount} in progress
                                </Badge>
                              )}
                              {dirQueuedCount > 0 && (
                                <Badge color="yellow" variant="light" size="sm">
                                  {dirQueuedCount} queued
                                </Badge>
                              )}
                              {dirErroredCount > 0 && (
                                <Badge color="red" variant="light" size="sm">
                                  {dirErroredCount} errored
                                </Badge>
                              )}
                              <Badge color="blue" variant="light" size="sm">
                                {dirFiles.length} {dirFiles.length === 1 ? "file" : "files"}
                              </Badge>
                            </Group>
                          </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Table striped highlightOnHover>
                            <Table.Thead>
                              <Table.Tr>
                                <Table.Th>File</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Progress</Table.Th>
                                <Table.Th>Size</Table.Th>
                                <Table.Th>Updated</Table.Th>
                                <Table.Th>Actions</Table.Th>
                              </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                              {dirFiles.map((transfer, index) => {
                                const transferKey = transfer.id || transfer.filename || index;
                                // Extract just the filename from the full path
                                const displayName = transfer.filename
                                  ? transfer.filename.split(/[/\\]/).pop() || transfer.filename
                                  : "Unknown";
                                return (
                                  <Table.Tr key={transferKey}>
                                    <Table.Td>
                                      <Text size="sm" style={{ maxWidth: 400 }} truncate="end">
                                        {displayName}
                                      </Text>
                                    </Table.Td>
                                    <Table.Td>
                                      <TransferStatusBadge transfer={transfer} />
                                    </Table.Td>
                                    <Table.Td>
                                      <Box style={{ width: 120 }}>
                                        <Progress
                                          value={transfer.percent_complete || 0}
                                          size="sm"
                                          striped={transfer.state?.toString().includes("Progress")}
                                          animated={transfer.state?.toString().includes("Progress")}
                                        />
                                        <Text size="xs" c="dimmed">
                                          {(transfer.percent_complete || 0).toFixed(1)}%
                                        </Text>
                                      </Box>
                                    </Table.Td>
                                    <Table.Td>
                                      <Text size="sm">{formatFileSize(transfer.size || 0)}</Text>
                                    </Table.Td>
                                    <Table.Td>
                                      <FileLastUpdated transfer={transfer} />
                                    </Table.Td>
                                    <Table.Td>
                                      <Group gap="xs">
                                        {!isCompleted(transfer) && (
                                          <Button
                                            size="xs"
                                            variant="light"
                                            color="red"
                                            onClick={() => handleCancel(transfer)}
                                          >
                                            Cancel
                                          </Button>
                                        )}
                                        <Button
                                          size="xs"
                                          variant="light"
                                          color="gray"
                                          onClick={() => handleRemove(transfer)}
                                          leftSection={<IconX size={14} />}
                                        >
                                          Remove
                                        </Button>
                                      </Group>
                                    </Table.Td>
                                  </Table.Tr>
                                );
                              })}
                            </Table.Tbody>
                          </Table>
                        </Accordion.Panel>
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </ScrollArea>
  );
}

function TransferStatusBadge({ transfer }: { transfer: TransferModel }) {
  const state = transfer.state?.toString() || "Unknown";

  let color = "gray";
  if (state.includes("InProgress")) color = "blue";
  else if (state.includes("Completed") && !transfer.exception) color = "green";
  else if (state.includes("Completed") && transfer.exception) color = "red";
  else if (state.includes("Queued")) color = "yellow";
  else if (state.includes("Cancelled")) color = "orange";

  return (
    <Badge color={color} variant="light" size="sm">
      {state}
    </Badge>
  );
}

function LastUpdatedBadge({ transfers }: { transfers: TransferModel[] }) {
  const latestDate = getLatestDate(transfers);
  const timeAgo = useTimeAgo(latestDate);

  if (!latestDate) return null;

  return (
    <Badge color="gray" variant="light" size="sm">
      {timeAgo}
    </Badge>
  );
}

function FileLastUpdated({ transfer }: { transfer: TransferModel }) {
  const latestDate = getLatestDate([transfer]);
  const timeAgo = useTimeAgo(latestDate);

  if (!latestDate) {
    return (
      <Text size="sm" c="dimmed">
        -
      </Text>
    );
  }

  return (
    <Text size="sm" c="dimmed">
      {timeAgo}
    </Text>
  );
}

function isCompleted(transfer: TransferModel): boolean {
  const state = transfer.state?.toString() || "";
  return state.includes("Completed") || state.includes("Cancelled");
}

function isInProgress(transfer: TransferModel): boolean {
  const state = transfer.state?.toString() || "";
  return state.includes("InProgress");
}

function isQueued(transfer: TransferModel): boolean {
  const state = transfer.state?.toString() || "";
  return state.includes("Queued");
}

function isErrored(transfer: TransferModel): boolean {
  const state = transfer.state?.toString() || "";
  return state.includes("Completed") && !!transfer.exception;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatSpeed(bytesPerSecond: number): string {
  if (bytesPerSecond === 0) return "0 B/s";
  const k = 1024;
  const sizes = ["B/s", "KB/s", "MB/s", "GB/s"];
  const i = Math.floor(Math.log(bytesPerSecond) / Math.log(k));
  return parseFloat((bytesPerSecond / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function getLatestDate(transfers: TransferModel[]): Date | null {
  let latestDate: Date | null = null;

  for (const transfer of transfers) {
    const dates = [transfer.requested_at, transfer.enqueued_at, transfer.started_at, transfer.ended_at]
      .filter((date): date is Date => date != null)
      .map((date) => new Date(date));

    for (const date of dates) {
      if (!latestDate || date > latestDate) {
        latestDate = date;
      }
    }
  }

  return latestDate;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

function useTimeAgo(date: Date | null): string {
  const [timeAgo, setTimeAgo] = useState(() => (date ? formatTimeAgo(date) : ""));

  useEffect(() => {
    if (!date) return;

    // Update immediately
    setTimeAgo(formatTimeAgo(date));

    // Update every 10 seconds
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(date));
    }, 10000);

    return () => clearInterval(interval);
  }, [date]);

  return timeAgo;
}
