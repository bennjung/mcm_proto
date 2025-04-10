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