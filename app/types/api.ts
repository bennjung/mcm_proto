/**
 * 분석 요청 데이터 타입
 */
export interface AnalyzeRequest {
  /** GitHub 저장소 URL */
  repoUrl: string;
  /** 사용자 지갑 주소 */
  walletAddress: string;
}

/**
 * 분석 결과 데이터 타입
 */
export interface AnalyzeResponse {
  /** 분석 성공 여부 */
  success: boolean;
  /** 분석 결과 메시지 */
  message: string;
  /** NFT 토큰 ID (성공 시) */
  tokenId?: string;
  /** 0G Storage 해시 (성공 시) */
  storageHash?: string;
  /** 에러 메시지 (실패 시) */
  error?: string;
}

/**
 * ELIZA 분석 결과 타입
 */
export interface ElizaAnalysisResult {
  /** 보안 점수 (0-100) */
  securityScore: number;
  /** 발견된 취약점 목록 */
  vulnerabilities: Vulnerability[];
  /** 보안 개선 제안 사항 */
  recommendations: string[];
}

export interface Vulnerability {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  filePath: string;
  lineNumber: number;
} 