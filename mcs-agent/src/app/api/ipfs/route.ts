import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { encryptedCode } = body;

    // TODO: IPFS 업로드 로직 구현
    const ipfsHash = 'Qm...'; // 임시 구현

    return NextResponse.json({ ipfsHash });
  } catch (error) {
    console.error('IPFS upload error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 