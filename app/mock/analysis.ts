export const mockVulnerabilities = {
  high: [
    {
      severity: 'HIGH',
      description: 'Hardcoded API keys found in configuration files',
      filePath: 'src/config/keys.js',
      lineNumber: 12,
      recommendation: 'Move sensitive data to environment variables'
    },
    {
      severity: 'HIGH',
      description: 'Unsafe eval() usage detected',
      filePath: 'src/utils/parser.js',
      lineNumber: 45,
      recommendation: 'Use safer alternatives like Function constructor or JSON.parse'
    }
  ],
  medium: [
    {
      severity: 'MEDIUM',
      description: 'Insecure random number generation',
      filePath: 'src/utils/random.js',
      lineNumber: 23,
      recommendation: 'Use crypto.getRandomValues() for cryptographic operations'
    },
    {
      severity: 'MEDIUM',
      description: 'Unvalidated file uploads',
      filePath: 'src/controllers/upload.js',
      lineNumber: 67,
      recommendation: 'Implement proper file type validation and size limits'
    }
  ],
  low: [
    {
      severity: 'LOW',
      description: 'Console logging in production code',
      filePath: 'src/services/api.js',
      lineNumber: 89,
      recommendation: 'Remove or disable console logs in production'
    }
  ]
};

export const generateAnalysisResult = (repoUrl: string) => {
  const timestamp = new Date().toISOString();
  const allVulnerabilities = [
    ...mockVulnerabilities.high,
    ...mockVulnerabilities.medium,
    ...mockVulnerabilities.low
  ];

  // 랜덤하게 취약점 선택
  const selectedVulnerabilities = allVulnerabilities
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 4) + 2);

  // 보안 점수 계산 (60-95 사이)
  const securityScore = Math.floor(Math.random() * 36) + 60;

  return {
    repoUrl,
    timestamp,
    securityScore,
    vulnerabilities: selectedVulnerabilities,
    recommendations: [
      'Implement secure coding practices',
      'Regular security audits',
      'Use dependency scanning',
      'Implement proper error handling'
    ].sort(() => Math.random() - 0.5).slice(0, 3)
  };
}; 