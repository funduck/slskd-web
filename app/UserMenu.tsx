"use client";

import { Menu, Button, rem } from "@mantine/core";
import { IconLogout, IconChevronDown } from "@tabler/icons-react";
import { useAuth } from "./AuthProvider";

export function UserMenu() {
  const { logout } = useAuth();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="subtle" rightSection={<IconChevronDown size={14} />}>
          Menu
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          onClick={logout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
