import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { ElizaAnalysisResult } from '../types/api';

/**
 * Storage 서비스 (로컬 모의 구현)
 */
export class StorageService {
  private storageDir: string;

  constructor() {
    this.storageDir = join(process.cwd(), 'storage');
  }

  async saveAnalysis(analysisResult: ElizaAnalysisResult): Promise<string> {
    try {
      // 저장소 디렉토리 생성
      await mkdir(this.storageDir, { recursive: true });

      // 해시 생성 (모의 구현)
      const hash = `analysis_${Date.now()}`;
      const filePath = join(this.storageDir, `${hash}.json`);

      // 분석 결과 저장
      await writeFile(
        filePath,
        JSON.stringify(analysisResult, null, 2)
      );

      return hash;
    } catch (error) {
      console.error('저장 오류:', error);
      throw new Error('분석 결과 저장 중 오류가 발생했습니다.');
    }
  }

  async getAnalysis(hash: string): Promise<ElizaAnalysisResult> {
    try {
      const filePath = join(this.storageDir, `${hash}.json`);
      const content = await readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error('조회 오류:', error);
      throw new Error('분석 결과 조회 중 오류가 발생했습니다.');
    }
  }
} 