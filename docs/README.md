# MCS NFT 프로젝트 문서

## 개요
MCS NFT는 코드 리뷰 기반의 NFT 발행 시스템입니다. ElizaOS MCS Agent가 코드를 분석하고 리뷰한 후, 일정 점수 이상의 코드에 대해 NFT를 발행합니다.

## 기능
1. 코드 리뷰 기반 NFT 발행
2. 사용권 관리 (ERC-7857)
3. 자동화된 코드 분석
4. 사용권 전송 및 거래

## 기술 스택
- Frontend: Next.js, React
- Smart Contract: Solidity, Hardhat
- Code Analysis: Python
- CI/CD: GitHub Actions

## 개발 환경 설정
1. Node.js 설치
2. Python 3.8+ 설치
3. 의존성 설치
```bash
npm install
```

## 테스트
```bash
npm test
```

## 배포
1. 스마트 컨트랙트 배포
```bash
npm run deploy
```

2. 프론트엔드 배포
```bash
npm run build
```

## API 문서
### 스마트 컨트랙트
- `submitCodeReview`: 코드 리뷰 제출
- `getCodeReview`: 코드 리뷰 정보 조회
- `grantUsageRight`: 사용권 부여
- `transferUsageRight`: 사용권 전송

### 프론트엔드 API
- `/api/code-review`: 코드 리뷰 제출
- `/api/nft`: NFT 정보 조회
- `/api/usage-right`: 사용권 관리

## 보안
1. 스마트 컨트랙트 보안
- 재진입 공격 방지
- 권한 검증
- 가스 최적화

2. 프론트엔드 보안
- XSS 방지
- CSRF 토큰
- 입력 검증

## 모니터링
1. NFT 발행 모니터링
2. 사용권 관리 모니터링
3. 코드 리뷰 품질 모니터링

## 문제 해결
1. 일반적인 문제
2. 에러 코드
3. 디버깅 가이드

## 기여 가이드
1. 코드 스타일
2. PR 프로세스
3. 테스트 요구사항 