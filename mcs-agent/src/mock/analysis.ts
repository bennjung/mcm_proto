export function generateAnalysisResult() {
  return {
    securityScore: 85,
    vulnerabilities: [
      {
        severity: 'HIGH',
        description: 'Sample high severity issue',
        filePath: 'src/example.js',
        lineNumber: 42
      },
      {
        severity: 'MEDIUM',
        description: 'Sample medium severity issue',
        filePath: 'src/test.js',
        lineNumber: 23
      }
    ],
    recommendations: [
      'Fix high severity vulnerabilities',
      'Review security best practices',
      'Update dependencies'
    ]
  };
}

export const mockAnalysisResult = {
  success: true,
  securityScore: 85,
  vulnerabilities: [
    {
      severity: 'HIGH',
      description: 'Sample vulnerability',
      filePath: 'src/example.js',
      lineNumber: 42
    }
  ],
  recommendations: ['Sample recommendation'],
  storageHash: 'mock_hash_123',
  tokenId: 'mock_token_123'
}; 