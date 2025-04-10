import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: {
    sessionId: string | Promise<string>;
  };
};

export async function GET(request: NextRequest, { params }: Props) {
  const sessionId = await params.sessionId;
  
  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }

  try {
    // 세션 ID를 사용하여 데이터 조회
    const nftData = {
      // 실제 구현 시에는 데이터베이스나 안전한 저장소에서 조회
      code: "임시 데이터",
      auditResult: {}
    };

    return NextResponse.json({ 
      success: true, 
      nftData 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 