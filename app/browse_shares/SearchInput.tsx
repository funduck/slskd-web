"use client";

import { useState, useEffect } from "react";
import { TextInput } from "@mantine/core";
import { IconUserFilled } from "@tabler/icons-react";
import { useBrowseShares } from "./BrowseSharesContext";

export function SearchInput() {
  const { username, browseShares, loading } = useBrowseShares();
  const [inputValue, setInputValue] = useState(username);

  // Sync input value with context username
  useEffect(() => {
    setInputValue(username);
  }, [username]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      browseShares(inputValue);
    }
  };

  return (
    <TextInput
      size="xs"
      pb="xs"
      placeholder="Username..."
      value={inputValue}
      onChange={(e) => setInputValue(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
      leftSection={<IconUserFilled size={16} />}
      disabled={loading}
      style={{ minWidth: 250 }}
    />
  );
}
