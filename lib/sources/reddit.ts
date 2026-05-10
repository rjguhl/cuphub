// r/soccer JSON adapter. Read-only, no auth required.
export type RedditPost = {
  id: string;
  title: string;
  url: string; // permalink to thread
  score: number;
  numComments: number;
  createdUtc: number;
};

const UA = 'cuphub/0.1 (contact: richardjohnguhl@gmail.com)';

export async function fetchHotPosts(): Promise<RedditPost[]> {
  // TODO: fetch /r/soccer/hot.json with UA header, normalize.
  return [];
}

export async function fetchTopToday(): Promise<RedditPost[]> {
  return [];
}

export async function fetchNew(): Promise<RedditPost[]> {
  return [];
}
