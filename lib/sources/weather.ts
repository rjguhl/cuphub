// OpenWeatherMap adapter for host city weather.
import { cached, TTL } from '@/lib/utils/cache';

export type Forecast = {
  cityTimezone: string;
  tempC: number;
  conditions: string;
  asOf: string;
};

export async function fetchForecast(city: { lat: number; lon: number; timezone: string }): Promise<Forecast | null> {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key || (city.lat === 0 && city.lon === 0)) return null;
  return cached(`weather:${city.lat},${city.lon}`, TTL.weather, async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${key}`;
    const res = await fetch(url, { next: { revalidate: TTL.weather } });
    if (!res.ok) return null;
    const json: any = await res.json();
    return {
      cityTimezone: city.timezone,
      tempC: json?.main?.temp ?? 0,
      conditions: json?.weather?.[0]?.main ?? 'Clear',
      asOf: new Date().toISOString(),
    };
  });
}
