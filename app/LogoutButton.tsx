"use client";

import { IconLogout } from "@tabler/icons-react";

import { useAuth } from "./AuthProvider";

export function LogoutButton() {
  const { logout } = useAuth();

  return <IconLogout size={20} onClick={logout} style={{ cursor: "pointer" }} />;
}
