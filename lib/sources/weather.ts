// OpenWeatherMap adapter for host city weather.
export type Forecast = {
  cityTimezone: string;
  tempC: number;
  conditions: string;
  asOf: string;
};

export async function fetchForecast(city: { lat: number; lon: number; timezone: string }): Promise<Forecast | null> {
  // TODO: call OWM with API key from env (OPENWEATHER_API_KEY).
  return null;
}
