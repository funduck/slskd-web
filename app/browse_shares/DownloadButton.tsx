"use client";

import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useBrowseShares } from "./BrowseSharesContext";
import { useDownloads } from "../downloads/DownloadsContext";
import { notifications } from "@mantine/notifications";
import { findNodeByPath } from "@/lib/directories";
import { useMemo } from "react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function DownloadButton() {
  const { tree, selectedDirectory, selectedFiles, username, clearSelection } = useBrowseShares();
  const { enqueueDownloads } = useDownloads();

  // Calculate total size of selected files
  const totalSize = useMemo(() => {
    if (!tree || !selectedDirectory || selectedFiles.size === 0) return 0;

    const node = findNodeByPath(tree, selectedDirectory);
    if (!node || !node.files) return 0;

    let size = 0;
    for (const file of node.files) {
      if (file.filename && selectedFiles.has(file.filename) && file.size) {
        size += file.size;
      }
    }
    return size;
  }, [tree, selectedDirectory, selectedFiles]);

  const handleDownload = async () => {
    if (!tree || !selectedDirectory || selectedFiles.size === 0) return;

    const node = findNodeByPath(tree, selectedDirectory);
    if (!node || !node.files) return;

    // Get the files to download from the selected files
    const filesToDownload = node.files
      .filter((file) => file.filename && selectedFiles.has(file.filename))
      .map((file) => ({
        username,
        filename: file.filename!,
        size: file.size,
      }));

    if (filesToDownload.length === 0) return;

    try {
      await enqueueDownloads(username, filesToDownload);
      notifications.show({
        title: "Download started",
        message: `Enqueued ${filesToDownload.length} file(s) for download`,
        color: "green",
      });
      clearSelection();
    } catch (error) {
      notifications.show({
        title: "Download failed",
        message: String(error),
        color: "red",
      });
    }
  };

  return (
    <Button leftSection={<IconDownload size={16} />} onClick={handleDownload} disabled={selectedFiles.size === 0}>
      Download {selectedFiles.size > 0 ? `${selectedFiles.size} ${selectedFiles.size === 1 ? "file" : "files"}` : ""}
      {totalSize > 0 && ` (${formatBytes(totalSize)})`}
    </Button>
  );
}
