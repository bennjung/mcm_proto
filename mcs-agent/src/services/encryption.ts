import crypto from 'crypto';
import fs from 'fs-extra';
import path from 'path';

interface EncryptionResult {
  encryptedCode: Buffer;
  encryptedCodeUri: string;
  iv: Buffer;
  key: Buffer;
}

/**
 * 코드 암호화
 * @param repoPath 저장소 경로
 * @returns 암호화된 코드와 관련 정보
 */
export async function encryptCode(repoPath: string): Promise<EncryptionResult> {
  try {
    // 암호화 키 생성
    const key = crypto.randomBytes(32); // AES-256
    const iv = crypto.randomBytes(16);
    
    // 코드 파일 읽기
    const files = await fs.readdir(repoPath);
    const codeFiles = files.filter(file => 
      ['.js', '.ts', '.sol'].includes(path.extname(file))
    );
    
    // 코드 내용 결합
    let codeContent = '';
    for (const file of codeFiles) {
      const content = await fs.readFile(path.join(repoPath, file), 'utf-8');
      codeContent += `// ${file}\n${content}\n\n`;
    }
    
    // 암호화
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encryptedCode = Buffer.concat([
      cipher.update(codeContent, 'utf8'),
      cipher.final()
    ]);
    
    // 임시 파일로 저장
    const tempPath = path.join(repoPath, 'encrypted_code.bin');
    await fs.writeFile(tempPath, encryptedCode);
    
    return {
      encryptedCode,
      encryptedCodeUri: `file://${tempPath}`,
      iv,
      key
    };
  } catch (error) {
    console.error('Error encrypting code:', error);
    throw error;
  }
} 