// Configuration for the admin-react app
export interface AppConfig {
  activeChatKey: string;
  activeRoomKey: string;
  activeUserInfoKey: string;
  apiBaseUrl: string;
  hubBaseUrl: string;
  rootUrl: string;
  tokenKey: string;
  tokenPassthroughValue: string;
}

function validateRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  return value;
}

// Server-side config (for API routes and server components)
export function getServerConfig(): AppConfig {
  const rootUrl =
    process.env.NODE_ENV === "production"
      ? validateRequiredEnv("NEXT_PUBLIC_SLSKD_ROOT_URL")
      : process.env.NEXT_PUBLIC_SLSKD_ROOT_URL || "http://localhost:5030";

  return {
    activeChatKey: "slskd-active-chat",
    activeRoomKey: "slskd-active-room",
    activeUserInfoKey: "slskd-active-user",
    apiBaseUrl: rootUrl,
    hubBaseUrl: rootUrl + "/hub",
    rootUrl: rootUrl,
    tokenKey: "slskd-token",
    tokenPassthroughValue: "n/a",
  };
}
