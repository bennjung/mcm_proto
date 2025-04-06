'use client';

import { useState } from 'react';

export default function DemoPage() {
  const [step, setStep] = useState(1);
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">MCS Agent 데모</h1>
          
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">1. GitHub 저장소 분석</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    GitHub 저장소 URL
                  </label>
                  <input
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  분석 시작
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">2. 분석 결과</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">발견된 취약점</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>SQL 인젝션 취약점 (severity: high)</li>
                  <li>XSS 취약점 (severity: medium)</li>
                  <li>하드코딩된 비밀번호 (severity: low)</li>
                </ul>
              </div>
              <button
                onClick={() => setStep(3)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                다음 단계
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">3. 코드 암호화 및 저장</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>코드 암호화 완료</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>0G Storage에 저장 완료</span>
                </div>
              </div>
              <button
                onClick={() => setStep(4)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                다음 단계
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">4. NFT 민팅</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">NFT 메타데이터</h3>
                  <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                    {JSON.stringify({
                      name: "보안 코드 NFT",
                      description: "암호화된 코드와 분석 결과를 포함한 NFT",
                      image: "ipfs://Qm...",
                      attributes: [
                        { trait_type: "보안 점수", value: "85" },
                        { trait_type: "취약점 수", value: "3" }
                      ]
                    }, null, 2)}
                  </pre>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>NFT 민팅 완료</span>
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                처음으로
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 