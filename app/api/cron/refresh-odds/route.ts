import { NextResponse } from 'next/server';
import { getChampionshipLeaders, getBiggestMovers } from '@/lib/data/odds';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const [leaders, movers] = await Promise.all([getChampionshipLeaders(), getBiggestMovers()]);
  return NextResponse.json({
    ok: true,
    leaders: leaders.length,
    movers: movers.length,
    at: new Date().toISOString(),
  });
}
