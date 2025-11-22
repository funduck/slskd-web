"use client";

import { Text, Box, Grid } from "@mantine/core";
import { useBrowseShares } from "./BrowseSharesContext";
import { useIsMobile } from "../hooks/is-mobile";
import DirectoriesView from "./DirectoriesView";
import FilesView from "./FilesView";

export function Results() {
  const isMobile = useIsMobile();
  const { result, loading, error, hasMore, loadMore } = useBrowseShares();

  const directories = result?.directories || [];

  if (loading && directories.length === 0) {
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
    <Box w="100%">
      {result && (
        <Grid>
          <Grid.Col span={isMobile ? 12 : 6}>
            <DirectoriesView />
          </Grid.Col>

          <Grid.Col span={isMobile ? 12 : 6}>
            <FilesView />
          </Grid.Col>
        </Grid>
      )}
    </Box>
  );
}
