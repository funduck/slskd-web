"use client";

import { Button, Group, Modal, Radio, Stack, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

import { FileForDownloadType } from "./DownloadContext";

interface DirectoryGroup {
  username: string;
  directoryPath: string;
  files: FileForDownloadType[];
}

interface DownloadPathModalProps {
  opened: boolean;
  onClose: () => void;
  directories: DirectoryGroup[];
  onDownload: (pathMappings?: Map<string, Map<string, string>>) => void;
}

export function DownloadPathModal({ opened, onClose, directories, onDownload }: DownloadPathModalProps) {
  const [downloadMode, setDownloadMode] = useState<"default" | "custom">("default");

  // Map<username, Map<directoryPath, customPath>>
  const [customPaths, setCustomPaths] = useState<Map<string, Map<string, string>>>(new Map());

  // Initialize custom paths when modal opens or directories change
  useEffect(() => {
    if (opened && directories.length > 0) {
      const initialPaths = new Map<string, Map<string, string>>();
      directories.forEach(({ username, directoryPath }) => {
        if (!initialPaths.has(username)) {
          initialPaths.set(username, new Map());
        }
        // Initialize with the original directory path
        initialPaths.get(username)!.set(directoryPath, directoryPath);
      });
      setCustomPaths(initialPaths);
    }
  }, [opened, directories]);

  const handlePathChange = (username: string, directoryPath: string, newPath: string) => {
    setCustomPaths((prev) => {
      const updated = new Map(prev);
      if (!updated.has(username)) {
        updated.set(username, new Map());
      }
      updated.get(username)!.set(directoryPath, newPath);
      return updated;
    });
  };

  const handleDownload = () => {
    console.debug("Download initiated with mode:", downloadMode, "and paths:", customPaths);
    if (downloadMode === "default") {
      onDownload();
    } else {
      onDownload(customPaths);
    }
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Download Options" size="lg">
      <Stack gap="md">
        <Radio.Group value={downloadMode} onChange={(value) => setDownloadMode(value as "default" | "custom")}>
          <Stack gap="xs">
            <Radio value="default" label="Use default download paths" />
            <Radio value="custom" label="Choose custom paths for each directory" />
          </Stack>
        </Radio.Group>

        {downloadMode === "custom" && (
          <Stack gap="md" mt="md">
            {/* <Text size="sm" c="dimmed">
              Edit the download path for each directory. The filename will be appended to the path you specify.
            </Text> */}
            {directories.map(({ username, directoryPath, files }) => (
              <Stack key={`${username}-${directoryPath}`} gap="xs">
                <Text size="sm" fw={500}>
                  {username} - {directoryPath}
                </Text>
                {/* <Text size="xs" c="dimmed">
                  {files.length} file{files.length !== 1 ? "s" : ""}
                </Text> */}
                <TextInput
                  placeholder="Enter custom path"
                  value={customPaths.get(username)?.get(directoryPath) || directoryPath}
                  onChange={(e) => handlePathChange(username, directoryPath, e.currentTarget.value)}
                  // description="Files will be saved to this directory"
                />
              </Stack>
            ))}
          </Stack>
        )}

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleDownload}>Download</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
