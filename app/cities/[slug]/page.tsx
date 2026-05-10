import { notFound } from 'next/navigation';
import { getCity } from '@/lib/data/cities';

export const revalidate = 3600;

export default async function CityPage({ params }: { params: { slug: string } }) {
  const city = await getCity(params.slug);
  if (!city) notFound();
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <header>
        <h1 className="font-display text-4xl">{city.name}</h1>
        <p className="text-sm opacity-70">{city.stadium} · {city.capacity.toLocaleString()} cap · {city.timezone}</p>
      </header>
      {/* TODO: matches at this venue, weather, fan zones, neighborhood callouts */}
    </main>
  );
}
