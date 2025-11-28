"use client";

import { Results } from "./Results";
import { Box, Group, Space, Text } from "@mantine/core";
import { FilterInput } from "./FilterInput";
import { useBrowseShares } from "./BrowseSharesContext";
import { SearchInput } from "./SearchInput";
import { DownloadButton } from "./DownloadButton";

export default function () {
  const { tree, error, selectedFiles } = useBrowseShares();

  return (
    <Box id="browse-shares-page" className="flex-column">
      <SearchInput />

      {error && (
        <Text size="sm" c="red">
          {error}
        </Text>
      )}

      <Group justify="space-between">
        <FilterInput />
        {selectedFiles.size > 0 && <DownloadButton />}
      </Group>

      <Space h="xs" />

      <Results />
    </Box>
  );
}
