import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, key } = body;

    // TODO: 암호화 로직 구현
    const encryptedCode = code; // 임시 구현

    return NextResponse.json({ encryptedCode });
  } catch (error) {
    console.error('Encryption error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 