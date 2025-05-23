# 데이터 구조 가이드

## 1. 코드 분석 결과

### 1.1 임시 데이터 예시
```json
{
  "vulnerabilities": [
    {
      "type": "external_communication",
      "severity": "high",
      "line": 42,
      "description": "의심스러운 외부 통신 패턴 감지: fetch('http://malicious.com')"
    },
    {
      "type": "wallet_draining",
      "severity": "critical",
      "line": 87,
      "description": "지갑 주소 탈취 시도 감지: privateKey = '0x123...'"
    },
    {
      "type": "unauthorized_abi_call",
      "severity": "high",
      "line": 156,
      "description": "무단 ABI 호출 감지: contract.call('transfer')"
    }
  ],
  "suggestions": [
    "외부 통신은 신뢰할 수 있는 도메인으로만 제한하세요.",
    "민감한 정보는 절대 코드에 하드코딩하지 마세요.",
    "모든 ABI 호출은 적절한 권한 검사를 수행하세요."
  ],
  "score": 75
}
```

### 1.2 실제 데이터 구조
```typescript
interface Vulnerability {
  type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  line: number;
  code: string;
}

interface AnalysisResult {
  vulnerabilities: Vulnerability[];
  suggestions: string[];
  securityScore: number;
}
```

## 2. NFT 메타데이터

### 2.1 임시 데이터 예시
```json
{
  "name": "보안 코드 NFT",
  "description": "암호화된 코드와 분석 결과를 포함한 NFT",
  "image": "ipfs://Qm...",
  "attributes": [
    { "trait_type": "보안 점수", "value": "85" },
    { "trait_type": "취약점 수", "value": "3" }
  ]
}
```

### 2.2 실제 데이터 구조
```typescript
interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    securityScore: number;
    analysisDate: string;
    storageUri: string;
    teeAttestation: string;
  };
}
```

## 3. 평판 분석 결과

### 3.1 임시 데이터 예시
```json
{
  "repository": {
    "name": "보안 코드 저장소",
    "full_name": "보안 코드 저장소",
    "description": "보안 코드와 관련된 저장소"
  },
  "metrics": {
    "stars": 100,
    "forks": 50,
    "watchers": 200,
    "open_issues": 10,
    "contributors": 50,
    "created_at": "2023-01-01",
    "updated_at": "2023-01-01"
  },
  "trust_score": {
    "score": 85,
    "grade": "A",
    "details": {
      "baseScore": 85,
      "starScore": 10,
      "forkScore": 10,
      "contributorScore": 10,
      "issuePenalty": 0
    }
  }
}
```

### 3.2 실제 데이터 구조
```typescript
interface RepositoryMetrics {
  stars: number;
  forks: number;
  watchers: number;
  open_issues: number;
  contributors: number;
  created_at: string;
  updated_at: string;
}

interface TrustScore {
  score: number;
  grade: string;
  details: {
    baseScore: number;
    starScore: number;
    forkScore: number;
    contributorScore: number;
    issuePenalty: number;
  };
}

interface ReputationResult {
  repository: {
    name: string;
    full_name: string;
    description: string;
  };
  metrics: RepositoryMetrics;
  trust_score: TrustScore;
}
```

## 4. 실제 구현 시 필요한 데이터

### 4.1 코드 분석
```typescript
// 분석 요청 데이터
interface AnalysisRequest {
  code: string;          // 분석할 코드
  fileType: string;      // 파일 확장자 (.sol, .js, .ts)
}

// 분석 결과 데이터
interface AnalysisResponse {
  vulnerabilities: {
    type: string;        // 취약점 유형
    severity: string;    // 심각도
    line: number;        // 라인 번호
    description: string; // 설명
  }[];
  suggestions: string[]; // 개선 제안
  score: number;         // 보안 점수 (0-100)
}
```

### 4.2 NFT 민팅
```typescript
// 민팅 요청 데이터
interface MintRequest {
  storageUri: string;
  metadata: NFTMetadata;
}

// 민팅 결과 데이터
interface MintResponse {
  success: boolean;          // 성공 여부
  token_id: string;          // 토큰 ID
  tx_hash: string;          // 트랜잭션 해시
  block_number: number;      // 블록 번호
}
```

### 4.3 평판 분석 요청
```typescript
interface ReputationRequest {
  repoUrl: string;
}
```

## 5. 데이터 유효성 검사

### 5.1 필수 필드
- 코드 분석: `code`, `fileType`
- NFT 민팅: `storageUri`, `metadata`
- 평판 분석: `repoUrl`

### 5.2 데이터 형식
- 지갑 주소: 0x로 시작하는 42자리 16진수
- 파일 확장자: .sol, .js, .ts 중 하나
- 체인 유형: 0g-testnet, 0g-mainnet 중 하나

## 6. 오류 처리

### 6.1 일반적인 오류
```json
{
  "error": "INVALID_INPUT",
  "message": "잘못된 입력 형식입니다.",
  "details": {
    "field": "wallet_address",
    "reason": "올바른 지갑 주소 형식이 아닙니다."
  }
}
```

### 6.2 네트워크 오류
```json
{
  "error": "NETWORK_ERROR",
  "message": "네트워크 연결에 실패했습니다.",
  "details": {
    "code": "ECONNREFUSED",
    "url": "http://localhost:8000/analyze"
  }
}
```

### 6.3 평판 분석 오류
```json
{
  "error": "Repository analysis failed",
  "code": "REPO_ANALYSIS_ERROR",
  "details": "Invalid repository URL"
}
``` 