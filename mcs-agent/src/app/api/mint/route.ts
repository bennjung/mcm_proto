import { NextResponse } from 'next/server';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import { uploadJsonToZeroGStorage } from '@/services/zeroGStorage';

interface TransferEvent {
  event: string;
  args: {
    tokenId: {
      toString: () => string;
    };
  };
}

export async function POST(request: Request) {
  try {
    const { metadata } = await request.json();
    
    // 0G Storage에 메타데이터 업로드
    const storageResult = await uploadJsonToZeroGStorage(metadata, {
      name: metadata.name,
      description: metadata.description
    });
    
    if (!storageResult.success) {
      throw new Error(`Failed to upload to 0G Storage: ${storageResult.error}`);
    }
    
    // Thirdweb SDK 초기화
    const sdk = new ThirdwebSDK(
      new ethers.Wallet(
        process.env.PRIVATE_KEY!,
        ethers.getDefaultProvider(process.env.NETWORK_RPC_URL)
      )
    );
    
    // NFT 컨트랙트 가져오기
    const contract = await sdk.getContract(process.env.NFT_CONTRACT_ADDRESS!);
    
    // NFT 민팅
    const tx = await contract.erc721.mintTo(process.env.WALLET_ADDRESS!, {
      name: metadata.name,
      description: metadata.description,
      image: storageResult.uri,
      properties: metadata.properties || {}
    });
    
    // 트랜잭션 영수증 가져오기
    const receipt = await tx.receipt;
    
    // 토큰 ID 추출
    const tokenId = receipt.events?.find(
      (e: TransferEvent) => e.event === 'Transfer'
    )?.args?.tokenId?.toString();
    
    return NextResponse.json({ 
      success: true, 
      tokenId,
      storageUri: storageResult.uri
    });
  } catch (error) {
    console.error('Minting error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to mint NFT' },
      { status: 500 }
    );
  }
} 