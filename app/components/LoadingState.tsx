'use client';

import React from 'react';

const steps = [
  '저장소 다운로드 중...',
  '코드 분석 중...',
  '취약점 스캔 중...',
  'NFT 메타데이터 생성 중...',
  '분석 결과 저장 중...'
];

export default function LoadingState() {
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <div className="text-lg font-medium text-gray-700">{steps[currentStep]}</div>
      <div className="w-64 h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
} 