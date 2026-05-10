import { NextResponse } from 'next/server';
import { getChampionshipLeaders, getBiggestMovers } from '@/lib/data/odds';

export async function GET() {
  const [leaders, movers] = await Promise.all([getChampionshipLeaders(), getBiggestMovers()]);
  return NextResponse.json({ ok: true, leaders: leaders.length, movers: movers.length });
}
