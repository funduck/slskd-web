"use client";

import { Box, Text, Group, Button, Switch, Tabs } from "@mantine/core";
import { IconRefresh, IconHistory, IconChecklist } from "@tabler/icons-react";
import { useDownloads } from "./DownloadsContext";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
    <Box className="flex-column" p="md">
      <Group justify="space-between" mb="md">
        <Text size="xl" fw={700}>
          Downloads
        </Text>
        <Group gap="md">
          <Switch
            label="Auto-refresh"
            checked={autoRefresh}
            onChange={(event) => setAutoRefresh(event.currentTarget.checked)}
          />
          <Button leftSection={<IconRefresh size={16} />} onClick={refreshDownloads} loading={loading}>
            Refresh
          </Button>
        </Group>
      </Group>

      {error && (
        <Text size="sm" c="red" mb="md">
          {error}
        </Text>
      )}

      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab value="history" leftSection={<IconHistory size={16} />}>
            History
          </Tabs.Tab>
          <Tabs.Tab value="selection" leftSection={<IconChecklist size={16} />}>
            Selection
          </Tabs.Tab>
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
