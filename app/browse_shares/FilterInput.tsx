"use client";

import { useState, useEffect } from "react";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useBrowseShares } from "./BrowseSharesContext";

export function FilterInput() {
  const { filter, browseShares, loading } = useBrowseShares();
  const [inputValue, setInputValue] = useState(filter || "");

  // Sync input value with context filter
  useEffect(() => {
    setInputValue(filter || "");
  }, [filter]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      browseShares({
        filter: inputValue,
      });
    }
  };

  return (
    <TextInput
      size="xs"
      placeholder="Search files..."
      value={inputValue}
      onChange={(e) => setInputValue(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
      leftSection={<IconSearch size={16} />}
      disabled={loading}
      style={{ minWidth: 250 }}
    />
  );
}
