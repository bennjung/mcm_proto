# 스크립트 가이드

## 개요

MCS는 다음과 같은 자동화 스크립트를 제공합니다:

1. `analyze-repo.js`: 저장소 분석
2. `generate-tee-attestation.js`: TEE 증명 생성
3. `encrypt-code.js`: 코드 암호화
4. `upload-to-ipfs.js`: IPFS 업로드
5. `mint-on-0g-chain.js`: 0G Chain NFT 민팅
6. `mint-thirdweb.js`: ThirdWeb NFT 민팅

## 스크립트 사용법

### 저장소 분석
```bash
node scripts/analyze-repo.js --path <repo_path> --extensions ".sol,.js,.ts"
```

**옵션**
- `--path`: 분석할 저장소 경로
- `--extensions`: 분석할 파일 확장자 (콤마로 구분)

### TEE 증명 생성
```bash
node scripts/generate-tee-attestation.js --analysis <analysis_result>
```

**옵션**
- `--analysis`: 분석 결과 JSON

### 코드 암호화
```bash
node scripts/encrypt-code.js --path <file_path> --analysis <analysis_result>
```

**옵션**
- `--path`: 암호화할 파일 경로
- `--analysis`: 분석 결과 JSON

### IPFS 업로드
```bash
node scripts/upload-to-ipfs.js \
  --encrypted <encryption_result> \
  --analysis <analysis_result> \
  --attestation <attestation>
```

**옵션**
- `--encrypted`: 암호화 결과 JSON
- `--analysis`: 분석 결과 JSON
- `--attestation`: TEE 증명 토큰

### 0G Chain NFT 민팅
```bash
node scripts/mint-on-0g-chain.js \
  --address <wallet_address> \
  --metadata <metadata_uri> \
  --attestation <attestation> \
  --network <network>
```

**옵션**
- `--address`: 지갑 주소
- `--metadata`: 메타데이터 URI
- `--attestation`: TEE 증명 토큰
- `--network`: 네트워크 (0g-testnet/0g-mainnet)

### ThirdWeb NFT 민팅
```bash
node scripts/mint-thirdweb.js \
  --address <wallet_address> \
  --metadata <metadata_uri> \
  --network <network>
```

**옵션**
- `--address`: 지갑 주소
- `--metadata`: 메타데이터 URI
- `--network`: 네트워크 (sepolia)

## GitHub Actions 통합

MCS 스크립트는 GitHub Actions 워크플로우와 통합되어 있습니다. `.github/workflows/mcs-workflow.yml` 파일에서 워크플로우 설정을 확인할 수 있습니다.

### 워크플로우 트리거

1. `main` 브랜치로 푸시
2. PR 생성
3. 수동 트리거 (지갑 주소와 네트워크 선택 필요)

### 환경 변수 설정

워크플로우 실행을 위해 다음 GitHub Secrets를 설정해야 합니다:

- `PINATA_API_KEY`
- `PINATA_SECRET_KEY`
- `ZERO_G_PRIVATE_KEY`
- `ZERO_G_RPC_URL`
- `NFT_CONTRACT_ADDRESS`
- `DEFAULT_WALLET_ADDRESS`
- `TEE_API_KEY`
- `TEE_SERVICE_URL` 