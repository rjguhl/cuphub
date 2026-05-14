// Pulse feed: aggregated topics from r/soccer, filtered for tournament relevance.
// Pipeline: pull → filter → cluster → score → top N.
import { fetchHotPosts, fetchTopToday, type RedditPost } from '@/lib/sources/reddit';
import { cached, TTL } from '@/lib/utils/cache';

export type PulseTopic = {
  id: string;
  title: string;
  summary: string;
  sourceCount: number;
  topUrl: string;
  score: number;
  updatedAt: string;
};

// Maintained whitelist. Add: host city names, qualified country names, marquee players.
const RELEVANCE_KEYWORDS: string[] = [
  'mexico', 'usa', 'canada', 'brazil', 'argentina', 'france', 'england',
  'world cup', '2026', 'wc26', 'concacaf',
  // host cities
  'atlanta', 'boston', 'dallas', 'guadalajara', 'houston', 'kansas city',
  'los angeles', 'mexico city', 'miami', 'monterrey', 'new york', 'philadelphia',
  'san francisco', 'seattle', 'toronto', 'vancouver',
];

function isRelevant(title: string): boolean {
  const t = title.toLowerCase();
  return RELEVANCE_KEYWORDS.some((kw) => t.includes(kw));
}

// Naive topic key — first matching keyword. Good enough for the launch
// version; swap for TF-IDF clustering later without changing the export shape.
function topicKey(title: string): string {
  const t = title.toLowerCase();
  for (const kw of RELEVANCE_KEYWORDS) {
    if (t.includes(kw)) return kw;
  }
  return 'misc';
}

function compositeScore(p: RedditPost): number {
  const ageHours = (Date.now() / 1000 - p.createdUtc) / 3600;
  const recency = Math.max(0.2, 1 - ageHours / 48);
  return (p.score + p.numComments * 2) * recency;
}

export async function getTopPulseTopics(limit = 5): Promise<PulseTopic[]> {
  return cached(`pulse:top:${limit}`, TTL.pulse, async () => {
    const [hot, top] = await Promise.all([fetchHotPosts(), fetchTopToday()]);
    const seen = new Set<string>();
    const all = [...hot, ...top].filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return isRelevant(p.title);
    });

    const buckets = new Map<string, RedditPost[]>();
    for (const p of all) {
      const k = topicKey(p.title);
      const arr = buckets.get(k) ?? [];
      arr.push(p);
      buckets.set(k, arr);
    }

    const topics: PulseTopic[] = [...buckets.entries()].map(([key, posts]) => {
      const top = posts.reduce((a, b) => (compositeScore(a) > compositeScore(b) ? a : b));
      const totalScore = posts.reduce((s, p) => s + compositeScore(p), 0);
      return {
        id: key,
        title: top.title,
        summary: '',
        sourceCount: posts.length,
        topUrl: top.url,
        score: Math.round(totalScore),
        updatedAt: new Date().toISOString(),
      };
    });

    return topics.sort((a, b) => b.score - a.score).slice(0, limit);
  });
}
