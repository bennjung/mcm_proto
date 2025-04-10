export const mockAnalysisResult = {
  repoUrl: "https://github.com/example/repo",
  timestamp: new Date().toISOString(),
  securityScore: 85,
  vulnerabilities: [
    {
      severity: "high",
      description: "취약한 의존성 패키지 발견",
      filePath: "package.json",
      line: 15,
      recommendation: "lodash 패키지를 최신 버전으로 업데이트하세요"
    },
    {
      severity: "medium",
      description: "안전하지 않은 암호화 방식 사용",
      filePath: "src/utils/crypto.js",
      line: 23,
      recommendation: "MD5 대신 SHA-256을 사용하세요"
    },
    {
      severity: "low",
      description: "console.log 문 발견",
      filePath: "src/components/Main.js",
      line: 45,
      recommendation: "프로덕션 환경에서는 로그를 제거하세요"
    }
  ],
  recommendations: [
    "정기적인 의존성 패키지 업데이트를 수행하세요",
    "보안 취약점 스캔을 CI/CD 파이프라인에 통합하세요",
    "민감한 정보는 환경 변수로 관리하세요"
  ],
  nftMetadata: {
    tokenId: "1234",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    name: "Security Audit Badge #1234",
    image: "https://example.com/nft/1234.png",
    attributes: [
      {
        trait_type: "Security Score",
        value: 85
      },
      {
        trait_type: "Audit Date",
        value: new Date().toISOString().split('T')[0]
      },
      {
        trait_type: "Risk Level",
        value: "Medium"
      }
    ]
  }
}; 