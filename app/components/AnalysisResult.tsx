'use client';

import React from 'react';
import Image from 'next/image';

interface Vulnerability {
  severity: 'high' | 'medium' | 'low';
  description: string;
  filePath: string;
  line: number;
  recommendation: string;
}

interface AnalysisResultProps {
  repoUrl: string;
  timestamp: string;
  securityScore: number;
  vulnerabilities: Vulnerability[];
  recommendations: string[];
  nftMetadata: {
    tokenId: string;
    txHash: string;
    name: string;
    image: string;
    attributes: {
      trait_type: string;
      value: string | number;
    }[];
  };
}

const severityColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
};

export default function AnalysisResult({ 
  repoUrl, 
  timestamp, 
  securityScore, 
  vulnerabilities, 
  recommendations,
  nftMetadata 
}: AnalysisResultProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">분석 결과</h2>
            <p className="text-gray-600">{repoUrl}</p>
            <p className="text-sm text-gray-500">{new Date(timestamp).toLocaleString()}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{securityScore}</div>
            <div className="text-sm text-gray-500">보안 점수</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">발견된 취약점</h3>
        <div className="space-y-4">
          {vulnerabilities.map((vuln, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border ${severityColors[vuln.severity]}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold">{vuln.description}</span>
                <span className="px-2 py-1 rounded text-sm capitalize">
                  {vuln.severity} 위험도
                </span>
              </div>
              <p className="text-sm mb-2">
                위치: {vuln.filePath}:{vuln.line}
              </p>
              <p className="text-sm">
                추천: {vuln.recommendation}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">보안 개선 권장사항</h3>
        <ul className="list-disc pl-5 space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-gray-700">{rec}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">NFT 배지</h3>
        <div className="flex items-start space-x-6">
          <div className="w-48 h-48 relative">
            <Image
              src={nftMetadata.image}
              alt="Security NFT Badge"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold mb-2">{nftMetadata.name}</h4>
            <p className="text-sm text-gray-600 mb-4">Token ID: {nftMetadata.tokenId}</p>
            <div className="grid grid-cols-2 gap-4">
              {nftMetadata.attributes.map((attr, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded">
                  <div className="text-sm text-gray-500">{attr.trait_type}</div>
                  <div className="font-medium">{attr.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 