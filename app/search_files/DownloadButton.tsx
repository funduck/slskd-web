"use client";

import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useCurrentSearch } from "./CurrentSearchContext";
import { useDownloads } from "../downloads/DownloadsContext";
import { useState, useCallback } from "react";
import { notifications } from "@mantine/notifications";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function DownloadButton() {
  const { selectionForDownload, userFiles, clearSelection, selectionTotalSize, selectionTotalCount } =
    useCurrentSearch();
  const { enqueueDownloads } = useDownloads();
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (selectionForDownload.size === 0) return;

    setLoading(true);

    try {
      // Enqueue downloads for each user
      let totalEnqueued = 0;
      const errors: string[] = [];

      for (const [username, filepaths] of selectionForDownload) {
        const userFileData = userFiles.get(username);
        if (!userFileData) continue;

        const filesToDownload = Array.from(filepaths)
          .map((filepath) => userFileData.filesMap.get(filepath))
          .filter(Boolean)
          .map((file) => {
            return {
              username,
              filename: file!.filename || "",
              size: file!.size,
            };
          });

        try {
          await enqueueDownloads(username, filesToDownload);
          totalEnqueued += filesToDownload.length;
        } catch (error) {
          const errorMsg = `Failed to enqueue downloads from ${username}: ${String(error)}`;
          console.error(errorMsg);
          errors.push(errorMsg);
        }
      }

      // Show success notification
      if (totalEnqueued > 0) {
        notifications.show({
          title: "Downloads Enqueued",
          message: `Successfully enqueued ${totalEnqueued} file${totalEnqueued === 1 ? "" : "s"} from ${
            selectionForDownload.size
          } user${selectionForDownload.size === 1 ? "" : "s"}`,
          color: "green",
        });

        // Clear selection after successful enqueue
        clearSelection();
      }

      // Show error notifications if any
      if (errors.length > 0) {
        notifications.show({
          title: "Some Downloads Failed",
          message: errors.join("\n"),
          color: "red",
        });
      }
    } catch (error) {
      console.error("Error enqueueing downloads:", error);
      notifications.show({
        title: "Download Failed",
        message: String(error),
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }, [selectionForDownload, userFiles, enqueueDownloads, clearSelection]);

  return (
    <Button
      size="xs"
      leftSection={<IconDownload size={16} />}
      onClick={handleDownload}
      loading={loading}
      disabled={loading || selectionTotalCount === 0}
    >
      Download {selectionTotalCount} {selectionTotalCount === 1 ? "file" : "files"}
      {selectionTotalSize > 0 && ` (${formatBytes(selectionTotalSize)})`}
    </Button>
  );
}
