"use client";

import { useState } from "react";
import { TextInput } from "@mantine/core";
import { IconUserFilled } from "@tabler/icons-react";
import { useBrowseShares } from "./BrowseSharesContext";

export function SearchInput() {
  const { browseShares, loading } = useBrowseShares();
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      browseShares({
        username: inputValue,
      });
    }
  };

  return (
    <TextInput
      size="xs"
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
