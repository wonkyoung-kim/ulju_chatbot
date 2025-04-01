
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { query } = await req.json();

  // Mock response logic
  const reply = query.includes('신고')
    ? [{ id: '1', type: 'button', buttons: ['화재 신고', '지진 신고'], sender: 'bot', timestamp: new Date().toISOString() }]
    : [{ id: '1', type: 'text', content: `질문하신 내용 '${query}'에 대한 답변입니다.`, sender: 'bot', timestamp: new Date().toISOString() }];

  return NextResponse.json(reply);
}
