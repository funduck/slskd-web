"use client";

import { useState } from "react";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useBrowseShares } from "./BrowseSharesContext";

export function SearchInput() {
  const { browseShares, loading } = useBrowseShares();
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      browseShares(inputValue);
    }
  };

  return (
    <TextInput
      placeholder="Enter username to browse"
      value={inputValue}
      onChange={(e) => setInputValue(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
      leftSection={<IconSearch size={16} />}
      disabled={loading}
      style={{ minWidth: 250 }}
    />
  );
}
