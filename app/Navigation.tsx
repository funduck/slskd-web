"use client";

import { Group, Tabs } from "@mantine/core";
import { IconFolder, IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabChange = (value: string | null) => {
    if (value) {
      router.push(value);
    }
  };

  return (
    <Tabs value={pathname} onChange={handleTabChange} pt={2}>
      <Tabs.List justify="center">
        {/* <Tabs.Tab value="/">Home</Tabs.Tab> */}
        <Tabs.Tab value="/search_files">
          <Group gap={4}>
            <IconSearch size={16} />
            <b>Search Files</b>
          </Group>
        </Tabs.Tab>
        <Tabs.Tab value="/browse_shares">
          <Group gap={4}>
            <IconFolder size={16} />
            <b>Browse Shares</b>
          </Group>
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
