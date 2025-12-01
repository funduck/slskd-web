import { FileModel } from "@/generated/slskd-api";
import { formatFileSize } from "@/lib/format";
import { Paper, Checkbox, Text, Group, Badge } from "@mantine/core";
import { memo, useCallback } from "react";

// Separate component for rendering a file row
export const FileListItem = memo(
  ({
    file,
    username,
    selectable = true,
    isSelected = false,
    selectOnRowClick = true,
    toggleFileSelection,
  }: {
    file: FileModel;
    username: string;
    selectable?: boolean;
    isSelected?: boolean;
    selectOnRowClick?: boolean;
    toggleFileSelection: (username: string, filepath: string) => void;
  }) => {
    const filepath = file.filename || "";

    const handleClick = useCallback(() => {
      if (selectOnRowClick) {
        toggleFileSelection(username, filepath);
      }
    }, [toggleFileSelection, username, filepath, selectOnRowClick]);

    const handleCheckboxChange = useCallback(() => {
      toggleFileSelection(username, filepath);
    }, [toggleFileSelection, username, filepath]);

    const handleCheckboxClick = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
    }, []);

    return (
      <Paper
        key={`${username}::${filepath}`}
        p="xs"
        style={{
          cursor: selectOnRowClick ? "pointer" : "default",
          borderLeft: isSelected ? "3px solid var(--mantine-color-blue-6)" : undefined,
        }}
        bg={isSelected ? "var(--mantine-color-blue-light)" : undefined}
        onClick={handleClick}
      >
        <Group justify="space-between" align="center" wrap="nowrap">
          <Group gap="sm" align="center" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
            {selectable && (
              <div onClick={handleCheckboxClick}>
                <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
              </div>
            )}
            <Text size="sm" truncate style={{ flex: 1 }}>
              {file.filename}
            </Text>
          </Group>
          <Group gap="xs" style={{ flexShrink: 0 }}>
            {file.size && (
              <Badge variant="light" color="gray">
                {formatFileSize(file.size)}
              </Badge>
            )}
            {file.bit_rate && (
              <Badge variant="light" color="gray">
                {file.bit_rate} kbps
              </Badge>
            )}
            {file.length && (
              <Badge variant="light" color="gray">
                {Math.floor(file.length / 60)}:{("0" + (file.length % 60)).slice(-2)}
              </Badge>
            )}
          </Group>
        </Group>
      </Paper>
    );
  }
);

FileListItem.displayName = "FileListItem";
