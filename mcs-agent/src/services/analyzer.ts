import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

interface AnalysisResult {
  fileCount: number;
  results: Array<{
    name: string;
    content: string;
    analysis: {
      analysis?: {
        vulnerability_count: number;
        vulnerabilities: Array<{
          type: string;
          severity: string;
          line: number;
          description: string;
        }>;
      };
      annotation?: {
        annotatedFilePath: string;
        suggestions: string[];
      };
    };
  }>;
}

/**
 * 저장소의 코드를 분석합니다.
 * @param repoPath 저장소 경로
 * @param extensions 파일 확장자 목록
 * @returns 분석 결과
 */
export async function analyzeRepository(repoPath: string, extensions: string[] = ['.sol', '.js', '.ts']): Promise<AnalysisResult> {
  try {
    const files = await getRepoFiles(repoPath, extensions);
    if (!files.success) {
      throw new Error(files.error);
    }

    const results = [];
    for (const filePath of files.files) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fileName = path.basename(filePath);

      // Python 분석 서버로 분석 요청
      const analysisResponse = await axios.post('http://localhost:8000/analyze', {
        code: content,
        fileType: path.extname(filePath)
      });

      // AI 주석 생성 요청
      const annotationResponse = await axios.post('http://localhost:8000/annotate', {
        code: content,
        analysis: analysisResponse.data
      });

      results.push({
        name: fileName,
        content,
        analysis: {
          analysis: analysisResponse.data,
          annotation: annotationResponse.data
        }
      });
    }

    return {
      fileCount: results.length,
      results
    };
  } catch (error) {
    throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 