import * as crypto from 'crypto';
import * as path from 'path';

/**
 * 파일 해시를 생성합니다.
 * @param content 파일 내용
 * @returns SHA-256 해시
 */
export function generateFileHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * 파일 확장자를 확인합니다.
 * @param filePath 파일 경로
 * @param allowedExtensions 허용된 확장자 목록
 * @returns 확장자가 허용된 경우 true
 */
export function isValidFileExtension(filePath: string, allowedExtensions: string[]): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return allowedExtensions.includes(ext);
}

/**
 * 환경 변수를 검증합니다.
 * @param requiredEnvVars 필수 환경 변수 목록
 * @throws Error 필수 환경 변수가 누락된 경우
 */
export function validateEnvVars(requiredEnvVars: string[]): void {
  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

/**
 * 에러 메시지를 포맷팅합니다.
 * @param error 에러 객체
 * @returns 포맷팅된 에러 메시지
 */
export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
} 