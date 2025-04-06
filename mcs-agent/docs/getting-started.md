# 시작하기

## 사전 요구사항

- Node.js 16.x 이상
- Python 3.10 이상
- Git
- Pinata API 키
- 0G Chain 지갑 및 개인 키

## 설치

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

## 환경 설정

1. `.env.example` 파일을 `.env`로 복사:
```bash
cp .env.example .env
```

2. `.env` 파일을 편집하여 필요한 API 키와 설정값을 입력:
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

## 실행

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

3. 브라우저에서 `http://localhost:3000`으로 접속

## 다음 단계

- [아키텍처](./architecture.md) 문서를 통해 시스템 구조 이해하기
- [API 참조](./api-reference.md) 문서를 통해 API 사용법 익히기
- [스크립트 가이드](./script-guide.md) 문서를 통해 자동화 스크립트 사용법 익히기 