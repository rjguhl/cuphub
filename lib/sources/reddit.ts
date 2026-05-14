// r/soccer JSON adapter. Read-only, no auth required.
// Wrapped in our TTL cache; do not call directly from components.
import { cached, TTL } from '@/lib/utils/cache';

export type RedditPost = {
  id: string;
  title: string;
  url: string; // permalink to thread
  score: number;
  numComments: number;
  createdUtc: number;
};

const UA = 'cuphub/0.1 (contact: richardjohnguhl@gmail.com)';
const BASE = 'https://www.reddit.com/r/soccer';

async function fetchListing(path: string): Promise<RedditPost[]> {
  const res = await fetch(`${BASE}/${path}`, {
    headers: { 'User-Agent': UA, Accept: 'application/json' },
    next: { revalidate: TTL.pulse },
  });
  if (!res.ok) return [];
  const json: any = await res.json();
  const children: any[] = json?.data?.children ?? [];
  return children.map((c) => ({
    id: c.data.id,
    title: c.data.title,
    url: `https://reddit.com${c.data.permalink}`,
    score: c.data.score ?? 0,
    numComments: c.data.num_comments ?? 0,
    createdUtc: c.data.created_utc ?? 0,
  }));
}

export async function fetchHotPosts(): Promise<RedditPost[]> {
  return cached('reddit:hot', TTL.pulse, () => fetchListing('hot.json?limit=50'));
}

export async function fetchTopToday(): Promise<RedditPost[]> {
  return cached('reddit:top:day', TTL.pulse, () => fetchListing('top.json?t=day&limit=50'));
}

export async function fetchNew(): Promise<RedditPost[]> {
  return cached('reddit:new', TTL.pulse, () => fetchListing('new.json?limit=50'));
}
