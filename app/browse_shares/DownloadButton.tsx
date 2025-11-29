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
  const { tree, selectionForDownload, username, clearAllSelection } = useBrowseShares();
  const { enqueueDownloads } = useDownloads();

  // Calculate total size and count of selected files across all directories
  const { totalSize, totalCount } = useMemo(() => {
    if (!tree || selectionForDownload.size === 0) return { totalSize: 0, totalCount: 0 };

    let size = 0;
    let count = 0;

    for (const [directoryPath, filenames] of selectionForDownload) {
      const node = findNodeByPath(tree, directoryPath);
      if (!node || !node.files) continue;

      for (const filename of filenames) {
        const file = node.files.find((f) => f.filename === filename);
        if (file) {
          count++;
          if (file.size) {
            size += file.size;
          }
        }
      }
    }

    return { totalSize: size, totalCount: count };
  }, [tree, selectionForDownload]);

  const handleDownload = async () => {
    if (!tree || selectionForDownload.size === 0) return;

    // Collect all files to download from all directories
    const allFilesToDownload: Array<{ username: string; filename: string; size?: number }> = [];

    for (const [directoryPath, filenames] of selectionForDownload) {
      const node = findNodeByPath(tree, directoryPath);
      if (!node || !node.files) continue;

      for (const filename of filenames) {
        const file = node.files.find((f) => f.filename === filename);
        if (file && file.filename) {
          allFilesToDownload.push({
            username,
            filename: file.filename,
            size: file.size,
          });
        }
      }
    }

    if (allFilesToDownload.length === 0) return;

    try {
      await enqueueDownloads(username, allFilesToDownload);
      notifications.show({
        title: "Download started",
        message: `Enqueued ${allFilesToDownload.length} file(s) for download`,
        color: "green",
      });
      clearAllSelection();
    } catch (error) {
      notifications.show({
        title: "Download failed",
        message: String(error),
        color: "red",
      });
    }
  };

  return (
    <Button size="xs" leftSection={<IconDownload size={16} />} onClick={handleDownload} disabled={totalCount === 0}>
      Download {totalCount > 0 ? `${totalCount} ${totalCount === 1 ? "file" : "files"}` : ""}
      {totalSize > 0 && ` (${formatBytes(totalSize)})`}
    </Button>
  );
}
