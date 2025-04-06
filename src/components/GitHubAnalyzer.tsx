'use client'

import { useState } from 'react'

export function GitHubAnalyzer() {
  const [githubUrl, setGithubUrl] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState('')
  const [ogReportLink, setOgReportLink] = useState('')
  const [nftResult, setNftResult] = useState('')

  const handleAnalyze = async () => {
    setIsLoading(true)
    try {
      // TODO: API 호출 구현
      setTimeout(() => {
        setAnalysisResult('분석 결과가 여기에 표시됩니다.')
        setOgReportLink('https://0g-report.example.com/123')
        setNftResult('NFT 결과가 여기에 표시됩니다.')
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error('분석 중 오류 발생:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">GitHub URL</label>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="https://github.com/username/repository"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Wallet Address</label>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="0x..."
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>
        <button
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
          onClick={handleAnalyze}
          disabled={!githubUrl || !walletAddress || isLoading}
        >
          {isLoading ? '분석 중...' : '분석 요청'}
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
        </div>
      ) : analysisResult ? (
        <div className="rounded-lg border border-gray-200 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">분석 결과</h3>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2"
                rows={4}
                value={analysisResult}
                readOnly
              />
            </div>
            {ogReportLink && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">0G 리포트</h3>
                <a
                  href={ogReportLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {ogReportLink}
                </a>
              </div>
            )}
            {nftResult && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">NFT 결과</h3>
                <p>{nftResult}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
} 