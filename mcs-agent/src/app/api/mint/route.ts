import { NextResponse } from 'next/server';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ipfsHash, metadata } = body;

    // Thirdweb SDK 초기화
    const sdk = new ThirdwebSDK(
      new ethers.Wallet(
        process.env.PRIVATE_KEY!,
        ethers.getDefaultProvider(process.env.NETWORK_RPC_URL!)
      )
    );

    // NFT 컨트랙트 가져오기
    const contract = await sdk.getContract(
      process.env.NFT_CONTRACT_ADDRESS!,
      'nft-collection'
    );

    // NFT 민팅
    const tx = await contract.mintTo(
      process.env.WALLET_ADDRESS!,
      {
        name: metadata.name,
        description: metadata.description,
        image: `ipfs://${ipfsHash}`,
        properties: {
          ...metadata.properties,
          ipfsHash,
        },
      }
    );

    const receipt = await tx.receipt();
    const tokenId = receipt.events?.[0].args?.tokenId.toString();

    return NextResponse.json({ tokenId });
  } catch (error) {
    console.error('Minting error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 