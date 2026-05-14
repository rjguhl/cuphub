// Host cities. Static data — editorial fields can move to /content/cities/*.mdx later.
export type City = {
  slug: string;
  name: string;
  country: 'US' | 'MX' | 'CA';
  stadium: string;
  capacity: number;
  timezone: string;
  lat?: number;
  lon?: number;
};

// 16 host cities (2026). Stadium names are descriptive (no protected sponsor wordmarks).
const CITIES: City[] = [
  { slug: 'atlanta',      name: 'Atlanta',      country: 'US', stadium: 'Atlanta Stadium',      capacity: 71000, timezone: 'America/New_York',    lat: 33.755, lon: -84.401 },
  { slug: 'boston',       name: 'Boston',       country: 'US', stadium: 'Foxborough',           capacity: 65878, timezone: 'America/New_York',    lat: 42.091, lon: -71.264 },
  { slug: 'dallas',       name: 'Dallas',       country: 'US', stadium: 'Arlington Stadium',    capacity: 80000, timezone: 'America/Chicago',     lat: 32.747, lon: -97.093 },
  { slug: 'houston',      name: 'Houston',      country: 'US', stadium: 'Houston Stadium',      capacity: 72220, timezone: 'America/Chicago',     lat: 29.685, lon: -95.411 },
  { slug: 'kansas-city',  name: 'Kansas City',  country: 'US', stadium: 'Kansas City Stadium', capacity: 76416, timezone: 'America/Chicago',     lat: 39.049, lon: -94.484 },
  { slug: 'los-angeles',  name: 'Los Angeles',  country: 'US', stadium: 'Inglewood Stadium',    capacity: 70240, timezone: 'America/Los_Angeles', lat: 33.953, lon: -118.339 },
  { slug: 'miami',        name: 'Miami',        country: 'US', stadium: 'Miami Stadium',        capacity: 65326, timezone: 'America/New_York',    lat: 25.958, lon: -80.239 },
  { slug: 'new-york',     name: 'New York / NJ', country: 'US', stadium: 'East Rutherford',     capacity: 82500, timezone: 'America/New_York',    lat: 40.813, lon: -74.074 },
  { slug: 'philadelphia', name: 'Philadelphia', country: 'US', stadium: 'Philly Stadium',       capacity: 69796, timezone: 'America/New_York',    lat: 39.901, lon: -75.167 },
  { slug: 'san-francisco', name: 'San Francisco Bay', country: 'US', stadium: 'Santa Clara Stadium', capacity: 68500, timezone: 'America/Los_Angeles', lat: 37.403, lon: -121.970 },
  { slug: 'seattle',      name: 'Seattle',      country: 'US', stadium: 'Seattle Stadium',      capacity: 68740, timezone: 'America/Los_Angeles', lat: 47.595, lon: -122.331 },
  { slug: 'guadalajara',  name: 'Guadalajara',  country: 'MX', stadium: 'Estadio Guadalajara',  capacity: 49850, timezone: 'America/Mexico_City',  lat: 20.681, lon: -103.462 },
  { slug: 'mexico-city',  name: 'Mexico City',  country: 'MX', stadium: 'Estadio Azteca',       capacity: 87000, timezone: 'America/Mexico_City',  lat: 19.303, lon: -99.150 },
  { slug: 'monterrey',    name: 'Monterrey',    country: 'MX', stadium: 'Estadio Monterrey',    capacity: 53500, timezone: 'America/Monterrey',    lat: 25.669, lon: -100.244 },
  { slug: 'toronto',      name: 'Toronto',      country: 'CA', stadium: 'Toronto Stadium',      capacity: 45736, timezone: 'America/Toronto',      lat: 43.633, lon: -79.418 },
  { slug: 'vancouver',    name: 'Vancouver',    country: 'CA', stadium: 'Vancouver Stadium',    capacity: 54500, timezone: 'America/Vancouver',    lat: 49.277, lon: -123.112 },
];

export async function getAllCities(): Promise<City[]> {
  return CITIES;
}

export async function getCity(slug: string): Promise<City | null> {
  return CITIES.find((c) => c.slug === slug) ?? null;
}
