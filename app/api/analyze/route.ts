import { NextRequest, NextResponse } from 'next/server';
import { GitHubService } from '@/services/github';
import { ElizaService } from '@/services/eliza';
import { StorageService } from '@/services/storage';
import { NFTService } from '@/services/nft';
import { AnalyzeRequest, AnalyzeResponse } from '@/types/api';
import { rm } from 'fs/promises';
import { generateAnalysisResult } from '@/mock/analysis';
import { generateNFTMetadata } from '@/mock/nft';
import { mockAnalysisResult } from '../../lib/mock/analysis';

/**
 * POST /api/analyze
 * 코드 보안 분석 및 NFT 발행 API
 */
export async function POST(request: Request) {
  try {
    // 요청 바디 파싱
    const body = await request.json();
    const { repoUrl, walletAddress } = body;

    // 입력값 검증
    if (!repoUrl || !walletAddress) {
      return NextResponse.json(
        { error: '저장소 URL과 지갑 주소가 필요합니다.' },
        { status: 400 }
      );
    }

    // 실제 분석 대신 2초 딜레이 후 목업 데이터 반환
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 목업 데이터에 실제 입력값 반영
    const result = {
      ...mockAnalysisResult,
      repoUrl,
      timestamp: new Date().toISOString(),
      nftMetadata: {
        ...mockAnalysisResult.nftMetadata,
        name: `Security Audit Badge for ${repoUrl.split('/').pop()}`,
        tokenId: Math.floor(Math.random() * 10000).toString(),
        txHash: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
      }
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('분석 중 오류 발생:', error);
    return NextResponse.json(
      { error: '분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 