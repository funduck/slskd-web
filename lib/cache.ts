class TTLCache<K, V> {
  private cache = new Map<K, { value: V; expiry: number }>();
  private ttl: number;

  constructor(ttl: number) {
    this.ttl = ttl;
    setInterval(() => this.cleanup(), 1000 * 60); // cleanup every minute
  }

  set(key: K, value: V) {
    const expiry = Date.now() + this.ttl;
    this.cache.set(key, { value, expiry });
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  has(key: K): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: K) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

export const responsesCache = new TTLCache<string, any>(5 * 60 * 1000); // 5 minutes TTL
