#!/usr/bin/env node

/**
 * IPFS 업로드 스크립트
 * 
 * 이 스크립트는 암호화된 코드를 IPFS에 업로드합니다.
 * Usage: node upload-to-ipfs.js --encrypted <encryption_result> --analysis <analysis_result> --attestation <attestation>
 */

import { uploadEncryptedCodeToIPFS } from '../dist/services/ipfs';
import { validateEnvVars } from '../dist/utils/helpers';

async function main() {
  try {
    // 필수 환경 변수 검증
    validateEnvVars(['PINATA_API_KEY', 'PINATA_SECRET_KEY']);

    const encryptionResult = JSON.parse(process.argv[2]);
    const analysis = JSON.parse(process.argv[3]);
    const metadata = JSON.parse(process.argv[4]);

    if (!encryptionResult || !analysis || !metadata) {
      throw new Error('Encryption result, analysis, and metadata are required');
    }

    console.log('Uploading to IPFS...');
    const result = await uploadEncryptedCodeToIPFS(encryptionResult, analysis, metadata);
    console.log('Upload completed:', result);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main(); 