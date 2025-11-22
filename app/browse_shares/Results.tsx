"use client";

import { Text, Box, ScrollArea, Grid, Loader, Center } from "@mantine/core";
import { useBrowseShares } from "./BrowseSharesContext";
import DirectoryItem from "./DirectoryItem";
import { useRef, useCallback } from "react";
import { useIsMobile } from "../hooks/is-mobile";

export function Results() {
  const isMobile = useIsMobile();
  const { result, loading, error, hasMore, loadMore } = useBrowseShares();
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const viewport = scrollViewportRef.current;
    if (!viewport || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = viewport;
    const scrolledToBottom = scrollHeight - scrollTop - clientHeight < 50; // Trigger 50px before bottom

    if (scrolledToBottom) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

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
            <ScrollArea h={"80vh"} viewportRef={scrollViewportRef} onScrollPositionChange={handleScroll}>
              {directories.map((directory, index) => (
                <DirectoryItem key={index} directory={directory} />
              ))}
              {loading && (
                <Center p="md">
                  <Loader size="sm" />
                </Center>
              )}
              {!hasMore && directories.length > 0 && (
                <Center p="md">
                  <Text size="sm" c="dimmed">
                    No more folders
                  </Text>
                </Center>
              )}
            </ScrollArea>
          </Grid.Col>

          <Grid.Col span={isMobile ? 12 : 6}></Grid.Col>
        </Grid>
      )}
    </Box>
  );
}
