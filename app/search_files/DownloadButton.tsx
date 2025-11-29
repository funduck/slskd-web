"use client";

import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useSearchFiles } from "./SearchFilesContext";

export function DownloadButton() {
  const { selectedFiles, responses } = useSearchFiles();

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log("Download selected files:", selectedFiles);

    // Parse selected files and prepare download requests
    const downloadRequests = Array.from(selectedFiles).map((key) => {
      const [username, filepath] = key.split(":", 2);
      return { username, filepath };
    });

    console.log("Download requests:", downloadRequests);
    // Here you would call a server action to queue downloads
  };

  if (selectedFiles.size === 0) return null;

  return (
    <Button size="xs" leftSection={<IconDownload size={16} />} onClick={handleDownload}>
      Download {selectedFiles.size} {selectedFiles.size === 1 ? "file" : "files"}
    </Button>
  );
}
