# 시작 가이드

## 개요

이 문서는 MCS Agent를 시작하는 방법을 설명합니다.

## 필수 조건

- Node.js 18.x 이상
- npm 9.x 이상
- MetaMask 지갑
- 0G Storage API 키

## 설치

1. 저장소 클론
```bash
git clone https://github.com/your-username/mcs-agent.git
cd mcs-agent
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
```bash
cp .env.example .env
```

4. `.env` 파일 편집
```
# Web3 설정
NETWORK_RPC_URL=https://polygon-mumbai.infura.io/v3/your-project-id
PRIVATE_KEY=your_private_key_here
NFT_CONTRACT_ADDRESS=0x...
WALLET_ADDRESS=0x...

# 0G Storage 설정
ZERO_G_STORAGE_API=https://storage.0g.dev/v1
ZERO_G_STORAGE_KEY=your_api_key_here

# 임시 파일 디렉토리
TEMP_DIR=./tmp
```

## 개발 서버 실행

```bash
npm run dev
```

## 테스트

1. 코드 분석 테스트
```bash
node scripts/analyze-code.js --repo https://github.com/your-username/your-repo.git
```

2. 코드 암호화 테스트
```bash
node scripts/encrypt-code.js --input ./analysis-results.json
```

3. 0G Storage 업로드 테스트
```bash
node scripts/upload-to-storage.js --encrypted ./encrypted-code.json
```

4. NFT 민팅 테스트
```bash
node scripts/mint-nft.js --storage ./storage-result.json
```

## 문제 해결

### 일반적인 문제

1. **설치 실패**
   - Node.js 버전 확인
   - npm 버전 확인
   - 네트워크 연결 확인

2. **환경 변수 설정 실패**
   - 파일 권한 확인
   - 변수 이름 확인
   - 값 형식 확인

3. **테스트 실패**
   - 로그 확인
   - 네트워크 연결 확인
   - API 키 확인 