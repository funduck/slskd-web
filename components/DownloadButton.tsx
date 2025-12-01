"use client";

import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { memo } from "react";
import { useDownload } from "./DownloadContext";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export const DownloadButton = memo(({ onClearSelection }: { onClearSelection: () => void }) => {
  const { loading, error, stats, enqueueSelection } = useDownload();
  const { count, size } = stats;

  const handleDownload = async () => {
    try {
      await enqueueSelection();
      onClearSelection();
      notifications.show({
        title: "Downloads Enqueued",
        message: `Enqueued ${stats.count} files for download.`,
        color: "green",
      });
    } catch (err) {
      notifications.show({
        title: "Download Error",
        message: String(err),
        color: "red",
      });
    }
  };

  return (
    <Button
      size="xs"
      leftSection={<IconDownload size={16} />}
      onClick={handleDownload}
      disabled={loading || count === 0}
    >
      Download {`${count} ${count === 1 ? "file" : "files"}`}
      {size > 0 && ` (${formatBytes(size)})`}
    </Button>
  );
});

DownloadButton.displayName = "DownloadButton";
