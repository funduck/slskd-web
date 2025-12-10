"use client";

import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDownload } from "@tabler/icons-react";
import { memo, useState } from "react";

import { useDownload } from "./DownloadContext";
import { DownloadPathModal } from "./DownloadPathModal";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export const DownloadButton = memo(({ onClearSelection }: { onClearSelection: () => void }) => {
  const { loading, error, stats, enqueueSelection, getSelectedFiles } = useDownload();
  const { count, size } = stats;
  const [modalOpened, setModalOpened] = useState(false);

  const handleDownload = async (pathMappings?: Map<string, Map<string, string>>) => {
    try {
      await enqueueSelection(pathMappings);
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

  // Prepare directory groups for the modal
  const getDirectoryGroups = () => {
    const groups: Array<{ username: string; directoryPath: string; files: any[] }> = [];
    const selectedFiles = getSelectedFiles();

    for (const [username, userDirectories] of selectedFiles) {
      for (const [directoryPath, directoryFiles] of userDirectories) {
        groups.push({
          username,
          directoryPath,
          files: Array.from(directoryFiles.values()),
        });
      }
    }

    return groups;
  };

  return (
    <>
      <Button
        size="xs"
        leftSection={<IconDownload size={16} />}
        onClick={() => setModalOpened(true)}
        disabled={loading || count === 0}
      >
        Download {`${count} ${count === 1 ? "file" : "files"}`}
        {size > 0 && ` (${formatBytes(size)})`}
      </Button>

      <DownloadPathModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        directories={getDirectoryGroups()}
        onDownload={handleDownload}
      />
    </>
  );
});

DownloadButton.displayName = "DownloadButton";
