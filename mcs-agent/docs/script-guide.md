# 스크립트 가이드

## 개요

이 문서는 MCS Agent의 스크립트 사용 방법을 설명합니다.

## 스크립트 목록

1. `analyze-code.js`: 코드 분석 및 취약점 식별
2. `encrypt-code.js`: 코드 암호화
3. `upload-to-storage.js`: 0G Storage 업로드
4. `mint-nft.js`: NFT 민팅
5. `analyze-repo-metrics.js`: GitHub 저장소 평판 분석

## 사용 방법

### 코드 분석

```bash
node scripts/analyze-code.js \
  --repo https://github.com/your-username/your-repo.git \
  --output ./analysis-results.json
```

### 코드 암호화

```bash
node scripts/encrypt-code.js \
  --input ./analysis-results.json \
  --output ./encrypted-code.json
```

### 0G Storage 업로드

```bash
node scripts/upload-to-storage.js \
  --encrypted ./encrypted-code.json \
  --analysis ./analysis-results.json \
  --metadata ./metadata.json
```

### NFT 민팅

```bash
node scripts/mint-nft.js \
  --storage ./storage-result.json \
  --wallet 0x...
```

### 저장소 평판 분석

```bash
node scripts/analyze-repo-metrics.js \
  --repo https://github.com/your-username/your-repo.git \
  --token your_github_token
```

## 환경 변수

다음 환경 변수를 설정해야 합니다:

- `NETWORK_RPC_URL`
- `PRIVATE_KEY`
- `NFT_CONTRACT_ADDRESS`
- `WALLET_ADDRESS`
- `ZERO_G_STORAGE_API`
- `ZERO_G_STORAGE_KEY`
- `GITHUB_TOKEN`

## 문제 해결

### 일반적인 문제

1. **스크립트 실행 실패**
   - 환경 변수 확인
   - 의존성 설치 확인
   - 네트워크 연결 확인

2. **업로드 실패**
   - API 키 확인
   - 파일 크기 확인
   - 네트워크 연결 확인

3. **민팅 실패**
   - 지갑 잔액 확인
   - 가스비 설정 확인
   - 컨트랙트 주소 확인 

4. **평판 분석 오류**
   - GitHub API 토큰 확인
   - 저장소 URL 형식 확인
   - API 호출 제한 확인 