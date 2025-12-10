"use client";

import { Box, Tabs } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { CurrentSearch } from "./CurrentSearch";
import { SearchInput } from "./SearchInput";
import { SearchesHistory } from "./SearchesHistory";

const ACTIVE_TAB_STORAGE_KEY = "search-files-active-tab";

export default function () {
  // Start with default value to match SSR
  const [activeTab, setActiveTab] = useState<string>("history");
  const [mounted, setMounted] = useState(false);

  const searchParams = useSearchParams();
  const urlSearchId = searchParams?.get("searchId");

  // Restore from sessionStorage after mount (client-side only)
  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem(ACTIVE_TAB_STORAGE_KEY);
    if (stored && !urlSearchId) {
      setActiveTab(stored);
    }
  }, []);

  // Save active tab to sessionStorage when it changes
  useEffect(() => {
    if (mounted && activeTab) {
      sessionStorage.setItem(ACTIVE_TAB_STORAGE_KEY, activeTab);
    }
  }, [activeTab, mounted]);

  // Change tab to current if there's a searchId in URL
  useEffect(() => {
    if (urlSearchId) {
      setActiveTab("current");
    }
  }, [urlSearchId]);

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
