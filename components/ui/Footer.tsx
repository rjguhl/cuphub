import Link from 'next/link';
import { copy } from '@/config/copy';

export function Footer() {
  return (
    <footer className="mt-16">
      <div className="chalk-line mb-4" />
      <div className="flex flex-wrap gap-4 text-xs text-chalk/70 font-mono uppercase tracking-widest">
        <span>© {new Date().getFullYear()} {copy.brand.name}</span>
        <span>·</span>
        <Link href="/about" className="hover:text-yellow">About & sources</Link>
        <span>·</span>
        <Link href="/about" className="hover:text-yellow">Methodology</Link>
        <span>·</span>
        <span className="text-chalk/40">Where to watch · region detection coming</span>
      </div>
      <p className="mt-3 text-[10px] text-chalk/40">
        Independent project. Not affiliated with the tournament's governing body or any broadcast partner.
      </p>
    </footer>
  );
}
