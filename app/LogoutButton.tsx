"use client";

import { ActionIcon } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

import { useAuth } from "./AuthProvider";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <ActionIcon variant="subtle" size="lg" onClick={logout} aria-label="Logout">
      <IconLogout size={20} />
    </ActionIcon>
  );
}
