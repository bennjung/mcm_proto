import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SESSIONS_DIR = path.join(process.cwd(), 'tmp', 'sessions');

// 세션 디렉토리 생성
if (!fs.existsSync(SESSIONS_DIR)) {
  fs.mkdirSync(SESSIONS_DIR, { recursive: true });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { code, auditResult } = data;

    if (!code || !auditResult) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // 세션 ID 생성 및 데이터 저장
    const sessionId = Date.now().toString();
    const sessionData = {
      code,
      auditResult,
      timestamp: new Date().toISOString(),
    };

    // 세션 데이터를 파일로 저장
    const sessionPath = path.join(SESSIONS_DIR, `${sessionId}.json`);
    fs.writeFileSync(sessionPath, JSON.stringify(sessionData, null, 2));

    return NextResponse.json({
      success: true,
      sessionId
    });
  } catch (error) {
    console.error('Error processing NFT request:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json(
      { success: false, error: 'Session ID is required' },
      { status: 400 }
    );
  }

  try {
    const sessionPath = path.join(SESSIONS_DIR, `${sessionId}.json`);
    
    if (!fs.existsSync(sessionPath)) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      );
    }

    const sessionData = JSON.parse(fs.readFileSync(sessionPath, 'utf-8'));

    return NextResponse.json({
      success: true,
      nftData: sessionData
    });
  } catch (error) {
    console.error('Error fetching NFT data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch NFT data' },
      { status: 500 }
    );
  }
} 