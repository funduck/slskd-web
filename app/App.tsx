"use client";

import { AppShell, Box, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";

import { LogoutButton } from "./LogoutButton";
import { Navigation } from "./Navigation";

export default function App({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      h="100vh"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Box w="100%" visibleFrom="sm">
            <Navigation />
          </Box>
        </Group>
        <Box style={{ position: "absolute", top: 20, right: 20 }}>
          <LogoutButton />
        </Box>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navigation vertical />
      </AppShell.Navbar>

      <AppShell.Main h="100%">
        <Container id="main-container" size="100%" h="100%" className="flex-column">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
