"use client";

import { Text } from "@mantine/core";
import { useBrowseShares } from "./BrowseSharesContext";

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

  return (
    <Text size="sm" c="dimmed">
      {result?.directory_count} {result?.directory_count === 1 ? "directory" : "directories"} found
    </Text>
  );
}
