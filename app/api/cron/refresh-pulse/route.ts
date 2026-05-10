// Vercel Cron entry. Configure schedule in vercel.json.
// Refresh r/soccer pulse cache server-side so clients never hit Reddit directly.
import { NextResponse } from 'next/server';
import { getTopPulseTopics } from '@/lib/data/pulse';

export async function GET() {
  const topics = await getTopPulseTopics(10);
  return NextResponse.json({ ok: true, count: topics.length });
}
