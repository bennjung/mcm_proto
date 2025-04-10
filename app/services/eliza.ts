import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { ElizaAnalysisResult } from '../types/api';

/**
 * ELIZA OS Agent 분석 서비스 (로컬 모의 구현)
 */
export class ElizaService {
  async analyze(codePath: string): Promise<ElizaAnalysisResult> {
    try {
      // 모든 JS 파일 읽기
      const files = await readdir(codePath);
      const jsFiles = files.filter(f => f.endsWith('.js'));

      interface Vulnerability {
        severity: 'HIGH' | 'MEDIUM' | 'LOW';
        description: string;
        filePath: string;
        lineNumber: number;
      }

      const vulnerabilities: Vulnerability[] = [];
      let securityScore = 100;

      // 각 파일 분석
      for (const file of jsFiles) {
        const content = await readFile(join(codePath, file), 'utf-8');
        const lines = content.split('\n');

        // 취약점 탐지 (모의 구현)
        lines.forEach((line, index) => {
          // eval() 사용 탐지
          if (line.includes('eval(')) {
            vulnerabilities.push({
              severity: 'HIGH',
              description: 'Dangerous use of eval() detected',
              filePath: file,
              lineNumber: index + 1
            });
            securityScore -= 30;
          }

          // 하드코딩된 비밀키 탐지
          if (line.match(/(?:API_KEY|SECRET|PASSWORD)\s*=\s*['"][^'"]+['"]/)) {
            vulnerabilities.push({
              severity: 'MEDIUM',
              description: 'Hardcoded credentials detected',
              filePath: file,
              lineNumber: index + 1
            });
            securityScore -= 20;
          }
        });
      }

      // 최소 점수는 0
      securityScore = Math.max(0, securityScore);

      return {
        securityScore,
        vulnerabilities,
        recommendations: [
          'Replace eval() with safer alternatives',
          'Use environment variables for sensitive data',
          'Implement input validation'
        ]
      };
    } catch (error) {
      console.error('분석 오류:', error);
      throw new Error('코드 분석 중 오류가 발생했습니다.');
    }
  }
} 