# MCS 프로젝트 구현 가이드

## 목차
1. [개발 환경 설정](#1-개발-환경-설정)
2. [NFT 컨트랙트 배포](#2-nft-컨트랙트-배포)
3. [0G Storage 연동](#3-0g-storage-연동)
4. [환경 변수 설정](#4-환경-변수-설정)

## 1. 개발 환경 설정

### 1.1 MetaMask 지갑 설정
1. [MetaMask](https://metamask.io/) 설치
2. 계정 생성 또는 가져오기
3. Mumbai 테스트넷 추가
   - 네트워크 이름: Mumbai
   - RPC URL: https://rpc-mumbai.maticvigil.com
   - 체인 ID: 80001
   - 통화 기호: MATIC
   - 블록 탐색기: https://mumbai.polygonscan.com

### 1.2 Infura 설정
1. [Infura](https://infura.io/) 계정 생성
2. 새 프로젝트 생성
3. Mumbai 테스트넷 선택
4. RPC URL 복사 (`.env` 파일의 `NETWORK_RPC_URL`에 설정)

### 1.3 0G Storage 설정
1. [0G Storage 개발자 포털](https://developer.0g.dev) 접속
2. 계정 생성 및 로그인
3. 새 프로젝트 생성
4. API 키 발급 (`.env` 파일의 `ZERO_G_STORAGE_KEY`에 설정)

## 2. NFT 컨트랙트 배포

### 2.1 개발 환경 준비
```bash
# 프로젝트 루트 디렉토리에서 실행
cd contracts

# Hardhat 설치
npm install --save-dev hardhat

# 필요한 패키지 설치
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers @openzeppelin/contracts
```

### 2.2 컨트랙트 배포
1. `contracts/MCSNFT.sol` 파일 생성 및 코드 작성
2. `hardhat.config.ts` 파일 생성 및 설정
3. `.env` 파일에 다음 변수 설정:
   - `NETWORK_RPC_URL`: Infura에서 복사한 RPC URL
   - `PRIVATE_KEY`: MetaMask에서 내보낸 프라이빗 키

4. 컨트랙트 배포
```bash
# 컴파일
npx hardhat compile

# 배포
npx hardhat run scripts/deploy.ts --network mumbai
```

5. 배포된 컨트랙트 주소를 `.env` 파일의 `NFT_CONTRACT_ADDRESS`에 설정

### 2.3 테스트넷 MATIC 토큰 요청
1. [Polygon Faucet](https://faucet.polygon.technology/) 접속
2. MetaMask 지갑 주소 입력
3. MATIC 토큰 요청

## 3. 0G Storage 연동

### 3.1 API 키 설정
1. 0G Storage 개발자 포털에서 API 키 복사
2. `.env` 파일에 설정:
   ```
   ZERO_G_STORAGE_API=https://storage.0g.dev/v1
   ZERO_G_STORAGE_KEY=your_api_key_here
   ```

### 3.2 API 테스트
1. `src/services/zeroGStorage.ts` 파일의 더미 코드를 실제 구현으로 교체
2. 테스트 파일 업로드
3. 응답 확인 및 디버깅

## 4. 환경 변수 설정

### 4.1 `.env` 파일 생성
```bash
# .env.example 파일을 복사
cp .env.example .env
```

### 4.2 필수 변수 설정
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

## 문제 해결

### 일반적인 문제
1. **트랜잭션 실패**
   - 가스비 부족: 테스트넷에서 더 많은 MATIC 요청
   - 네트워크 혼잡: 잠시 후 재시도

2. **API 연결 실패**
   - API 키 확인
   - 네트워크 연결 확인
   - CORS 설정 확인

3. **컨트랙트 배포 실패**
   - 컴파일 에러 확인
   - 네트워크 설정 확인
   - 가스비 설정 확인

### 도움말
- [MetaMask 문서](https://docs.metamask.io/)
- [Infura 문서](https://docs.infura.io/)
- [0G Storage API 문서](https://developer.0g.dev/docs/storage-api)
- [Polygon Mumbai 테스트넷](https://mumbai.polygonscan.com) 