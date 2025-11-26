"use client";

import { Text, Box } from "@mantine/core";
import { useBrowseShares } from "./BrowseSharesContext";
import DirectoriesTreeView from "./DirectoriesTreeView";
import FilesView from "./FilesView";

export function Results() {
  const { tree, loading } = useBrowseShares();

  if (loading && !tree) {
    return (
      <Text size="sm" c="dimmed">
        Searching...
      </Text>
    );
  }

  if (tree && tree.children.size === 0) {
    return (
      <Text size="sm" c="dimmed">
        No directories found
      </Text>
    );
  }

  return (
    <Box id="browse-shares-results" className="flex-column">
      {tree && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="flex-column">
          <DirectoriesTreeView />
          <FilesView />
        </div>
      )}
    </Box>
  );
}
