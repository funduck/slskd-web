"use server";

import { usersApiClient, withToken } from "@/lib/api-clients";

export async function browseUserSharesAction(token: string, { username }: { username: string }) {
  const res = await usersApiClient.apiV0UsersUsernameBrowseGet(
    {
      username,
    },
    withToken(token)
  );
  return res;
}
