import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { ElizaAnalysisResult } from '../types/api';

/**
 * NFT 서비스 (로컬 모의 구현)
 */
export class NFTService {
  private nftDir: string;
  private tokenCounter: number;

  constructor() {
    this.nftDir = join(process.cwd(), 'nfts');
    this.tokenCounter = 0;
  }

  async mintNFT(walletAddress: string, storageHash: string, analysisResult: ElizaAnalysisResult) {
    try {
      // NFT 저장 디렉토리 생성
      await mkdir(this.nftDir, { recursive: true });

      // 토큰 ID 생성
      const tokenId = `${++this.tokenCounter}`;
      const txHash = `0x${Date.now().toString(16)}`;

      // NFT 메타데이터 생성
      const metadata = {
        name: `Code Analysis NFT #${tokenId}`,
        description: 'Security analysis result of a code repository',
        image: this.generateBadgeImage(analysisResult.securityScore),
        attributes: [
          {
            trait_type: 'Security Score',
            value: analysisResult.securityScore
          },
          {
            trait_type: 'High Severity Issues',
            value: analysisResult.vulnerabilities.filter(v => v.severity === 'HIGH').length
          },
          {
            trait_type: 'Medium Severity Issues',
            value: analysisResult.vulnerabilities.filter(v => v.severity === 'MEDIUM').length
          },
          {
            trait_type: 'Low Severity Issues',
            value: analysisResult.vulnerabilities.filter(v => v.severity === 'LOW').length
          }
        ],
        properties: {
          storageHash,
          walletAddress,
          timestamp: new Date().toISOString()
        }
      };

      // 메타데이터 저장
      const metadataPath = join(this.nftDir, `${tokenId}.json`);
      await writeFile(metadataPath, JSON.stringify(metadata, null, 2));

      return {
        tokenId,
        txHash
      };
    } catch (error) {
      console.error('NFT 민팅 오류:', error);
      throw new Error('NFT 민팅 중 오류가 발생했습니다.');
    }
  }

  private generateBadgeImage(score: number): string {
    const grade = score >= 90 ? 'A' :
                 score >= 80 ? 'B' :
                 score >= 70 ? 'C' :
                 score >= 60 ? 'D' : 'F';
                 
    return `https://img.shields.io/badge/Security-${grade}${score}-${this.getBadgeColor(grade)}`;
  }

  private getBadgeColor(grade: 'A' | 'B' | 'C' | 'D' | 'F'): string {
    const colors = {
      'A': 'brightgreen',
      'B': 'green',
      'C': 'yellow',
      'D': 'orange',
      'F': 'red'
    } as const;
    return colors[grade] || 'gray';
  }
} 