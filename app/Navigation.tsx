"use client";

import { Tabs } from "@mantine/core";
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
    <Tabs value={pathname} onChange={handleTabChange}>
      <Tabs.List justify="center">
        <Tabs.Tab value="/">Home</Tabs.Tab>
        <Tabs.Tab value="/search">Search Files</Tabs.Tab>
        <Tabs.Tab value="/shares">Browse Shares</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
