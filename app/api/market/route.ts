import { NextResponse } from 'next/server';
import { mockNFTList, mockUserNFTs } from '../../lib/mock/nft';

// 마켓플레이스 NFT 목록 조회
export async function GET() {
  try {
    // 실제 API 호출 대신 목업 데이터 반환
    await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초 딜레이

    return NextResponse.json({
      nfts: mockNFTList
    });
  } catch (error) {
    console.error('마켓플레이스 데이터 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '마켓플레이스 데이터를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// NFT 구매
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tokenId, walletAddress } = body;

    if (!tokenId || !walletAddress) {
      return NextResponse.json(
        { error: '토큰 ID와 지갑 주소가 필요합니다.' },
        { status: 400 }
      );
    }

    // 구매 처리 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));

    return NextResponse.json({
      success: true,
      txHash: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      message: 'NFT 구매가 완료되었습니다.'
    });
  } catch (error) {
    console.error('NFT 구매 중 오류 발생:', error);
    return NextResponse.json(
      { error: 'NFT 구매 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 