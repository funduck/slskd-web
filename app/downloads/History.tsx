"use client";

import type { TransferModel } from "@/lib/api-types";
import { Accordion, Badge, Box, Button, Group, Progress, ScrollArea, Table, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

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
      <Accordion multiple defaultValue={downloads.map((user) => user.username || "")}>
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
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>File</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Progress</Table.Th>
                      <Table.Th>Size</Table.Th>
                      <Table.Th>Speed</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {allTransfers.map((transfer, index) => {
                      const transferKey = transfer.id || transfer.filename || index;
                      return (
                        <Table.Tr key={transferKey}>
                          <Table.Td>
                            <Text size="sm" style={{ maxWidth: 300 }} truncate="end">
                              {transfer.filename || "Unknown"}
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
                            <Text size="sm">{transfer.average_speed ? formatSpeed(transfer.average_speed) : "-"}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              {!isCompleted(transfer) && (
                                <Button size="xs" variant="light" color="red" onClick={() => handleCancel(transfer)}>
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
