import { NextResponse } from 'next/server';
import { getContent } from '@/lib/content';

export async function GET() {
  try {
    const content = getContent();
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
