#!/usr/bin/env node

/**
 * TEE 증명 생성 스크립트
 * 
 * 이 스크립트는 분석 결과를 기반으로 TEE 증명을 생성합니다.
 * Usage: node generate-tee-attestation.js --analysis <analysis_result>
 */

import { generateTEEAttestation } from '../dist/services/zerogs';
import { validateEnvVars } from '../dist/utils/helpers';

async function main() {
  try {
    // 필수 환경 변수 검증
    validateEnvVars(['TEE_SERVICE_URL', 'TEE_API_KEY']);

    const analysisResult = JSON.parse(process.argv[2]);
    if (!analysisResult) {
      throw new Error('Analysis result is required');
    }

    console.log('Generating TEE attestation...');
    const attestation = await generateTEEAttestation(analysisResult);
    console.log('TEE attestation generated:', attestation);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main(); 