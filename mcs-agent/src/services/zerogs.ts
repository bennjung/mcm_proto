import { ethers } from 'ethers';
import axios from 'axios';

interface TEEAttestation {
  success: boolean;
  attestation: string;
  expiry: string;
  error?: string;
}

interface NFTMintResult {
  success: boolean;
  tokenId: string;
  txHash: string;
  blockNumber: number;
  error?: string;
}

/**
 * TEE 증명을 생성합니다.
 * @param analysis 분석 결과
 * @returns TEE 증명 결과
 */
export async function generateTEEAttestation(analysis: any): Promise<TEEAttestation> {
  try {
    const teeApiKey = process.env.TEE_API_KEY;
    const teeServiceUrl = process.env.TEE_SERVICE_URL;

    if (!teeApiKey || !teeServiceUrl) {
      throw new Error('TEE service configuration is missing');
    }

    const response = await axios.post(teeServiceUrl, {
      analysis,
      timestamp: Math.floor(Date.now() / 1000)
    }, {
      headers: {
        'Authorization': `Bearer ${teeApiKey}`
      }
    });

    return {
      success: true,
      attestation: response.data.attestation,
      expiry: response.data.expiry
    };
  } catch (error) {
    return {
      success: false,
      attestation: '',
      expiry: '',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * 0G Chain에 NFT를 민팅합니다.
 * @param walletAddress 지갑 주소
 * @param metadataUri 메타데이터 URI
 * @param securityData 보안 데이터
 * @param privateKey 개인 키
 * @returns 민팅 결과
 */
export async function mintNFTOnZeroGChain(
  walletAddress: string,
  metadataUri: string,
  securityData: {
    codeHash: string;
    analysisHash: string;
    timestamp: number;
    verifier: string;
    teeAttestation: string;
  },
  privateKey: string
): Promise<NFTMintResult> {
  try {
    const rpcUrl = process.env.ZERO_G_RPC_URL;
    const contractAddress = process.env.NFT_CONTRACT_ADDRESS;

    if (!rpcUrl || !contractAddress) {
      throw new Error('0G Chain configuration is missing');
    }

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // ABI 및 컨트랙트 인스턴스 생성
    const abi = [
      'function mint(address to, string memory uri, bytes32 codeHash, bytes32 analysisHash, uint256 timestamp, address verifier, string memory attestation) returns (uint256)'
    ];
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // NFT 민팅
    const tx = await contract.mint(
      walletAddress,
      metadataUri,
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes(securityData.codeHash)),
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes(securityData.analysisHash)),
      securityData.timestamp,
      securityData.verifier,
      securityData.teeAttestation
    );

    const receipt = await tx.wait();

    return {
      success: true,
      tokenId: receipt.events[0].args.tokenId.toString(),
      txHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    return {
      success: false,
      tokenId: '',
      txHash: '',
      blockNumber: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * 코드 보안 상태를 검증합니다.
 * @param tokenId 토큰 ID
 * @returns 검증 결과
 */
export async function verifyCodeSecurityStatus(tokenId: string) {
  try {
    const rpcUrl = process.env.ZERO_G_RPC_URL;
    const contractAddress = process.env.NFT_CONTRACT_ADDRESS;

    if (!rpcUrl || !contractAddress) {
      throw new Error('0G Chain configuration is missing');
    }

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    // ABI 및 컨트랙트 인스턴스 생성
    const abi = [
      'function verifySecurityStatus(uint256 tokenId) view returns (bool)'
    ];
    const contract = new ethers.Contract(contractAddress, abi, provider);

    // 보안 상태 검증
    const isSecure = await contract.verifySecurityStatus(tokenId);

    return {
      success: true,
      isSecure
    };
  } catch (error) {
    return {
      success: false,
      isSecure: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 