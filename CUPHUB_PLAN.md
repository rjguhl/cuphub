# CupHub — Project Plan

A summer-vibes aggregator for the 2026 men's international football tournament hosted across the US, Mexico, and Canada (June 11 – July 19). One page that pulls together everything a casual fan needs without juggling five tabs.

---

## 1. Project identity

| Field | Value |
|---|---|
| Working name | CupHub |
| Tagline (draft) | The summer hub for the tournament |
| Audience | Casual to medium-engagement fans, with depth available for the obsessives |
| Core promise | Aggregated, fun, summer-vibe hub for the tournament |
| Primary platform | Desktop web at launch, mobile-friendly version planned before tournament start |
| Monetization | None at launch. Portfolio piece first |
| Auth | None. Open browsing for everyone |

### Visual identity

- **Palette:** Coastal / tropical Miami summer. Hot pink, turquoise, coral, sun yellow, deep purple. Cream or off-white as the base, never pure white. Sunset gradients for hero sections.
- **Type:** Clean readable sans for data display. A more characterful display font for headlines and section titles.
- **Art style:** Pixel art for decorative and brand elements (logo, icons, idle animations, section dividers, sprites). Free pixel asset packs for volume work, commissioned art for the few defining pieces. Pixel chrome with clean readable data on top, never pixel fonts for actual scores or text.
- **Mascot:** A pixel eagle as the recurring visual element. Light touch, not a Duolingo-style omnipresent character. Shows up in the logo, loading states, error pages, idle animations.
- **Voice:** Excited kid. High energy, exclamation points, hype. Confident, friendly, not snarky.

---

## 2. Legal and IP guardrails

The 2026 tournament's governing body protects its IP aggressively. The following rules apply across the project.

### Off-limits

- Official logos, the protected tournament wordmark, the trophy image, the official mascots, official match ball imagery
- Live match video, audio, or near-real-time broadcast clips (broadcasters hold these)
- Official kit imagery from manufacturers for commercial use
- Player likenesses for commercial purposes without rights
- Use of the tournament's protected name in the brand or domain

### Allowed

- Match scores, schedules, standings, statistics (facts are not copyrightable)
- Editorial commentary, analysis, and original writing
- Linking out to official sources
- Original graphics, illustrations, and data visualizations
- Descriptive references to the tournament ("the 2026 tournament in North America")
- Public domain or Creative Commons imagery of stadiums, cities, generic soccer imagery
- Free pixel asset packs (CC0 or commercial-use licensed) and original commissioned art

### Practical rules for CupHub

1. The brand name avoids the protected wordmark
2. All on-site references to the tournament use descriptive language
3. No official logos, mascots, or trophy imagery anywhere on the site
4. Pixel sprites for "players" are generic role types (striker, keeper, defender) recolored to country palettes — never modeled on specific real players
5. Country flags are public domain
6. Odds and prediction market data are factual and may be displayed with source attribution

---

## 3. Information architecture

```
Home (the hub)
├── Hero strip
├── Today section
├── Pulse feed (r/soccer)
├── Market Pulse (Kalshi)
├── Bracket / Standings
├── Upcoming matches
├── Discover cards
└── Footer

Teams (32 pages, one per qualified country)
└── Squad, results, fixtures, news, market odds to advance, editorial profile

Matches (104 pages, one per scheduled match)
└── Preview / Live / Recap states, market probabilities, line movement

Host Cities (16 pages, one per host city)
└── Stadium, matches there, weather, fan info, neighborhood callouts

About / Sources / Methodology
└── How the site works, where data comes from, who built it, credits
```

---

## 4. Feature scope

### In scope for v1 (launch by June 11)

| Feature | Notes |
|---|---|
| Hub homepage | The single most important page |
| Schedule | All matches, timezone-aware |
| Standings and bracket | Group tables during groups, knockout bracket from R16 onward |
| Team pages | All 32 |
| Match pages | Three states: preview, live, recap |
| Host city pages | All 16, with a strong tri-country travel angle |
| About page | Sources, methodology, credits, builder bio |
| News pulse | r/soccer-sourced topic feed, refreshed every 15–30 minutes |
| Market pulse | Kalshi-sourced championship odds and biggest movers |
| Editorial layer | Hand-written or assisted recaps, discover cards, host city blurbs |
| Visual identity | Miami palette, pixel art, eagle, idle animations |

### Cut from v1 (revisit later)

- User accounts and authentication
- User-submitted predictions and bracket pools
- Friend leaderboards
- X/Twitter integration
- Native mobile apps
- Push notifications
- Sportsbook odds beyond Kalshi
- Multi-language support

### Modular expansion candidates (post-launch, during tournament)

- Mobile-friendly responsive version (planned before tournament start)
- Predictions feature (re-enabled if there's appetite)
- More pulse sources (X, YouTube highlights, Google News)
- Fantasy team feature
- Country-specific landing pages for diaspora fans
- Daily email digest
- Watch party finder

---

## 5. Homepage section design

The hub is a single scrolling page. Each section is an isolated component pulling its own data.

### Hero strip
Site name and pixel eagle logo. Today's date. One-line tournament status (e.g. "Day 12 — Group Stage" or "Round of 16 begins tomorrow"). Pixel sun position keyed to time of day. Sets the tone for the whole site.

### Today
The largest single block. Three states based on time:
- **Pre-match day:** Countdown timers to today's matches with team flag sprites facing off
- **Live:** Scores updating, minute counter, basic event ticker
- **Post-match day:** Results card with a one-sentence editorial recap

### Pulse feed (r/soccer)
"What everyone's talking about." 3–5 cards each showing a topic, a one-sentence summary, source count, and out-links to original Reddit threads. Refreshed every 15–30 minutes. Built from a pipeline that pulls hot/top/new from r/soccer, filters for tournament relevance, clusters into topics, and ranks by engagement.

### Market Pulse (Kalshi)
2–3 cards showing biggest implied-probability movers in the last 24 hours, plus a small "championship odds leaderboard" with the top 5 favorites. Implied probability percentages by default ("Brazil 14% to win it all"). One-line tooltip explaining what Kalshi is.

### Bracket / Standings
Tabbed view. Group stage tables during groups, knockout bracket diagram from R16 onward. Compact but readable. Pixel flag icons next to country names. Click any team to go to the team page.

### Upcoming
Next 3 matches with countdowns. Each shown in user's local timezone with a small label noting the host city's timezone too. Click to go to the match page.

### Discover row
3–4 rotating editorial cards: team to watch, host city spotlight, stat of the day, underdog tracker, throwback match. This is where personality lives.

### Footer
Where to watch by region, sources and methodology link, about link, credits.

---

## 6. Page-level designs

### Team page
Header with country flag (pixel) and team name. Group, current standing. Sections: squad list, fixtures and results, recent news (filtered pulse), market odds to advance, short editorial profile in CupHub voice.

### Match page
Three states based on match timing:
- **Preview** (before kickoff): teams, kickoff time in user's timezone, host city and stadium, weather forecast, head-to-head history, key players to watch, broadcast info, market probabilities for win/draw/loss
- **Live** (during): score, minute, events as they happen (goal, card, sub), basic stats. Polled every 30–60 seconds rather than true real-time
- **Recap** (after): final score, editorial recap, key moments, link to highlights, full stats

### Host city page
Stadium and capacity. Matches happening there with dates. The city in 3 sentences in CupHub voice. Local time zone. Average June/July weather. Fan zones if officially announced. A few watch party suggestions or neighborhood callouts. This is the underrated feature because the tri-country format makes city context unusually valuable.

### About page
How the site works, where data comes from, who built it, credits for free pixel assets used, contact. Doubles as a portfolio page.

---

## 7. Data sources and integrations

| Source | Use | Auth | Cost | Cache TTL |
|---|---|---|---|---|
| football-data.org or api-football | Schedule, standings, results, lineups | API key (free tier) | Free | 1 hour for static, 30 sec for live |
| Reddit r/soccer JSON | News pulse | None for read | Free | 15–30 min |
| Kalshi public API | Championship odds, match odds, historical movement | None for read | Free | 15–30 min |
| OpenWeatherMap | Host city weather | API key (free tier) | Free | 1 hour |
| Wikipedia / Wikidata | Static team and player metadata | None | Free | Daily |

### Things the site does NOT pull
- Live broadcast video or audio
- Twitter/X firehose
- Sportsbook odds beyond Kalshi
- Player likenesses or photos

### Pulse pipeline (r/soccer)

1. Pull every 15–30 minutes:
   - `/r/soccer/hot.json`
   - `/r/soccer/top.json?t=day`
   - `/r/soccer/new.json` for breaking content
   - On match days, pull match thread JSONs directly
2. Filter for tournament relevance using a maintained keyword whitelist (tournament name variants, host cities, qualified country names, marquee players)
3. Cluster by topic. TF-IDF on titles plus simple keyword/entity matching, leaning on the known set of teams and players. Most tournament topics revolve around a specific match, player, controversy, result, or storyline
4. Score topics with a composite of upvotes, comment count, post recency, and number of distinct posts on the topic
5. Surface top 3–5 topics on the homepage. Each links back to the original Reddit thread

### Market Pulse pipeline (Kalshi)

1. Pull championship winner market and per-match markets every 15–30 minutes
2. Convert mid prices to implied probabilities
3. Compare against snapshots from 24 hours prior to compute movement
4. Surface top 3 movers and current top 5 championship favorites on the homepage
5. On each match page, show the win/draw/loss probabilities plus a small line chart of the last 48 hours of movement

---

## 8. Technical architecture

### Stack

- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS, with palette tokens defined in a config file
- **Hosting:** Vercel (free tier handles this fine)
- **Cron / scheduled jobs:** Vercel Cron for pulse and odds refreshes
- **Caching / KV:** Vercel KV or simple in-memory + revalidation tags
- **Database:** None at launch. Static content lives in MDX or JSON files in the repo. If the project later adds features that need persistence (predictions, user saves), Supabase free tier is the upgrade path
- **Analytics:** Vercel Analytics or Plausible

### Repository structure

```
/app
  page.tsx                     ← homepage, composes sections
  /teams/[code]/page.tsx
  /matches/[id]/page.tsx
  /cities/[slug]/page.tsx
  /about/page.tsx
  /api/                        ← internal endpoints if needed

/components
  /sections                    ← homepage sections, drop-in
    HeroToday.tsx
    PulseFeed.tsx
    MarketPulse.tsx
    BracketWidget.tsx
    UpcomingStrip.tsx
    DiscoverRow.tsx
  /ui                          ← buttons, cards, badges
  /sprites                     ← reusable pixel components
  /charts                      ← line charts, etc.

/lib
  /data                        ← data access, abstracted
    matches.ts
    teams.ts
    cities.ts
    pulse.ts
    odds.ts
  /sources                     ← actual external integrations
    footballData.ts
    reddit.ts
    kalshi.ts
    weather.ts
  /utils

/content                       ← editorial content, MDX or JSON
  /cities
  /teams
  /recaps
  /discover

/config
  features.ts                  ← feature flags
  palette.ts                   ← color tokens
  copy.ts                      ← microcopy and shared strings
  schedule.ts                  ← match schedule overrides if API gaps
```

### Modularity principles

- **Data layer abstraction:** Components call `getTodaysMatches()` from `/lib/data/matches.ts`. The internal source can be swapped (football-data.org → api-football) without touching components.
- **Composable homepage:** `app/page.tsx` is essentially a list of section components. Reordering or adding a section is a one-line change.
- **Feature flags:** A `features.ts` config controls which sections render. If something breaks during a live match, hide it without redeploying.
- **Content as data:** Editorial content (recaps, discover cards, host city blurbs) lives in MDX or JSON, not hardcoded. Update copy without a code deploy.
- **Card system:** One Card component family that renders different content types, so adding a new card type is a new content type, not a new component.

### Performance targets

- Static or ISR-cached for everything except live match scores
- Page weight under 500KB on the homepage
- Lighthouse score 90+ on desktop, 80+ on mobile
- Pulse and odds queries cached server-side; clients never hit external APIs directly

---

## 9. Build phases

The tournament starts June 11. All dates below assume building starts the week this plan is finalized.

### Phase 1 — Foundation (weeks 1–2)
- Repo created, Next.js scaffolded, Tailwind configured
- Palette tokens defined in code
- Domain purchased
- Basic team and city static pages with placeholder content
- Schedule data loaded from chosen API
- Eagle logo and key sprites sourced or commissioned
- Data layer abstraction in place from day one
- Feature flag config in place

### Phase 2 — Core features (weeks 3–4)
- Homepage with all sections except pulse and market pulse
- Match pages in preview state
- Bracket and standings working
- Visual polish: gradients, idle animations, Miami feel locked in
- Discover cards populated with launch content

### Phase 3 — Aggregation and launch (week before tournament)
- r/soccer pulse pipeline live
- Kalshi market pulse pipeline live
- Match pages handling live and recap states
- About / sources page written
- Soft launch to friends for feedback
- SEO basics, Open Graph tags, favicon, social share image

### Phase 4 — Live tournament (June 11 onward)
- Mobile-friendly responsive version (plan a full week for this)
- Editorial content kept fresh through the tournament
- Bug fixes and polish based on real usage
- Modular feature additions as time and inspiration allow

---

## 10. Editorial workload

Aggregation does most of the work, but a small amount of hand-written content carries the personality. Plan accordingly.

### Pre-tournament one-time writes
- 32 team profile blurbs (~100 words each)
- 16 host city blurbs (~150 words each)
- About / methodology page
- ~10 discover card seed entries

### Daily during the tournament
- 1 short recap per match day (3 sentences in CupHub voice)
- 1–2 fresh discover card swaps
- Topic-level commentary on the pulse feed if any topic deserves it

This is roughly 30 minutes of writing per day during the tournament. AI-assisted drafts are fine here as long as the final voice stays consistent with the excited-kid tone.

---

## 11. Open questions and decisions to make

These don't block kickoff but should be answered before the first commit:

1. **Domain:** cuphub.com vs cuphub.app vs cuphub.fun. Check trademark database (tmsearch.uspto.gov), Google, and App Store before buying.
2. **Schedule API:** football-data.org (free tier sufficient for groups, may hit limits during knockouts) vs api-football (more generous free tier, slightly less clean data). Recommend api-football.
3. **Pixel asset sources:** Decide which packs to use. Kenney.nl and itch.io free CC0 packs are starting points.
4. **Commissioned art scope and budget:** Eagle logo, hero illustration, maybe 1–2 idle animation cycles. Budget around $100–300 total if commissioned from indie pixel artists.
5. **Analytics provider:** Plausible (paid, privacy-respecting) vs Vercel Analytics (free if on Vercel) vs none.
6. **Editorial assistance:** Who writes the daily recaps during the tournament? Solo, AI-assisted, or skip recaps and lean entirely on aggregation?

---

## 12. Risks and mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Schedule API rate-limits during knockouts | Medium | Aggressive server-side caching, fallback to manually-maintained schedule.ts |
| Kalshi market liquidity is too thin to be useful | Medium | Frame as "prediction market" not "the market." Hide Market Pulse via feature flag if quality is bad |
| r/soccer drowns in noise during peak match windows | High during finals | Topic clustering filters most of it. Show a "live discussion" link rather than topic cards during live matches |
| Time pressure causes scope creep | High | Build phases and the cut-from-v1 list are non-negotiable |
| Legal takedown risk | Low if name and assets are clean | Strict adherence to the IP guardrails section. No protected marks, no broadcast content, no player likenesses |
| Mobile version slips past kickoff | Medium | Treat the desktop version as "launched" and release mobile as v1.1 if needed |
| Solo editorial workload during the tournament burns out the builder | Medium | Lean on aggregation. Daily recaps are short and AI-assisted. Skip a day if needed — the site still works |

---

## 13. Definition of done for v1

CupHub is "launched" when, on June 10, the following are all true:

- The hub homepage loads and displays all 8 sections with real data
- All 32 team pages render with squad, fixtures, and editorial blurb
- All 104 match pages render with at minimum a preview state
- All 16 host city pages render with stadium info and editorial blurb
- The r/soccer pulse pipeline runs on schedule and surfaces topics
- The Kalshi market pulse pipeline runs on schedule and surfaces movers
- The about page is complete with sources and methodology
- The site is publicly accessible at the chosen domain
- The site loads in under 2 seconds on a typical desktop connection
- No protected marks or restricted assets are used anywhere on the site

Anything beyond this is nice-to-have for launch and can ship during the tournament.
