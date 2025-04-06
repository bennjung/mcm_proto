import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ipfsHash, metadata } = body;

    // TODO: 0G Chain 민팅 로직 구현
    const tokenId = '0x...'; // 임시 구현

    return NextResponse.json({ tokenId });
  } catch (error) {
    console.error('Minting error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 