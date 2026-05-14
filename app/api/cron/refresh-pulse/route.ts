// Vercel Cron entry. Schedule lives in vercel.json.
// Refreshes the r/soccer pulse cache server-side so clients never hit Reddit directly.
import { NextResponse } from 'next/server';
import { getTopPulseTopics } from '@/lib/data/pulse';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  // Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}`.
  const auth = req.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const topics = await getTopPulseTopics(10);
  return NextResponse.json({ ok: true, count: topics.length, at: new Date().toISOString() });
}
