'use client';
// Goal celebration. Fire from the bottom corners — feels like a stadium pyro burst.
// Use: <Confetti trigger={someBoolean} /> — fires once when trigger flips truthy.
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const COLORS = ['#FFD60A', '#FF2E4C', '#3DB7FF', '#FF3DCB', '#B6FF3D', '#FFB300', '#FFFFFF'];

export function fireConfetti() {
  const burst = (originX: number) =>
    confetti({
      particleCount: 80,
      spread: 70,
      startVelocity: 55,
      origin: { x: originX, y: 0.85 },
      colors: COLORS,
      scalar: 1.1,
      ticks: 200,
    });
  burst(0.15);
  burst(0.85);
}

export function Confetti({ trigger }: { trigger: unknown }) {
  const fired = useRef(false);
  useEffect(() => {
    if (!trigger || fired.current) return;
    fired.current = true;
    fireConfetti();
  }, [trigger]);
  return null;
}
