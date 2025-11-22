import { TTLCache } from "@isaacs/ttlcache";

export const responsesCache = new TTLCache<string, any>({
  ttl: 5 * 60 * 1000,
});
