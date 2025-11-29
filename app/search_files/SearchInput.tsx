"use client";

import { useState } from "react";
import { TextInput, Button, Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useSearchFiles } from "./SearchFilesContext";

export function SearchInput() {
  const { performSearch, loading } = useSearchFiles();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue.trim()) {
      performSearch(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
