import { Marquee } from '@/components/ui/Marquee';
import { Star } from '@/components/sprites/Star';

const FACTS = [
  '48 NATIONS',
  '16 HOST CITIES',
  '104 MATCHES',
  '39 DAYS OF SUMMER',
  '3 COUNTRIES, ONE TOURNAMENT',
  'KICKOFF · JUNE 11',
  'FINAL · JULY 19',
];

const COLORS = ['#FFD60A', '#FF3DCB', '#3DB7FF', '#B6FF3D', '#FFB300'];

// Tournament fact ticker — punchy, festival energy, scrolls forever.
export function TournamentTicker() {
  return (
    <div className="rounded-md bg-shadow/70 penalty-box overflow-hidden">
      <Marquee className="py-2">
        {FACTS.map((f, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 font-display text-lg tracking-widest"
            style={{ color: COLORS[i % COLORS.length] }}
          >
            <Star size={10} color={COLORS[i % COLORS.length]} />
            {f}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
