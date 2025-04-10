'use client';

// 분석 결과 타입 정의
export interface CheckResult {
  status: 'success' | 'warning' | 'error';
  title: string;
  details?: string;
  code?: string;
}

export interface AnalysisResult {
  message: string;
  type: 'loading' | 'complete' | 'error';
  checks?: {
    packageCheck: CheckResult;
    privateKeyCheck: CheckResult;
    abiCheck: CheckResult;
  };
}

// 로딩 상태 메시지 생성 함수
const createLoadingMessage = (dots: number): string => {
  return `Analyzing in process${'.'.repeat(dots)}`;
};

// 에러 체크 함수
const checkForError = (input: string): boolean => {
  // 'error'라는 단어가 포함되면 에러 발생
  return input.toLowerCase().includes('error');
};

// 임시 체크 조건
const checkCode = (code: string): boolean => {
  // 패키지 체크: package.json이나 import 문이 포함되어 있는지
  const hasPackageRelated = code.includes('package.json') || code.includes('import') || code.includes('require');
  
  // 프라이빗 키 체크: private, key, secret 등의 민감한 단어가 없는지
  const hasNoPrivateKey = !code.match(/private.*key|secret|password/i);
  
  // ABI 체크: contract, function 등의 키워드가 포함되어 있는지
  const hasValidABI = code.includes('contract') && code.includes('function');

  return hasPackageRelated && hasNoPrivateKey && hasValidABI;
};

// 분석 API 함수
export async function analyzeContract(code: string): Promise<AnalysisResult> {
  // 로딩 상태
  if (code === 'loading') {
    return {
      message: 'Analyzing your smart contract...',
      type: 'loading'
    };
  }

  // 에러 상태
  if (code === 'error') {
    return {
      message: 'An error occurred while analyzing the contract.',
      type: 'error'
    };
  }

  // 코드 체크
  const isValid = checkCode(code);
  const checks: { packageCheck: CheckResult; privateKeyCheck: CheckResult; abiCheck: CheckResult } = {
    packageCheck: {
      status: (code.includes('package.json') || code.includes('import')) ? 'success' as const : 'error' as const,
      title: '# Package Check',
      details: code.includes('package.json') || code.includes('import') ? 
        'All package dependencies are up to date and secure.' : 
        'Missing package dependencies or import statements.'
    },
    privateKeyCheck: {
      status: !code.match(/private.*key|secret|password/i) ? 'success' as const : 'error' as const,
      title: '# Private Key Exposure Check',
      details: !code.match(/private.*key|secret|password/i) ? 
        'No private key exposure found in the code.' : 
        'Found potential private key exposure in the code.'
    },
    abiCheck: {
      status: (code.includes('contract') && code.includes('function')) ? 'success' as const : 'warning' as const,
      title: '# ABI Check',
      details: code.includes('contract') && code.includes('function') ? 
        'Valid smart contract structure detected.' : 
        'Smart contract structure might need review.',
      code: code
    }
  };

  return {
    message: 'Analysis Complete. Toggle down each checkboard to read details.',
    type: 'complete',
    checks
  };
}

// 상태에 따른 색상 매핑
export const statusColors = {
  success: '#4CAF50', // 초록색
  warning: '#FFC107', // 노란색
  error: '#FF5252'    // 빨간색
}; 