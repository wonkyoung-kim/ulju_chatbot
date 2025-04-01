
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.formData();
  return NextResponse.json({ success: true, received: data.get('title') });
}
