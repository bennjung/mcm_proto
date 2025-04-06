import { Contract, JsonRpcProvider, formatEther, parseEther, Wallet, ContractTransactionResponse } from 'ethers';
import { NFTContract, NFTMetadata } from '../types/nftContract';
import { uploadJsonToZeroGStorage } from './zeroGStorage';
import { ethers } from 'ethers';

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
  private provider: JsonRpcProvider;
  private wallet: Wallet;

  constructor() {
    // TODO: 네트워크 설정 확인
    if (!process.env.NEXT_PUBLIC_RPC_URL || !process.env.PRIVATE_KEY || !process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS) {
      throw new Error('Missing required environment variables');
    }

    this.provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    this.wallet = new Wallet(process.env.PRIVATE_KEY, this.provider);
    this.contract = new Contract(
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
      NFT_ABI,
      this.wallet
    ) as NFTContract;
  }

  /**
   * NFT 민팅
   */
  async mintNFT(metadata: NFTMetadata): Promise<string> {
    try {
      // 0G Storage에 메타데이터 업로드
      const storageResult = await uploadJsonToZeroGStorage(metadata, {
        name: metadata.name,
        description: metadata.description
      });

      if (!storageResult.success || !storageResult.metadataUri) {
        throw new Error('Failed to upload metadata to 0G Storage');
      }

      // NFT 민팅
      const tx = await this.contract.safeMint(this.wallet.address, storageResult.metadataUri);
      const receipt = await tx.wait();

      if (!receipt) {
        throw new Error('Transaction receipt is null');
      }

      return receipt.hash;
    } catch (error: any) {
      console.error('Error minting NFT:', error);
      throw error;
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
      return formatEther(balance);
    } catch (error) {
      console.error('Balance retrieval error:', error);
      throw error;
    }
  }
}

/**
 * NFT 민팅 함수
 */
export async function mintNFT(
  metadataUri: string,
  options: {
    sourceRepo: string;
    analysisTimestamp: string;
  }
): Promise<{
  success: boolean;
  tokenId?: string;
  transactionHash?: string;
  error?: string;
}> {
  try {
    const nftService = new NFTService();
    const txHash = await nftService.mintNFT({
      name: `MCS Analysis - ${options.sourceRepo}`,
      description: `Security analysis result for ${options.sourceRepo}`,
      image: 'https://example.com/placeholder.png',
      attributes: {
        securityScore: 100,
        analysisDate: options.analysisTimestamp,
        storageUri: metadataUri,
        teeAttestation: 'verified'
      }
    });

    return {
      success: true,
      tokenId: '1', // TODO: Get actual token ID
      transactionHash: txHash
    };
  } catch (error) {
    console.error('Error minting NFT:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 