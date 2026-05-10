// Microcopy and shared strings. Keep voice consistent (excited kid, high energy, no snark).
export const copy = {
  brand: {
    name: 'CupHub',
    tagline: 'The summer hub for the tournament',
  },
  tournament: {
    // Avoid the protected wordmark anywhere user-facing.
    descriptive: 'the 2026 tournament in North America',
    startDate: '2026-06-11',
    endDate: '2026-07-19',
  },
  sections: {
    pulse: "What everyone's talking about",
    market: 'Market Pulse',
    upcoming: 'Up next',
    discover: 'Discover',
  },
  empty: {
    pulse: 'Quiet on the pulse — check back in a bit!',
    market: 'No big movers right now.',
  },
} as const;
