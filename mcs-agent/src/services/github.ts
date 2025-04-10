import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

export class GitHubService {
  private tempDir: string;

  constructor() {
    this.tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  /**
   * GitHub 저장소를 클론합니다.
   * @param repoUrl 저장소 URL
   * @returns 클론 결과
   */
  async cloneRepo(repoUrl: string) {
    try {
      const folderName = `repo_${Date.now()}`;
      const repoPath = path.join(this.tempDir, folderName);

      await execAsync(`git clone ${repoUrl} ${repoPath}`);

      return {
        success: true,
        path: repoPath,
        folderName
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * 저장소의 파일 목록을 가져옵니다.
   * @param repoPath 저장소 경로
   * @param extensions 파일 확장자 목록
   * @returns 파일 목록
   */
  async getRepoFiles(repoPath: string, extensions: string[] = ['.sol', '.js', '.ts']) {
    try {
      const files: string[] = [];
      const walkDir = (dir: string) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            walkDir(fullPath);
          } else if (extensions.includes(path.extname(entry.name))) {
            files.push(fullPath);
          }
        }
      };

      walkDir(repoPath);
      return {
        success: true,
        files
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
} 