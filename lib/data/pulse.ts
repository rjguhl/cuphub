// Pulse feed: aggregated topics from r/soccer, filtered for tournament relevance.
import { fetchHotPosts } from '@/lib/sources/reddit';

export type PulseTopic = {
  id: string;
  title: string;
  summary: string;
  sourceCount: number;
  topUrl: string;
  score: number;
  updatedAt: string;
};

// Keyword whitelist used to gate posts into the tournament-relevance bucket.
// Maintained here so it can be tuned without touching the pipeline.
const RELEVANCE_KEYWORDS: string[] = [
  // Add: host city names, qualified country names, marquee players.
];

function isRelevant(title: string): boolean {
  const t = title.toLowerCase();
  return RELEVANCE_KEYWORDS.some((kw) => t.includes(kw.toLowerCase()));
}

export async function getTopPulseTopics(limit = 5): Promise<PulseTopic[]> {
  const posts = await fetchHotPosts();
  // TODO: cluster by topic (TF-IDF + entity match), score composite, dedupe.
  const filtered = posts.filter((p) => isRelevant(p.title));
  return filtered.slice(0, limit).map((p, i) => ({
    id: p.id,
    title: p.title,
    summary: '',
    sourceCount: 1,
    topUrl: p.url,
    score: p.score,
    updatedAt: new Date().toISOString(),
  }));
}
