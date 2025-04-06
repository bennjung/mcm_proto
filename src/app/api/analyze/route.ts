import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { githubUrl, walletAddress } = await request.json();

    if (!githubUrl || !walletAddress) {
      return NextResponse.json(
        { error: 'GitHub URL과 지갑 주소가 필요합니다.' },
        { status: 400 }
      );
    }

    // 분석 스크립트 실행
    const { stdout } = await execAsync(
      `node src/scripts/analyze-repo.js "${githubUrl}" "${walletAddress}"`
    );

    // 스크립트 출력 파싱
    const result = JSON.parse(stdout);

    return NextResponse.json({
      result: result.analysis,
      reportUrl: result.reportUrl,
      nftUrl: result.nftUrl
    });
  } catch (error) {
    console.error('분석 중 오류 발생:', error);
    return NextResponse.json(
      { error: '분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 