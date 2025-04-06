'use client'

import React, { useState } from 'react'

const GitHubAnalyzer: React.FC = () => {
  const [githubUrl, setGithubUrl] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState('')
  const [links, setLinks] = useState({
    report: '',
    nft: ''
  })

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      // 분석 스크립트 실행
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          githubUrl,
          walletAddress
        }),
      })
      
      const data = await response.json()
      setAnalysisResult(data.result)
      setLinks({
        report: data.reportUrl,
        nft: data.nftUrl
      })
    } catch (error) {
      console.error('분석 중 오류 발생:', error)
      setAnalysisResult('분석 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="https://github.com/username/repo"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">지갑 주소</label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="0x..."
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !githubUrl || !walletAddress}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? '분석 중...' : '분석 요청'}
        </button>

        {loading && (
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
          </div>
        )}

        {analysisResult && !loading && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">분석 결과</h3>
            <p className="mt-2 text-gray-600 whitespace-pre-wrap">{analysisResult}</p>
            
            <div className="mt-4 space-x-4">
              {links.report && (
                <a
                  href={links.report}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  0G 리포트 보기
                </a>
              )}
              {links.nft && (
                <a
                  href={links.nft}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  NFT 결과 보기
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GitHubAnalyzer 