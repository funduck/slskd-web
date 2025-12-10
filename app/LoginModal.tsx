"use client";

import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useState } from "react";

interface LoginModalProps {
  onLogin: (username: string, password: string) => Promise<void>;
  error?: string;
  loading?: boolean;
}

export function LoginModal({ onLogin, error, loading }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="Username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          data-autofocus
        />
        <PasswordInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div style={{ color: "var(--mantine-color-red-6)", fontSize: "14px" }}>{error}</div>}
        <Button type="submit" fullWidth loading={loading}>
          Login
        </Button>
      </Stack>
    </form>
  );
}
