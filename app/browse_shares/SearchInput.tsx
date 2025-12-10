"use client";

import { Button, Group, TextInput } from "@mantine/core";
import { IconUserFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { useBrowseShares } from "./BrowseSharesContext";

export function SearchInput() {
  const { username, filter, browseShares, loading } = useBrowseShares();
  const [inputValue, setInputValue] = useState(username);

  // Sync input value with context username
  useEffect(() => {
    setInputValue(username);
  }, [username]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      browseShares(inputValue, filter);
    }
  };

  return (
    <Group gap="xs" pb="xs" w="100%">
      <TextInput
        size="xs"
        placeholder="Username..."
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        leftSection={<IconUserFilled size={16} />}
        disabled={loading}
        style={{ flex: 1, minWidth: 300 }}
      />

      <Button size="xs" onClick={() => browseShares(inputValue, filter)} disabled={loading || !inputValue.trim()}>
        {loading ? "Searching..." : "Search"}
      </Button>
    </Group>
  );
}
