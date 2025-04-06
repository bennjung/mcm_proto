import { NextResponse } from 'next/server';
import { NFTService } from '@/services/nftService';
import { NFTMetadata } from '@/types/nftContract';

/**
 * NFT 민팅 API
 * 
 * TODO: 실제 구현 필요
 * - 컨트랙트 배포 및 주소 설정
 * - 지갑 프라이빗 키 보안 관리
 * - 트랜잭션 가스비 최적화
 * - 에러 처리 및 재시도 로직
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { metadata } = data;

    if (!metadata) {
      return NextResponse.json(
        { error: 'Metadata is required' },
        { status: 400 }
      );
    }

    const nftService = new NFTService();
    const txHash = await nftService.mintNFT(metadata as NFTMetadata);

    return NextResponse.json({ transactionHash: txHash });
  } catch (error: any) {
    console.error('Error in NFT minting API:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 