"use client";

import { Box, Button, Group, Switch, Tabs, Text } from "@mantine/core";
import { IconChecklist, IconHistory, IconRefresh } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useDownloads } from "./DownloadsContext";
import { History } from "./History";
import { Selection } from "./Selection";

export default function DownloadsPage() {
  const { loading, error, autoRefresh, activeTab, setAutoRefresh, setActiveTab, setPageActive, refreshDownloads } =
    useDownloads();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get tab from URL or use context value
  const urlTab = searchParams?.get("tab");

  // Sync context with URL on mount or when URL changes externally
  useEffect(() => {
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab);
    } else if (!urlTab && activeTab) {
      // If no URL tab param, set it to the context value
      const params = new URLSearchParams(searchParams?.toString());
      params.set("tab", activeTab);
      router.replace(`/downloads?${params.toString()}`, { scroll: false });
    }
  }, [urlTab]); // Only depend on urlTab to avoid infinite loop

  // Update context and URL when tab changes from UI
  const handleTabChange = (value: string | null) => {
    if (value && value !== activeTab) {
      setActiveTab(value);
      const params = new URLSearchParams(searchParams?.toString());
      params.set("tab", value);
      router.replace(`/downloads?${params.toString()}`, { scroll: false });
    }
  };

  // Signal that the downloads page is active
  useEffect(() => {
    setPageActive(true);
    return () => {
      setPageActive(false);
    };
  }, [setPageActive]);

  return (
    <Box className="flex-column">
      {error && (
        <Text size="sm" c="red" mb="md">
          {error}
        </Text>
      )}

      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tabs.List w="100%">
          <Group justify="space-between" w="100%">
            <Group>
              <Tabs.Tab value="history" leftSection={<IconHistory size={16} />}>
                History
              </Tabs.Tab>
              <Tabs.Tab value="selection" leftSection={<IconChecklist size={16} />}>
                Selection
              </Tabs.Tab>
            </Group>

            <Group>
              <Switch
                label="Auto-refresh"
                checked={autoRefresh}
                onChange={(event) => setAutoRefresh(event.currentTarget.checked)}
              />
              <Button size="xs" leftSection={<IconRefresh size={16} />} onClick={refreshDownloads} loading={loading}>
                Refresh
              </Button>
            </Group>
          </Group>
        </Tabs.List>

        <Tabs.Panel value="history" pt="md">
          <History />
        </Tabs.Panel>

        <Tabs.Panel value="selection" pt="md">
          <Selection />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
