export interface AnalysisResult {
  securityScore: number;
  vulnerabilities: Array<{
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    description: string;
    filePath: string;
    lineNumber: number;
  }>;
  recommendations: string[];
}

export class ElizaService {
  async analyze(codePath: string): Promise<AnalysisResult> {
    // TODO: 실제 분석 로직 구현
    return {
      securityScore: 85,
      vulnerabilities: [],
      recommendations: [
        'Implementation pending',
        'This is a placeholder response'
      ]
    };
  }
} 