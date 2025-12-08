"use client";

import { Box, Text, Group, Button, Switch, Tabs } from "@mantine/core";
import { IconRefresh, IconHistory, IconChecklist } from "@tabler/icons-react";
import { useDownloads } from "./DownloadsContext";
import { useEffect, useState } from "react";
import { History } from "./History";
import { Selection } from "./Selection";

const ACTIVE_TAB_STORAGE_KEY = "downloads-active-tab";

export default function DownloadsPage() {
  const { loading, error, autoRefresh, setAutoRefresh, setPageActive, refreshDownloads } = useDownloads();

  // Start with default value to match SSR
  const [activeTab, setActiveTab] = useState<string | null>("history");
  const [mounted, setMounted] = useState(false);

  // Restore from sessionStorage after mount (client-side only)
  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem(ACTIVE_TAB_STORAGE_KEY);
    if (stored) {
      setActiveTab(stored);
    }
  }, []);

  // Save active tab to sessionStorage when it changes
  useEffect(() => {
    if (mounted && activeTab) {
      sessionStorage.setItem(ACTIVE_TAB_STORAGE_KEY, activeTab);
    }
  }, [activeTab, mounted]);

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

      <Tabs value={activeTab} onChange={setActiveTab}>
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
