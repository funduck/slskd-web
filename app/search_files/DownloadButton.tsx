"use client";

import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useSearchFiles } from "./SearchFilesContext";
import { useDownloads } from "../downloads/DownloadsContext";
import { useState, useMemo } from "react";
import { notifications } from "@mantine/notifications";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function DownloadButton() {
  const { selectedFiles, userFiles, clearSelection } = useSearchFiles();
  const { enqueueDownloads } = useDownloads();
  const [loading, setLoading] = useState(false);

  // Calculate total size of selected files
  const totalSize = useMemo(() => {
    let size = 0;
    for (const key of selectedFiles) {
      const [username, filepath] = key.split(":", 2);
      const userFileData = userFiles.get(username);
      const file = userFileData?.files.find((f) => f.filename === filepath);
      if (file?.size) {
        size += file.size;
      }
    }
    return size;
  }, [selectedFiles, userFiles]);

  const handleDownload = async () => {
    if (selectedFiles.size === 0) return;

    setLoading(true);

    try {
      // Group selected files by username
      const filesByUsername = new Map<string, Array<{ username: string; filename: string; size?: number }>>();

      for (const key of selectedFiles) {
        const [username, filepath] = key.split(":", 2);

        if (!username || !filepath) {
          console.warn(`Invalid selected file key: ${key}`);
          continue;
        }

        // Get file info from userFiles to include size
        const userFileData = userFiles.get(username);
        const file = userFileData?.files.find((f) => f.filename === filepath);

        if (!filesByUsername.has(username)) {
          filesByUsername.set(username, []);
        }

        filesByUsername.get(username)!.push({
          username,
          filename: filepath,
          size: file?.size,
        });
      }

      // Enqueue downloads for each user
      let totalEnqueued = 0;
      const errors: string[] = [];

      for (const [username, files] of filesByUsername) {
        try {
          await enqueueDownloads(username, files);
          totalEnqueued += files.length;
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
            filesByUsername.size
          } user${filesByUsername.size === 1 ? "" : "s"}`,
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
  };

  if (selectedFiles.size === 0) return null;

  return (
    <Button
      size="xs"
      leftSection={<IconDownload size={16} />}
      onClick={handleDownload}
      loading={loading}
      disabled={loading}
    >
      Download {selectedFiles.size} {selectedFiles.size === 1 ? "file" : "files"}
      {totalSize > 0 && ` (${formatBytes(totalSize)})`}
    </Button>
  );
}
