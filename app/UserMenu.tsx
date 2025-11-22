"use client";

import { Menu, Button, rem } from "@mantine/core";
import { IconLogout, IconChevronDown, IconMenu, IconMenu2 } from "@tabler/icons-react";
import { useAuth } from "./AuthProvider";

export function UserMenu() {
  const { logout } = useAuth();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="transparent" c="dark">
          <IconMenu2 size={20} />
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
