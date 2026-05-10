// Discover cards. Editorial content lives in /content/discover (MDX/JSON), not hardcoded.
// Adding a new card kind = a new content type, not a new component.
export type DiscoverKind = 'team-to-watch' | 'city-spotlight' | 'stat-of-day' | 'underdog' | 'throwback';

export type DiscoverCard = {
  id: string;
  kind: DiscoverKind;
  title: string;
  body: string;
  href?: string;
};

export async function getDiscoverCards(): Promise<DiscoverCard[]> {
  // TODO: read MDX/JSON from /content/discover, rotate by date.
  return [];
}
