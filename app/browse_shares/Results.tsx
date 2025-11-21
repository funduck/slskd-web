"use client";

import { Space, Text, Box } from "@mantine/core";
import { useBrowseShares } from "./BrowseSharesContext";
import { List, type RowComponentProps } from "react-window";
import DirectoryItem from "./DirectoryItem";
import type { Directory } from "@/generated/slskd-api";
import { useMemo } from "react";

type RowProps = {
  directories: Directory[];
};

export function Results() {
  const { result, loading, error } = useBrowseShares();

  if (loading) {
    return (
      <Text size="sm" c="dimmed">
        Searching...
      </Text>
    );
  }

  if (error) {
    return (
      <Text size="sm" c="red">
        {error}
      </Text>
    );
  }

  if (result?.directory_count === 0) {
    return null;
  }

  const directories = result?.directories || [];

  // Row renderer for the virtualized list
  const Row = ({ index, style, directories }: RowComponentProps<RowProps>) => {
    const directory = directories[index];
    return (
      <div style={style}>
        <DirectoryItem directory={directory} />
      </div>
    );
  };

  const rowProps = useMemo(() => ({ directories }), [directories]);

  return (
    <Box style={{ width: "100%" }}>
      {result && (
        <>
          <Text size="sm" c="dimmed">
            {result?.directory_count} {result?.directory_count === 1 ? "directory" : "directories"} found
          </Text>
          <Space h="md" />

          <List rowCount={directories.length} rowHeight={60} rowComponent={Row} rowProps={rowProps}>
            {null}
          </List>
        </>
      )}
    </Box>
  );
}
