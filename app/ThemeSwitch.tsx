"use client";

import { ActionIcon, Group, Menu } from "@mantine/core";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";

import { useTheme } from "./ThemeProvider";

export function ThemeSwitch() {
  const { colorScheme, setColorScheme, resolvedColorScheme } = useTheme();

  const getIcon = () => {
    if (colorScheme === "auto") {
      return <IconDeviceDesktop size={20} />;
    } else if (colorScheme === "dark") {
      return <IconMoon size={20} />;
    } else {
      return <IconSun size={20} />;
    }
  };

  return (
    <Menu position="bottom-end" shadow="md" width={150}>
      <Menu.Target>
        <ActionIcon variant="subtle" size="lg" aria-label="Toggle theme">
          {getIcon()}
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Theme</Menu.Label>
        <Menu.Item
          leftSection={<IconSun size={16} />}
          onClick={() => setColorScheme("light")}
          bg={colorScheme === "light" ? "var(--mantine-color-blue-light)" : undefined}
        >
          Light
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={16} />}
          onClick={() => setColorScheme("dark")}
          bg={colorScheme === "dark" ? "var(--mantine-color-blue-light)" : undefined}
        >
          Dark
        </Menu.Item>
        <Menu.Item
          leftSection={<IconDeviceDesktop size={16} />}
          onClick={() => setColorScheme("auto")}
          bg={colorScheme === "auto" ? "var(--mantine-color-blue-light)" : undefined}
        >
          Auto
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
