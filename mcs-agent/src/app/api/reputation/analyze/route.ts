import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { repoUrl, walletAddress } = data;

    if (!repoUrl || !walletAddress) {
      return NextResponse.json(
        { error: 'Repository URL and wallet address are required' },
        { status: 400 }
      );
    }

    // TODO: ELIZA OS 구현 후 분석 로직 추가
    return NextResponse.json({
      message: 'Analysis will be implemented with ELIZA OS',
      repoUrl,
      walletAddress
    });
  } catch (error: any) {
    console.error('Error in reputation analysis:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 