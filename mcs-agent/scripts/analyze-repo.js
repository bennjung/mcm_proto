#!/usr/bin/env node

/**
 * 저장소 분석 스크립트
 * 
 * 이 스크립트는 지정된 저장소의 코드를 분석하여 취약점을 탐지합니다.
 * Usage: node analyze-repo.js --path <repo_path> --extensions <file_extensions>
 */

import { analyzeRepository } from '../dist/services/analyzer';
import { validateEnvVars } from '../dist/utils/helpers';

async function main() {
  try {
    // 필수 환경 변수 검증
    validateEnvVars(['GITHUB_TOKEN', 'ANALYZER_API_URL']);

    const repoUrl = process.argv[2];
    if (!repoUrl) {
      throw new Error('Repository URL is required');
    }

    console.log(`Analyzing repository: ${repoUrl}`);
    const result = await analyzeRepository(repoUrl);
    console.log('Analysis completed:', result);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main(); 