"use client";

import { AppShell, Box, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";

import { LogoutButton } from "./LogoutButton";
import { Navigation } from "./Navigation";
import { ThemeSwitch } from "./ThemeSwitch";

export default function App({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      h="100vh"
      header={{ height: 50 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header bd="none">
        <Group h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Box w="100%" visibleFrom="sm">
            <Navigation />
          </Box>
        </Group>
        <Box style={{ position: "absolute", top: 10, right: 20 }}>
          <Group gap="xs">
            <ThemeSwitch />
            <LogoutButton />
          </Group>
        </Box>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navigation vertical />
      </AppShell.Navbar>

      <AppShell.Main
        h="100%"
        style={{
          paddingTop: `calc(var(--app-shell-header-offset, 0rem)`,
        }}
      >
        <Container id="main-container" size="100%" h="100%" className="flex-column">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
