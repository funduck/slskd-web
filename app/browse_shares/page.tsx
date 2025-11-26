"use client";

import { Results } from "./Results";
import { Box, Group, Space, Text } from "@mantine/core";
import { FilterInput } from "./FilterInput";
import { useBrowseShares } from "./BrowseSharesContext";
import { SearchInput } from "./SearchInput";

export default function () {
  const { result, error } = useBrowseShares();

  return (
    <Box id="browse-shares-page" className="flex-column">
      <SearchInput />

      {error && (
        <Text size="sm" c="red">
          {error}
        </Text>
      )}

      <Group>
        <b>Folders</b>
        {result?.directory_count}
      </Group>

      <FilterInput />

      <Space h="xs" />

      <Results />
    </Box>
  );
}
