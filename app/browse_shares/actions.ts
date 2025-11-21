"use server";

import { UsersBrowseResponse } from "@/generated/slskd-api";
import { usersApiClient, withToken } from "@/lib/api-clients";
import { responsesCache } from "@/lib/cache";

export async function browseUserSharesAction(
  token: string,
  { username, filter, page, pageSize }: { username: string; filter?: string; page?: number; pageSize?: number }
) {
  let fullRes: UsersBrowseResponse;
  let res: UsersBrowseResponse;

  const cacheKey = `browseUserShares:${username}`;
  fullRes = responsesCache.get(cacheKey);

  if (!fullRes) {
    fullRes = await usersApiClient.apiV0UsersUsernameBrowseGet(
      {
        username,
      },
      withToken(token)
    );
    console.log(`Loaded ${fullRes.directories?.length} user shares from API for ${username}`);
    responsesCache.set(cacheKey, fullRes);
    console.debug("Saving to cache with key:", cacheKey);
  } else {
    console.debug("Cache hit for key:", cacheKey, "cached directories:", fullRes.directories?.length);
  }
  res = { ...fullRes };

  if (filter && res.directories) {
    // naive filtering on the server side
    res.directories = res.directories.filter((dir) => dir.name?.toLowerCase().includes(filter.toLowerCase()));
    console.log(`Filtered directories to ${res.directories.length} using filter "${filter}"`);
  }

  if (page !== undefined && pageSize !== undefined && res.directories) {
    const start = page * pageSize;
    const end = start + pageSize;
    res.directories = res.directories.slice(start, end);
    console.log(`Paginated directories to ${res.directories.length} using page ${page} and pageSize ${pageSize}`);
  }

  // Ignoring lockedDirectories for simplicity

  return res;
}
