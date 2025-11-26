"use client";

import { Text, Box, Grid, ScrollArea } from "@mantine/core";
import { useBrowseShares } from "./BrowseSharesContext";
import { useIsMobile } from "../hooks/is-mobile";
import DirectoriesView from "./DirectoriesView";
import FilesView from "./FilesView";

export function Results() {
  // const isMobile = useIsMobile();
  // TODO: fix layout for mobile

  const { result, loading } = useBrowseShares();

  const directories = result?.directories || [];

  if (loading && directories.length === 0) {
    return (
      <Text size="sm" c="dimmed">
        Searching...
      </Text>
    );
  }

  if (result?.directory_count === 0) {
    <Text size="sm" c="dimmed">
      No directories found
    </Text>;
  }

  return (
    <Box id="browse-shares-results" className="flex-column">
      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="flex-column">
          <DirectoriesView />

          <FilesView />
        </div>
      )}
    </Box>
  );
}
