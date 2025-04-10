import { NextResponse } from 'next/server';
import { mockUserNFTs } from '../../lib/mock/nft';

// 사용자의 NFT 목록 조회
export async function GET(request: Request) {
  try {
    // URL에서 지갑 주소 파라미터 추출
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
      return NextResponse.json(
        { error: '지갑 주소가 필요합니다.' },
        { status: 400 }
      );
    }

    // 실제 API 호출 대신 목업 데이터 반환
    await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초 딜레이

    return NextResponse.json({
      nfts: mockUserNFTs
    });
  } catch (error) {
    console.error('사용자 NFT 목록 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '사용자 NFT 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 