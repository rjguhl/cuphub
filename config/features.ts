// Feature flags. Flip a section off without redeploying logic — useful during live matches
// when an upstream API misbehaves. Read by app/page.tsx and individual sections.
export const features = {
  sections: {
    heroToday: true,
    pulseFeed: true,
    marketPulse: true,
    bracket: true,
    upcoming: true,
    discover: true,
  },
  sources: {
    reddit: true,
    kalshi: true,
    weather: true,
  },
  experiments: {
    predictions: false,
    fantasy: false,
    dailyDigest: false,
  },
} as const;

export type FeatureFlags = typeof features;
