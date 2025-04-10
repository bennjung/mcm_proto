import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { createHash } from 'crypto';
import { ZeroGStorageOptions, ZeroGStorageResponse, AnalysisResult } from '../types/zeroGStorage';
import { NFTMetadata } from '../types/nftContract';

// TODO: 0G Storage API 엔드포인트 및 인증 정보 설정
// 1. 0G Storage 개발자 포털 접속 (https://developer.0g.dev)
// 2. 프로젝트 생성 후 API 키 발급
// 3. API 문서에서 엔드포인트 확인
// 4. 발급받은 API 키를 .env 파일에 설정
const ZERO_G_STORAGE_API = process.env.NEXT_PUBLIC_ZEROG_STORAGE_API;
const ZERO_G_STORAGE_KEY = process.env.ZERO_G_STORAGE_KEY;

/**
 * 0G Storage에 데이터 업로드
 */
export async function uploadToZeroGStorage(
  data: Buffer | object,
  metadata?: object
): Promise<ZeroGStorageResponse> {
  try {
    if (!process.env.NEXT_PUBLIC_ZEROG_STORAGE_API) {
      throw new Error('Missing 0G Storage API endpoint');
    }

    const formData = new FormData();
    
    if (data instanceof Buffer) {
      formData.append('file', new Blob([data]));
    } else {
      formData.append('data', JSON.stringify(data));
    }
    
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    const response = await axios.post(
      process.env.NEXT_PUBLIC_ZEROG_STORAGE_API,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return {
      success: true,
      storageId: response.data.storageId,
      metadataUri: response.data.metadataUri
    };
  } catch (error) {
    console.error('Error uploading to 0G Storage:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * JSON 데이터를 0G Storage에 업로드
 */
export async function uploadJsonToZeroGStorage(
  data: object,
  metadata?: object
): Promise<ZeroGStorageResponse> {
  return uploadToZeroGStorage(data, metadata);
}

/**
 * 보안 점수 계산
 * 
 * TODO: 실제 구현 필요
 * 1. 취약점 심각도 가중치 조정
 * 2. 추가 보안 메트릭 통합
 * 3. 점수 계산 알고리즘 최적화
 */
export function calculateSecurityScore(analysisResult: AnalysisResult): number {
  if (!analysisResult || !analysisResult.analysis) {
    return 50;
  }
  
  const severityCounts = analysisResult.analysis.severity_counts || {};
  
  // TODO: 가중치 조정 필요
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