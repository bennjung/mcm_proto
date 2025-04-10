import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NFTMetadata } from "../types";
import { BigNumber } from "ethers";

const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.THIRDWEB_SECRET_KEY!,
  "mumbai" // 또는 mainnet
);

export async function mintNFT(walletAddress: string, metadata: NFTMetadata): Promise<string> {
  const contract = await sdk.getContract(process.env.NFT_CONTRACT_ADDRESS!);
  const tx = await contract.erc721.mintTo(walletAddress, { metadata });
  return tx.id.toString(); // BigNumber를 string으로 변환
}

// 보안 점수에 따른 배지 이미지 생성
function generateSecurityBadgeImage(score: number): string {
  // TODO: 실제 이미지 생성 로직 구현
  return `https://api.security-badge.com/generate?score=${score}`;
} 