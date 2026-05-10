import Link from 'next/link';
import { copy } from '@/config/copy';

export function Footer() {
  return (
    <footer className="mt-12 pt-6 border-t border-deeppurple/10 text-sm flex flex-wrap gap-4 opacity-80">
      <span>© {new Date().getFullYear()} {copy.brand.name}</span>
      <Link href="/about">About & Sources</Link>
      <span>Where to watch · region detection coming</span>
    </footer>
  );
}
