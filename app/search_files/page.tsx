"use client";

import { Box, Tabs } from "@mantine/core";
import { SearchInput } from "./SearchInput";
import { CurrentSearch } from "./CurrentSearch";
import { SearchesHistory } from "./SearchesHistory";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function () {
  const [activeTab, setActiveTab] = useState<string>("history");
  const searchParams = useSearchParams();
  const urlSearchId = searchParams?.get("searchId");
  const router = useRouter();

  // Change tab to current if there's a searchId in URL
  useEffect(() => {
    if (!searchParams) return;

    if (urlSearchId) {
      setActiveTab("current");
    } else {
      setActiveTab("history");
    }
  }, [urlSearchId, searchParams]);

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
