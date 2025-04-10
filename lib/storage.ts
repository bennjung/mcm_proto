import { ZgFile, Indexer } from '@0glabs/0g-ts-sdk';
import dotenv from 'dotenv';

dotenv.config();

// 0G Storage 테스트넷 설정
const STORAGE_CONFIG = {
  rpcUrl: 'https://rpc-storage-testnet.0g.ai',
  chainRpcUrl: 'https://evmrpc-testnet.0g.ai',
  chainId: 16600
};

export interface StorageResult {
  id: string;
  url: string;
  timestamp: string;
}

export interface AnalysisStorageData {
  repoUrl: string;
  securityScore: number;
  vulnerabilities: Array<{
    severity: 'high' | 'medium' | 'low';
    description: string;
    location: string;
  }>;
  recommendations: string[];
  timestamp: string;
}

export async function saveToStorage(data: AnalysisStorageData): Promise<StorageResult> {
  try {
    // 0G Storage Indexer 초기화
    const indexer = new Indexer({
      apiKey: process.env.ZEROX_STORAGE_API_KEY || '',
      rpcUrl: STORAGE_CONFIG.rpcUrl,
      chainRpcUrl: STORAGE_CONFIG.chainRpcUrl,
      chainId: STORAGE_CONFIG.chainId
    });
    
    // 데이터를 ZgFile로 변환
    const file = new ZgFile(JSON.stringify(data));
    
    // 데이터 업로드
    const result = await indexer.upload(file);
    
    if (!result || !result.id) {
      throw new Error('Storage upload failed: No storage ID returned');
    }

    return {
      id: result.id,
      url: `${STORAGE_CONFIG.rpcUrl}/storage/${result.id}`,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error saving to 0G Storage:', error);
    throw error;
  }
}

export async function getFromStorage(storageId: string): Promise<AnalysisStorageData> {
  try {
    // 0G Storage Indexer 초기화
    const indexer = new Indexer({
      apiKey: process.env.ZEROX_STORAGE_API_KEY || '',
      rpcUrl: STORAGE_CONFIG.rpcUrl,
      chainRpcUrl: STORAGE_CONFIG.chainRpcUrl,
      chainId: STORAGE_CONFIG.chainId
    });
    
    // 데이터 조회
    const file = await indexer.download(storageId);
    
    if (!file) {
      throw new Error('Storage data not found');
    }

    return JSON.parse(await file.text()) as AnalysisStorageData;
  } catch (error) {
    console.error('Error getting from 0G Storage:', error);
    throw error;
  }
} 