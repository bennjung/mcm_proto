export interface AnalyzeRequest {
  repoUrl: string;
  walletAddress: string;
}

export interface AnalyzeResponse {
  success: boolean;
  securityScore?: number;
  vulnerabilities?: Array<{
    severity: string;
    description: string;
    filePath: string;
    lineNumber: number;
  }>;
  recommendations?: string[];
  error?: string;
  storageHash?: string;
  tokenId?: string;
} 