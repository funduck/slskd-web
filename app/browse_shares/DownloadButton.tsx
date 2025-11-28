"use client";

import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useBrowseShares } from "./BrowseSharesContext";
import { useDownloads } from "../downloads/DownloadsContext";
import { notifications } from "@mantine/notifications";
import { findNodeByPath } from "@/lib/directories";

export function DownloadButton() {
  const { tree, selectedDirectory, selectedFiles, username, clearSelection } = useBrowseShares();
  const { enqueueDownloads } = useDownloads();

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
      Download {selectedFiles.size > 0 ? `(${selectedFiles.size})` : ""}
    </Button>
  );
}
