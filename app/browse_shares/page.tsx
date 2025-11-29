"use client";

import { Results } from "./Results";
import { Box, Group, Space, Text } from "@mantine/core";
import { FilterInput } from "./FilterInput";
import { useBrowseShares } from "./BrowseSharesContext";
import { SearchInput } from "./SearchInput";
import { DownloadButton } from "./DownloadButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../AuthProvider";

export default function () {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { token } = useAuth();

  const { username, filter, error, selectionForDownload, browseShares } = useBrowseShares();

  // Update URL when username or filter changes
  useEffect(() => {
    if (!username) return;

    const params = new URLSearchParams();
    params.set("username", username);
    if (filter) {
      params.set("filter", filter);
    }

    const newUrl = `/browse_shares?${params.toString()}`;
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    // Only update if different
    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [username, filter, router]);

  // Load shares from URL on mount and when URL changes
  useEffect(() => {
    const urlUsername = searchParams?.get("username");
    const urlFilter = searchParams?.get("filter") || undefined;

    // Load if URL has username and it's different from current state
    if (urlUsername && token) {
      if (urlUsername !== username || urlFilter !== filter) {
        browseShares(urlUsername, urlFilter);
      }
    }
  }, [searchParams, token]);

  // Calculate total selected files across all directories
  const totalSelected = Array.from(selectionForDownload.values()).reduce((sum, fileSet) => sum + fileSet.size, 0);

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
        {totalSelected > 0 && <DownloadButton />}
      </Group>

      <Space h="xs" />

      <Results />
    </Box>
  );
}
