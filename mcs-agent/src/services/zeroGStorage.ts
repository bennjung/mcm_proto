import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { createHash } from 'crypto';
import { ZeroGStorageOptions, ZeroGStorageResponse, AnalysisResult } from '../types/zeroGStorage';

// 0G Storage API 설정
const ZERO_G_STORAGE_API = process.env.ZERO_G_STORAGE_API || 'https://storage.0g.dev/v1';
const ZERO_G_STORAGE_KEY = process.env.ZERO_G_STORAGE_KEY;

/**
 * 파일을 0G Storage에 업로드
 */
export async function uploadToZeroGStorage(
  filePath: string,
  options: ZeroGStorageOptions = {}
): Promise<ZeroGStorageResponse> {
  try {
    // 파일 존재 확인
    if (!await fs.pathExists(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // 파일 데이터 준비
    const fileData = await fs.readFile(filePath);
    const fileName = path.basename(filePath);
    
    // 파일 해시 생성
    const fileHash = createHash('sha256').update(fileData).digest('hex');
    
    // 폼 데이터 생성
    const formData = new FormData();
    formData.append('file', new Blob([fileData]), fileName);
    
    // 메타데이터 추가
    const metadata = {
      name: options.name || fileName,
      description: options.description || 'Uploaded by MCS',
      contentType: options.contentType || 'application/octet-stream',
      hash: fileHash,
      replicationLevel: options.replicationLevel || 3,
      encryption: options.encryption || 'aes-256-gcm',
      timestamp: new Date().toISOString(),
      ...options.metadata
    };
    
    formData.append('metadata', JSON.stringify(metadata));
    
    // 0G Storage API 호출
    const response = await axios.post(`${ZERO_G_STORAGE_API}/upload`, formData, {
      headers: {
        'Authorization': `Bearer ${ZERO_G_STORAGE_KEY}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return {
      success: true,
      cid: response.data.cid,
      size: response.data.size,
      timestamp: response.data.timestamp,
      uri: `0g://${response.data.cid}`
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Error uploading to 0G Storage: ${filePath}`, error);
    return {
      success: false,
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined
    };
  }
}

/**
 * JSON 메타데이터를 0G Storage에 업로드
 */
export async function uploadJsonToZeroGStorage(
  jsonData: Record<string, unknown>,
  options: ZeroGStorageOptions = {}
): Promise<ZeroGStorageResponse> {
  try {
    // 임시 파일 생성
    const tempFilePath = path.join(
      process.env.TEMP_DIR || './temp',
      `json_${Date.now()}.json`
    );
    
    // 임시 디렉토리 생성
    await fs.ensureDir(path.dirname(tempFilePath));
    
    // JSON 데이터 파일로 저장
    await fs.writeJSON(tempFilePath, jsonData, { spaces: 2 });
    
    // 0G Storage에 업로드
    const result = await uploadToZeroGStorage(tempFilePath, {
      ...options,
      contentType: 'application/json'
    });
    
    // 임시 파일 삭제
    await fs.remove(tempFilePath).catch((err: Error) => 
      console.warn(`Warning: Failed to delete temp file: ${tempFilePath}`, err)
    );
    
    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error uploading JSON to 0G Storage:', error);
    return {
      success: false,
      error: errorMessage
    };
  }
}

/**
 * 보안 점수 계산
 */
export function calculateSecurityScore(analysisResult: AnalysisResult): number {
  if (!analysisResult || !analysisResult.analysis) {
    return 50;
  }
  
  const severityCounts = analysisResult.analysis.severity_counts || {};
  
  const highWeight = 5;
  const mediumWeight = 3;
  const lowWeight = 1;
  
  const weightedScore = 100 - (
    (severityCounts.high || 0) * highWeight +
    (severityCounts.medium || 0) * mediumWeight +
    (severityCounts.low || 0) * lowWeight
  );
  
  return Math.max(0, Math.min(100, weightedScore));
} 