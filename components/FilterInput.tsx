"use client";

import { useState, useEffect, memo } from "react";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export const FilterInput = memo(
  ({
    filter,
    disabled,
    applyFilter,
  }: {
    filter?: string;
    disabled: boolean;
    applyFilter: (filter?: string) => Promise<void>;
  }) => {
    const [inputValue, setInputValue] = useState(filter || "");

    // Sync input value with context filter
    useEffect(() => {
      setInputValue(filter || "");
    }, [filter]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        applyFilter(inputValue);
      }
    };

    return (
      <TextInput
        size="xs"
        placeholder="Filter files..."
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        leftSection={<IconSearch size={16} />}
        disabled={disabled}
        style={{ minWidth: 250 }}
      />
    );
  }
);

FilterInput.displayName = "FilterInput";
