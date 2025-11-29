"use client";

import { Box, Tabs } from "@mantine/core";
import { useSearchFiles } from "./SearchFilesContext";
import { SearchInput } from "./SearchInput";
import { CurrentSearch } from "./CurrentSearch";
import { SearchesHistory } from "./SearchesHistory";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function () {
  const { refreshSearches, activeTab, loading, setActiveTab, loadSearch, searchId } = useSearchFiles();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlSearchId = searchParams?.get("searchId");

  useEffect(() => {
    refreshSearches();
  }, [refreshSearches]);

  // Load search from URL params
  useEffect(() => {
    if (urlSearchId && urlSearchId !== searchId && !loading) {
      console.log(`URL has searchId=${urlSearchId}, loading search`);
      loadSearch(urlSearchId);
    }
  }, [urlSearchId, searchId, loadSearch]);

  // Update URL when searchId changes (only if different from URL)
  useEffect(() => {
    if (!searchParams) return;

    // Only update URL if it's different from what's already there
    if (searchId && searchId !== urlSearchId) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("searchId", searchId);
      router.replace(`?${params.toString()}`, { scroll: false });
    } else if (!searchId && urlSearchId) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("searchId");
      if (params.toString()) {
        router.replace(`?${params.toString()}`, { scroll: false });
      } else {
        router.replace(window.location.pathname, { scroll: false });
      }
    }
  }, [searchId, urlSearchId, router, searchParams]);

  return (
    <Box id="search-page" className="flex-column">
      <SearchInput />

      <Tabs value={activeTab} onChange={(value) => value && setActiveTab(value)} mt="md">
        <Tabs.List>
          <Tabs.Tab value="history">Search History</Tabs.Tab>
          <Tabs.Tab value="current">Current Search</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="history" pt="md">
          <SearchesHistory />
        </Tabs.Panel>

        <Tabs.Panel value="current" pt="md">
          <CurrentSearch />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
