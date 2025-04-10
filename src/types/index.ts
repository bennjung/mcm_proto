export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    securityScore: number;
    vulnerabilitiesCount: number;
    analysisDate: string;
    repoUrl: string;
  };
}

export interface SecurityVulnerability {
  severity: 'high' | 'medium' | 'low';
  description: string;
  location: string;
}

export interface SecurityAnalysisResult {
  securityScore: number;
  vulnerabilities: SecurityVulnerability[];
  recommendations: string[];
}

export interface AnalysisRequest {
  repoUrl: string;
  walletAddress: string;
} 