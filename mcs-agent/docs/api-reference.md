# API 참조

## 엔드포인트

### 분석 API

#### 코드 분석 요청
```http
POST /api/analyze
Content-Type: application/json

{
  "code": "string",
  "fileType": "string"
}
```

**응답**
```json
{
  "vulnerabilities": [
    {
      "type": "string",
      "severity": "string",
      "line": "number",
      "description": "string"
    }
  ],
  "suggestions": ["string"],
  "score": "number"
}
```

#### 파일 분석 요청
```http
POST /api/analyze-file
Content-Type: multipart/form-data

file: <file>
```

### NFT API

#### NFT 민팅 요청
```http
POST /api/mint
Content-Type: application/json

{
  "walletAddress": "string",
  "metadataUri": "string",
  "chainType": "string"
}
```

**응답**
```json
{
  "success": "boolean",
  "tokenId": "string",
  "txHash": "string",
  "blockNumber": "number"
}
```

### TEE API

#### TEE 증명 생성
```http
POST /api/generate-attestation
Content-Type: application/json

{
  "analysis": "object"
}
```

**응답**
```json
{
  "success": "boolean",
  "attestation": "string",
  "expiry": "string"
}
```

### IPFS API

#### IPFS 업로드
```http
POST /api/upload
Content-Type: application/json

{
  "encrypted": "object",
  "analysis": "object",
  "attestation": "string"
}
```

**응답**
```json
{
  "success": "boolean",
  "encrypted": {
    "ipfsHash": "string",
    "uri": "string"
  },
  "metadata": {
    "ipfsHash": "string",
    "uri": "string"
  }
}
```

## 에러 응답

모든 API는 에러 발생 시 다음과 같은 형식으로 응답합니다:

```json
{
  "error": "string",
  "message": "string",
  "statusCode": "number"
}
```

## 인증

대부분의 API는 인증이 필요합니다. 인증은 HTTP 헤더를 통해 제공됩니다:

```http
Authorization: Bearer <api_key>
```

## 제한 사항

- 요청 크기 제한: 10MB
- 분당 요청 제한: 60회
- 파일 형식 제한: .sol, .js, .ts
- API 키 만료: 30일 