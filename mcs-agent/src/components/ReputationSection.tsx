import { useState } from 'react';
import axios from 'axios';

interface ReputationSectionProps {
  repoUrl: string;
}

export default function ReputationSection({ repoUrl }: ReputationSectionProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);

  const analyzeRepoMetrics = async () => {
    if (!repoUrl) {
      setError('Repository URL is required');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/reputation/analyze', { repoUrl });
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to analyze repository metrics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 신뢰도 점수에 따른 색상 결정
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-green-400';
    if (score >= 40) return 'text-yellow-500';
    if (score >= 20) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">GitHub 평판 분석</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <p className="mb-2">
          <strong>Repository URL:</strong> {repoUrl || 'No repository selected'}
        </p>
        
        <button
          onClick={analyzeRepoMetrics}
          disabled={loading || !repoUrl}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {loading ? '분석 중...' : '저장소 평판 분석'}
        </button>
      </div>
      
      {result && (
        <div className="mt-4">
          <div className="p-4 bg-gray-50 rounded-md mb-4">
            <h3 className="font-medium mb-2">저장소 정보:</h3>
            <p><strong>이름:</strong> {result.repository.full_name}</p>
            <p><strong>설명:</strong> {result.repository.description || '설명 없음'}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md mb-4">
            <h3 className="font-medium mb-2">메트릭:</h3>
            <div className="grid grid-cols-2 gap-2">
              <p><strong>⭐ 스타:</strong> {result.metrics.stars}</p>
              <p><strong>🍴 포크:</strong> {result.metrics.forks}</p>
              <p><strong>👁️ 워쳐:</strong> {result.metrics.watchers}</p>
              <p><strong>🧑‍💻 기여자:</strong> {result.metrics.contributors}</p>
              <p><strong>❗ 미해결 이슈:</strong> {result.metrics.open_issues}</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium mb-2">신뢰도 점수:</h3>
            <div className="flex items-center mb-2">
              <div className={`text-3xl font-bold mr-3 ${getScoreColor(result.trust_score.score)}`}>
                {result.trust_score.score}/100
              </div>
              <div className={`text-xl font-semibold ${getScoreColor(result.trust_score.score)}`}>
                {result.trust_score.grade}
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="font-medium mb-1">점수 세부 정보:</h4>
              <ul className="list-disc pl-5">
                <li>기본 점수: {result.trust_score.details.baseScore}</li>
                <li>스타 점수: +{result.trust_score.details.starScore}</li>
                <li>포크 점수: +{result.trust_score.details.forkScore}</li>
                <li>기여자 점수: +{result.trust_score.details.contributorScore}</li>
                <li>이슈 패널티: -{result.trust_score.details.issuePenalty}</li>
              </ul>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded border border-blue-200">
              <p className="text-sm">
                <strong>해석:</strong> 이 저장소는 {result.trust_score.grade.split('-')[1].trim()}입니다. 
                {result.trust_score.score >= 60 
                  ? '비교적 안전하게 사용할 수 있습니다.' 
                  : '사용 전 추가적인 검토가 필요합니다.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 