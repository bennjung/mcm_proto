import { ethers } from 'ethers';
import { NFTContract, NFTMetadata } from '../types/nftContract';
import { uploadJsonToZeroGStorage } from './zeroGStorage';

// TODO: 컨트랙트 ABI 설정
const NFT_ABI = [
  'function mint(address to, string memory metadataUri) public returns (uint256)',
  'function tokenURI(uint256 tokenId) public view returns (string memory)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function balanceOf(address owner) public view returns (uint256)',
  'function totalSupply() public view returns (uint256)'
];

/**
 * NFT 서비스 클래스
 */
export class NFTService {
  private contract: NFTContract;
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    // TODO: 네트워크 설정 확인
    if (!process.env.NETWORK_RPC_URL || !process.env.PRIVATE_KEY || !process.env.NFT_CONTRACT_ADDRESS) {
      throw new Error('Missing required environment variables');
    }

    this.provider = new ethers.providers.JsonRpcProvider(process.env.NETWORK_RPC_URL);
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.contract = new ethers.Contract(
      process.env.NFT_CONTRACT_ADDRESS,
      NFT_ABI,
      this.wallet
    ) as NFTContract;
  }

  /**
   * NFT 민팅
   */
  async mintNFT(metadata: NFTMetadata, toAddress: string): Promise<{
    success: boolean;
    tokenId?: string;
    transactionHash?: string;
    error?: string;
  }> {
    try {
      // 0G Storage에 메타데이터 업로드
      const storageResult = await uploadJsonToZeroGStorage(metadata, {
        name: metadata.name,
        description: metadata.description
      });

      if (!storageResult.success) {
        throw new Error(`Failed to upload metadata: ${storageResult.error}`);
      }

      // TODO: 가스비 추정 및 설정
      const gasEstimate = await this.contract.estimateGas.mint(toAddress, storageResult.uri);
      const gasPrice = await this.provider.getGasPrice();
      
      // 민팅 트랜잭션 전송
      const tx = await this.contract.mint(toAddress, storageResult.uri, {
        gasLimit: gasEstimate.mul(120).div(100), // 20% 여유
        gasPrice: gasPrice.mul(110).div(100) // 10% 프리미엄
      });

      // 트랜잭션 영수증 대기
      const receipt = await tx.wait();
      
      // 토큰 ID 추출
      const tokenId = receipt.events?.find(
        (e: any) => e.event === 'Transfer'
      )?.args?.tokenId?.toString();

      return {
        success: true,
        tokenId,
        transactionHash: receipt.transactionHash
      };
    } catch (error) {
      console.error('NFT minting error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * NFT 정보 조회
   */
  async getNFTInfo(tokenId: number): Promise<{
    owner: string;
    uri: string;
  }> {
    try {
      const [owner, uri] = await Promise.all([
        this.contract.ownerOf(tokenId),
        this.contract.tokenURI(tokenId)
      ]);

      return { owner, uri };
    } catch (error) {
      console.error('NFT info retrieval error:', error);
      throw error;
    }
  }

  /**
   * 지갑 잔액 조회
   */
  async getBalance(): Promise<string> {
    try {
      const balance = await this.provider.getBalance(this.wallet.address);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Balance retrieval error:', error);
      throw error;
    }
  }
} 