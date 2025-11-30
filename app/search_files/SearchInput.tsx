"use client";

import { useCallback, useEffect, useState } from "react";
import { TextInput, Button, Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useCurrentSearch } from "./CurrentSearchContext";

export function SearchInput() {
  const { searchQuery, performSearch, loading } = useCurrentSearch();
  const [inputValue, setInputValue] = useState(searchQuery || "");

  const handleSearch = useCallback(() => {
    if (inputValue.trim()) {
      performSearch(inputValue);
    }
  }, [inputValue, performSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  useEffect(() => {
    if (searchQuery !== inputValue) {
      setInputValue(searchQuery || "");
    }
  }, [searchQuery, setInputValue]);

  return (
    <Group gap="xs" pb="xs">
      <TextInput
        size="xs"
        placeholder="Search for files..."
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        leftSection={<IconSearch size={16} />}
        disabled={loading}
        style={{ flex: 1, minWidth: 300 }}
      />
      <Button size="xs" onClick={handleSearch} disabled={loading || !inputValue.trim()}>
        {loading ? "Searching..." : "Search"}
      </Button>
    </Group>
  );
}
