import axios from 'axios';

interface RepositoryInfo {
  owner: string;
  repo: string;
  branch: string;
  cloneUrl: string;
}

export async function getRepositoryInfo(repoUrl: string): Promise<RepositoryInfo> {
  try {
    // GitHub URL 파싱 (예: https://github.com/owner/repo)
    const urlParts = new URL(repoUrl).pathname.split('/').filter(Boolean);
    const [owner, repo] = urlParts;

    if (!owner || !repo) {
      throw new Error('Invalid GitHub repository URL');
    }

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    return {
      owner,
      repo,
      branch: response.data.default_branch,
      cloneUrl: response.data.clone_url,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`GitHub API error: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
}

export async function downloadRepository(info: RepositoryInfo): Promise<Buffer> {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${info.owner}/${info.repo}/zipball/${info.branch}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
        responseType: 'arraybuffer',
      }
    );

    return Buffer.from(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to download repository: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
}

export async function downloadRepo(repoUrl: string): Promise<string> {
  const repoName = repoUrl.split('/').slice(-1)[0];
  const zipUrl = `${repoUrl}/archive/refs/heads/main.zip`;

  // GitHub 인증 필요 시 헤더에 token 삽입
  const response = await axios.get(zipUrl, { 
    responseType: 'arraybuffer',
    headers: {
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    }
  });

  // 서버에 저장하거나 ELIZA로 직접 넘김
  const buffer = Buffer.from(response.data);
  return buffer.toString('base64'); // base64로 변환해 ELIZA로 전달
} 