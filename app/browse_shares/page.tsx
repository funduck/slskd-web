"use client";

import { Box, Space, Text } from "@mantine/core";
import { useBrowseShares } from "./BrowseSharesContext";
import { SearchInput } from "./SearchInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../AuthProvider";
import { UserFilesBrowser } from "@/components/UserFilesBrowser";
import { useDownload } from "@/components/DownloadContext";

export default function () {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { token } = useAuth();

  const { username, filter, tree, loading, error, browseShares, loadDirectoryChildren } = useBrowseShares();

  const { addFilesToSelection, removeFilesFromSelection } = useDownload();

  const applyFilter = async (newFilter?: string) => {
    if (!username) return;
    await browseShares(username, newFilter);
  };

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

  return (
    <Box id="browse-shares-page" className="flex-column">
      <SearchInput />

      {error && (
        <Text size="sm" c="red">
          {error}
        </Text>
      )}

      <Space h="xs" />

      <UserFilesBrowser
        tree={tree}
        loading={loading}
        username={username}
        filter={filter || ""}
        applyFilter={applyFilter}
        addFilesToSelection={addFilesToSelection}
        removeFilesFromSelection={removeFilesFromSelection}
        loadDirectoryChildren={loadDirectoryChildren}
      />
    </Box>
  );
}
