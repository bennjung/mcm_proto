export function generateNFTMetadata(analysisResult: any) {
  const tokenId = `SEC-${Date.now()}`;
  const txHash = `0x${Math.random().toString(16).slice(2)}`;

  return {
    tokenId,
    txHash,
    metadata: {
      name: `Code Security Analysis #${tokenId}`,
      description: 'Security analysis result for repository',
      image: `https://img.shields.io/badge/Security-${analysisResult.securityScore}-brightgreen`,
      attributes: [
        {
          trait_type: 'Security Score',
          value: analysisResult.securityScore
        },
        {
          trait_type: 'High Severity Issues',
          value: analysisResult.vulnerabilities.filter((v: any) => v.severity === 'HIGH').length
        },
        {
          trait_type: 'Medium Severity Issues',
          value: analysisResult.vulnerabilities.filter((v: any) => v.severity === 'MEDIUM').length
        },
        {
          trait_type: 'Low Severity Issues',
          value: analysisResult.vulnerabilities.filter((v: any) => v.severity === 'LOW').length
        }
      ]
    }
  };
} 