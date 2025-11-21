"use server";

import { sessionApiClient, withToken } from "@/lib/api-clients";

export async function loginAction({ username, password }: { username: string; password: string }) {
  return await sessionApiClient.apiV0SessionPost({
    login_request: { username, password },
  });
}

export async function getSessionEnabledAction(token: string | null) {
  return await sessionApiClient.apiV0SessionEnabledGet(withToken(token));
}

export async function validateSessionAction(token: string | null) {
  await sessionApiClient.apiV0SessionGet(withToken(token));
}
