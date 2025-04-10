#!/usr/bin/env node

/**
 * 코드 암호화 스크립트
 * 
 * 이 스크립트는 주석이 추가된 코드를 암호화합니다.
 * Usage: node encrypt-code.js --path <repo_path> --analysis <analysis_result>
 */

import { encryptFile } from '../dist/services/encryption';
import { validateEnvVars } from '../dist/utils/helpers';

async function main() {
  try {
    const filePath = process.argv[2];
    if (!filePath) {
      throw new Error('File path is required');
    }

    console.log(`Encrypting file: ${filePath}`);
    const result = await encryptFile(filePath);
    console.log('Encryption completed:', result);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main(); 