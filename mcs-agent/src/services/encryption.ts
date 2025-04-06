import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 파일을 암호화합니다.
 * @param filePath 암호화할 파일 경로
 * @returns 암호화 결과
 */
export async function encryptFile(filePath: string) {
  try {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const content = fs.readFileSync(filePath, 'utf-8');

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(content, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    const encryptedFilePath = filePath + '.encrypted';
    const metadataPath = filePath + '.metadata.json';

    fs.writeFileSync(encryptedFilePath, encrypted);
    fs.writeFileSync(metadataPath, JSON.stringify({
      algorithm: 'aes-256-cbc',
      key: key.toString('hex'),
      iv: iv.toString('hex'),
      originalContent: content
    }, null, 2));

    return {
      success: true,
      encryptedFilePath,
      metadataPath,
      key: key.toString('hex'),
      iv: iv.toString('hex'),
      originalContent: content
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 