# MCS Agent

MCS Agent는 코드 보안을 위한 모듈식 솔루션입니다. GitHub 저장소의 코드를 분석하고, 암호화하며, 0G Storage에 업로드하고, 0G Chain에 NFT로 민팅하는 기능을 제공합니다.

## 주요 기능

- **코드 분석**: GitHub 저장소의 코드를 분석하여 보안 취약점을 식별
- **코드 암호화**: 분석된 코드를 암호화하여 보안 강화
- **0G Storage**: 암호화된 코드를 0G Storage에 업로드
- **NFT 민팅**: 분석 결과와 암호화된 코드를 NFT로 민팅

## 기술 스택

- **프론트엔드**: Next.js, React, TypeScript
- **백엔드**: Node.js, Express
- **블록체인**: 0G Chain, 0G Storage
- **보안**: AES-256 암호화, TEE 증명

## 시작하기

### 필수 조건

- Node.js 18.x 이상
- npm 9.x 이상
- MetaMask 지갑
- 0G Storage API 키

### 설치

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
# .env 파일을 편집하여 필요한 환경 변수를 설정
```

4. 개발 서버 실행
```bash
npm run dev
```

## 워크플로우

1. **코드 분석**
   - GitHub 저장소 클론
   - 코드 분석 및 취약점 식별
   - AI 주석 추가

2. **코드 암호화**
   - 분석된 코드 암호화
   - 암호화 키 생성 및 관리

3. **0G Storage 업로드**
   - 암호화된 코드 업로드
   - 메타데이터 생성 및 저장

4. **NFT 민팅**
   - 분석 결과와 암호화된 코드를 NFT로 민팅
   - 0G Chain에 기록

## 라이센스

MIT
