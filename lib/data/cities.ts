// Host cities. Static-ish data, kept in /content/cities for editorial fields.
export type City = {
  slug: string;
  name: string;
  country: 'US' | 'MX' | 'CA';
  stadium: string;
  capacity: number;
  timezone: string; // IANA, e.g. 'America/New_York'
};

const CITIES: City[] = [
  // Populate with the 16 host cities. Stub list below; fill out before launch.
  // { slug: 'mexico-city', name: 'Mexico City', country: 'MX', stadium: 'Estadio Azteca', capacity: 87000, timezone: 'America/Mexico_City' },
];

export async function getAllCities(): Promise<City[]> {
  return CITIES;
}

export async function getCity(slug: string): Promise<City | null> {
  return CITIES.find((c) => c.slug === slug) ?? null;
}
