# MCS - Modular Code Security

MCS는 스마트 계약을 스캔하고, AI 주석을 달고, 암호화하고, NFT로 민팅하여 안전하게 거래할 수 있게 해주는 Web3 보안 유통 플랫폼입니다.

## 프로젝트 개요

MCS(Modular Code Security)는 다음 기능을 제공합니다:

1. **코드 보안 분석**: 스마트 계약 코드의 취약점 자동 탐지
2. **AI 주석 추가**: 탐지된 취약점에 대한 자동 주석 생성
3. **코드 암호화**: AES 알고리즘을 사용한 안전한 코드 암호화
4. **IPFS 저장**: 암호화된 코드를 탈중앙화된 저장소에 업로드
5. **NFT 민팅**: 코드 소유권을 블록체인에 기록
6. **0G Chain 통합**: 보안 검증을 위한 0G Chain 블록체인 통합

## 아키텍처

MCS는 다음과 같은 구성 요소로 이루어져 있습니다:

```
+------------------+     +----------------------+     +-------------------------+
|                  |     |                      |     |                         |
|     사용자       +---->+  ElizaOS Agent       +---->+  정적 분석 서버          |
|   인터페이스     |     |  (Node.js 백엔드)     |     |  (Python/FastAPI)       |
+------------------+     +----------------------+     +-------------------------+
                                   |  ^                           |
                                   v  |                           v
                         +----------------------+     +-------------------------+
                         |                      |     |                         |
                         |  AES 암호화 모듈     +<----+  AI 주석 생성 모듈       |
                         |                      |     |                         |
                         +----------------------+     +-------------------------+
                                   |
                                   v
                         +----------------------+     +-------------------------+
                         |                      |     |                         |
                         |  IPFS 저장소        +---->+  TEE 증명 생성           |
                         |  (Pinata)           |     |                         |
                         +----------------------+     +-------------------------+
                                   |                             |
                                   v                             v
                         +----------------------+     +-------------------------+
                         |                      |     |                         |
                         |  NFT 민팅 모듈       +---->+  0G Chain               |
                         |                      |     |                         |
                         +----------------------+     +-------------------------+
```

## 설치 및 실행

### 사전 요구사항

- Node.js 16.x 이상
- Python 3.10 이상
- Git
- Pinata API 키
- 0G Chain 지갑 및 개인 키

### 환경 설정

1. 저장소 클론:

```bash
git clone https://github.com/your-username/mcs-project.git
cd mcs-project
```

2. 백엔드 의존성 설치:

```bash
cd mcs-agent
npm install
```

3. Python 분석 서버 설정:

```bash
cd python-analyzer
pip install -r requirements.txt
```

4. 환경 변수 설정:

`.env` 파일을 생성하고 다음 내용을 추가합니다:

```
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
THIRDWEB_PRIVATE_KEY=your_private_key
NFT_CONTRACT_ADDRESS=your_contract_address
ZERO_G_RPC_URL=https://testnet-rpc.0g.dev
ZERO_G_PRIVATE_KEY=your_zero_g_private_key
TEE_API_KEY=your_tee_api_key
TEE_SERVICE_URL=https://tee.0g.dev/attestation
```

### 실행

1. 백엔드 서버 시작:

```bash
cd mcs-agent
npm run dev
```

2. Python 분석 서버 시작:

```bash
cd python-analyzer
python app.py
```

3. 브라우저에서 `http://localhost:3000`으로 접속하여 MCS 시스템을 사용할 수 있습니다.

## 주요 기능

### 코드 분석 및 AI 주석

MCS는 다양한 패턴을 기반으로 스마트 계약의 취약점을 탐지하고, 이에 대한 AI 주석을 자동으로 생성합니다.

### 코드 암호화 및 IPFS 업로드

분석된 코드는 AES-256-CBC 알고리즘으로 암호화되어 IPFS에 업로드됩니다. 이를 통해 코드의 무결성과 기밀성을 유지할 수 있습니다.

### NFT 민팅 및 0G Chain 통합

IPFS에 업로드된 코드와 분석 결과는 NFT로 민팅되어 0G Chain에 기록됩니다. 이를 통해 코드의 소유권과 보안 검증 결과를 블록체인에 영구적으로 보존할 수 있습니다.

### GitHub Actions 자동화

MCS는 GitHub Actions를 통해 코드 변경 시 자동으로 보안 분석, 암호화, NFT 민팅을 수행할 수 있습니다.

## 개발자 문서

더 자세한 개발자 문서는 [docs](./docs) 디렉토리를 참고하세요.

## 라이선스

MIT 라이선스에 따라 배포됩니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.