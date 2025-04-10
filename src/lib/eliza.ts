import { SecurityAnalysisResult, SecurityVulnerability } from '@/types';

export async function analyzeCode(base64Zip: string): Promise<SecurityAnalysisResult> {
  try {
    // ElizaOS CLI를 통한 분석
    const response = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ELIZA_OS_API_KEY}`,
      },
      body: JSON.stringify({
        codeZip: base64Zip,
      }),
    });

    if (!response.ok) {
      throw new Error(`ElizaOS API 에러: ${response.statusText}`);
    }

    const result = await response.json();

    // 결과 포맷팅
    return {
      securityScore: result.securityScore,
      vulnerabilities: result.vulnerabilities.map((v: any) => ({
        severity: v.severity,
        description: v.description,
        location: v.location,
      })),
      recommendations: result.recommendations,
    };

  } catch (error) {
    console.error('코드 분석 에러:', error);
    throw new Error(`코드 분석 실패: ${error instanceof Error ? error.message : '알 수 없는 에러'}`);
  }
} 