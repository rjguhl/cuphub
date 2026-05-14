import { Eagle } from '@/components/sprites/Eagle';
import { ButtonLink } from '@/components/retro/Button';

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-chalk text-center px-4">
      <Eagle size={96} idle />
      <h1 className="font-display text-5xl mt-4">Off-side</h1>
      <p className="mt-2 text-chalk/80">That page isn't on the team sheet.</p>
      <ButtonLink href="/" variant="primary" size="md" className="mt-6">
        ← back to the hub
      </ButtonLink>
    </main>
  );
}
