export const generateNFTMetadata = (analysisResult: any) => {
  const tokenId = `SEC-${Date.now()}`;
  const txHash = `0x${Math.random().toString(16).slice(2)}`;

  // 보안 등급 계산
  const getSecurityGrade = (score: number): string => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C+';
    if (score >= 40) return 'C';
    if (score >= 30) return 'D';
    return 'F';
  };

  // 배지 색상 결정
  const getColorByGrade = (grade: string): string => {
    const colors: Record<string, string> = {
      'A+': '#4CAF50',
      'A': '#8BC34A',
      'B+': '#FFC107',
      'B': '#FF9800',
      'C+': '#FF5722',
      'C': '#F44336',
      'D': '#9E9E9E',
      'F': '#607D8B'
    };
    return colors[grade as keyof typeof colors] || 'gray';
  };

  const grade = getSecurityGrade(analysisResult.securityScore);
  const badgeColor = getColorByGrade(grade);

  return {
    tokenId,
    txHash,
    metadata: {
      name: `Code Security Analysis #${tokenId}`,
      description: `Security analysis result for ${analysisResult.repoUrl}`,
      image: `https://img.shields.io/badge/Security-${grade}${analysisResult.securityScore}-${badgeColor}`,
      external_url: `https://github.com/${analysisResult.repoUrl}`,
      attributes: [
        {
          trait_type: 'Security Score',
          value: analysisResult.securityScore
        },
        {
          trait_type: 'Security Grade',
          value: grade
        },
        {
          trait_type: 'High Severity Issues',
          value: analysisResult.vulnerabilities.filter((v: { severity: string }) => v.severity === 'HIGH').length
        },
        {
          trait_type: 'Medium Severity Issues',
          value: analysisResult.vulnerabilities.filter((v: { severity: string }) => v.severity === 'MEDIUM').length
        },
        {
          trait_type: 'Low Severity Issues',
          value: analysisResult.vulnerabilities.filter((v: { severity: string }) => v.severity === 'LOW').length
        },
        {
          trait_type: 'Analysis Date',
          value: new Date(analysisResult.timestamp).toLocaleDateString()
        }
      ]
    }
  };
}; 