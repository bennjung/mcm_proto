import axios from 'axios';

export interface SecurityAnalysisResult {
  securityScore: number;
  vulnerabilities: {
    severity: 'high' | 'medium' | 'low';
    description: string;
    location: string;
  }[];
  recommendations: string[];
}

interface SecurityAnalyzer {
  analyzeCode(base64Zip: string): Promise<SecurityAnalysisResult>;
}

// 실제 API 구현
class ElizaAPIAnalyzer implements SecurityAnalyzer {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.apiUrl = process.env.ELIZA_OS_API_URL || 'https://api.elizaos.dev/v1/analyze';
    this.apiKey = process.env.ELIZA_OS_API_KEY || '';
  }

  async analyzeCode(base64Zip: string): Promise<SecurityAnalysisResult> {
    const res = await axios.post(this.apiUrl, {
      codeZip: base64Zip,
    }, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });

    return res.data;
  }
}

// Mock API 구현
class MockAnalyzer implements SecurityAnalyzer {
  async analyzeCode(base64Zip: string): Promise<SecurityAnalysisResult> {
    // 실제 분석 없이 더미 데이터 반환
    return {
      securityScore: 85,
      vulnerabilities: [
        {
          severity: 'high',
          description: '안전하지 않은 의존성이 발견되었습니다',
          location: 'package.json'
        },
        {
          severity: 'medium',
          description: '잠재적인 메모리 누수가 발견되었습니다',
          location: 'src/components/App.tsx:42'
        },
        {
          severity: 'low',
          description: '사용되지 않는 변수가 발견되었습니다',
          location: 'src/utils/helpers.ts:15'
        }
      ],
      recommendations: [
        '의존성 패키지를 최신 버전으로 업데이트하세요',
        '메모리 관리를 위해 useEffect cleanup 함수를 사용하세요',
        '사용되지 않는 변수를 제거하거나 활용하세요',
        'TypeScript strict 모드를 활성화하세요'
      ]
    };
  }
}

// 환경에 따라 적절한 구현체 선택
const analyzer: SecurityAnalyzer = process.env.NODE_ENV === 'production' 
  ? new ElizaAPIAnalyzer()
  : new MockAnalyzer();

// 외부에서 사용할 함수
export async function analyzeCode(base64Zip: string): Promise<SecurityAnalysisResult> {
  return analyzer.analyzeCode(base64Zip);
} 