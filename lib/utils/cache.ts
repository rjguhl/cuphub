// Tiny TTL cache wrapper. Use for upstream calls so the client never hits external APIs directly.
// Layered with Next's `revalidate` in fetch options for ISR-friendly behavior.
type Entry<T> = { value: T; expires: number };
const store = new Map<string, Entry<unknown>>();

export async function cached<T>(key: string, ttlSec: number, loader: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = store.get(key) as Entry<T> | undefined;
  if (hit && hit.expires > now) return hit.value;
  const value = await loader();
  store.set(key, { value, expires: now + ttlSec * 1000 });
  return value;
}

export const TTL = {
  liveScores: 30,
  pulse: 15 * 60,
  market: 15 * 60,
  weather: 60 * 60,
  staticMeta: 24 * 60 * 60,
} as const;
