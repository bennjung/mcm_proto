import axios from 'axios';
import { analyzeRepository } from './analyzer';

/**
 * GitHub 저장소 코드 분석
 * @param repoUrl GitHub 저장소 URL
 * @returns 분석 결과
 */
export async function analyzeCode(repoUrl: string) {
  try {
    // GitHub API를 통해 저장소 정보 가져오기
    const repoInfo = await getRepoInfo(repoUrl);
    
    // 코드 분석 수행
    const analysisResult = await analyzeRepository(repoInfo.localPath);
    
    return {
      repoInfo,
      analysis: analysisResult,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error analyzing code:', error);
    throw error;
  }
}

async function getRepoInfo(repoUrl: string) {
  // GitHub URL 파싱
  const [owner, repo] = repoUrl.split('/').slice(-2);
  
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        }
      }
    );
    
    return {
      owner,
      repo,
      description: response.data.description,
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      localPath: `/tmp/${owner}/${repo}`,
      created_at: response.data.created_at,
      updated_at: response.data.updated_at
    };
  } catch (error) {
    console.error('Error fetching repo info:', error);
    throw error;
  }
} 