import { NFTMetadata } from '@/types';
import { createThirdwebClient, ThirdwebSDK } from "thirdweb";

export async function mintNFT(walletAddress: string, metadata: NFTMetadata) {
  try {
    // SDK 초기화
    const sdk = await ThirdwebSDK.fromPrivateKey(
      process.env.THIRDWEB_SECRET_KEY!,
      "sepolia"
    );

    // 컨트랙트 연결
    const contract = await sdk.getContract(
      process.env.NFT_CONTRACT_ADDRESS!
    );

    // NFT 민팅
    const tx = await contract.erc721.mintTo(
      walletAddress,
      {
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        attributes: [
          {
            trait_type: "Security Score",
            value: metadata.attributes.securityScore
          },
          {
            trait_type: "Vulnerabilities Count",
            value: metadata.attributes.vulnerabilitiesCount
          },
          {
            trait_type: "Analysis Date",
            value: metadata.attributes.analysisDate
          },
          {
            trait_type: "Repository URL",
            value: metadata.attributes.repoUrl
          }
        ]
      }
    );

    // 트랜잭션 결과 반환
    return {
      tokenId: tx.id.toString(),
      transactionHash: tx.transactionHash,
    };

  } catch (error) {
    console.error('NFT 민팅 에러:', error);
    throw new Error(`NFT 민팅 실패: ${error instanceof Error ? error.message : '알 수 없는 에러'}`);
  }
} 