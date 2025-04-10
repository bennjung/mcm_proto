import { join } from 'path';
import { mkdir, writeFile } from 'fs/promises';

/**
 * GitHub 저장소 관련 서비스 (로컬 모의 구현)
 */
export class GitHubService {
  private tempDir: string;

  constructor() {
    this.tempDir = join(process.cwd(), 'temp');
  }

  /**
   * GitHub 저장소 URL에서 소유자와 저장소 이름을 추출
   */
  private parseRepoUrl(url: string): [string, string] {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      throw new Error('Invalid GitHub repository URL');
    }
    return [match[1], match[2]];
  }

  /**
   * 로컬 테스트용 모의 코드 생성
   */
  private async createMockCode(owner: string, repo: string, codePath: string) {
    const mockFiles = {
      'index.js': `
        function add(a, b) {
          return a + b;
        }
        
        // 보안 취약점: 입력값 검증 없음
        function processUserInput(input) {
          eval(input);
        }
      `,
      'config.js': `
        // 보안 취약점: 하드코딩된 비밀키
        const API_KEY = 'secret123';
        
        module.exports = {
          apiKey: API_KEY
        };
      `
    };

    await mkdir(codePath, { recursive: true });

    for (const [filename, content] of Object.entries(mockFiles)) {
      await writeFile(join(codePath, filename), content);
    }
  }

  async downloadAndExtract(repoUrl: string) {
    const [owner, repo] = this.parseRepoUrl(repoUrl);
    const codePath = join(this.tempDir, `${owner}-${repo}`);

    // 모의 코드 생성
    await this.createMockCode(owner, repo, codePath);

    // 정리 함수
    const cleanup = async () => {
      // 실제 구현에서는 임시 파일 삭제
      console.log('Cleanup called for:', codePath);
    };

    return { codePath, cleanup };
  }
} 