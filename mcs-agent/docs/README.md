# MCS Agent ElizaOS 문서

## 목차

1. [시작하기](./getting-started.md)
2. [아키텍처](./architecture.md)
3. [API 참조](./api-reference.md)
4. [스크립트 가이드](./script-guide.md)
5. [보안 가이드](./security-guide.md)

## 개요
MCS Agent ElizaOS는 GitHub 저장소의 코드를 분석하고 보안을 강화하는 모듈식 솔루션입니다. 코드 분석, 암호화, 0G Storage 업로드, NFT 민팅 등의 기능을 제공합니다.

## 주요 기능

### 1. GitHub 리포지토리 관리
- **리포지토리 입력**
  - GitHub URL 기반 리포지토리 접근
  - 자동 코드 다운로드 (GitHub REST API / git clone)
  - 리포지토리 메타데이터 추출

### 2. 취약점 분석
- **악성 패턴 감지**
  - 외부 통신 패턴 분석
  - 의심스러운 분기문 식별
  - 악성 코드 패턴 탐지

- **지갑 보안 분석**
  - 주소 하이재킹 (wallet draining) 시도 탐지
  - 민감 정보 노출 검사
  - 보안 키 관리 검증

- **ABI 호출 검증**
  - 무단 ABI 호출 식별
  - 권한 없는 함수 호출 감지
  - 컨트랙트 상호작용 검증

### 3. 평판 분석
- **리포지토리 메트릭 평가**
  - 스타 수 분석
  - 포크 수 평가
  - 최근 커밋 활동
  - 컨트리뷰터 수 분석
  - 이슈 및 PR 상태

- **신뢰도 점수 계산**
  - 메트릭 기반 점수 산출
  - 등급 부여 (A~E)
  - 상세 점수 분석

### 4. 보안 리포트
- **ELIZA Agent 기반 리포트**
  - 취약점 상세 분석
  - 개선 제안 제공
  - 보안 점수 산출
  - 위험도 평가

### 5. 데이터 저장 및 NFT
- **0G Storage 통합**
  - 암호화된 코드 저장
  - 메타데이터 관리
  - 접근 권한 제어

- **NFT 발행**
  - 분석 결과 포함
  - 메타데이터 저장
  - 0G Storage URI 연동

## 기술 스택
- **프론트엔드**: Next.js, TypeScript
- **백엔드**: Python, FastAPI
- **스토리지**: 0G Storage
- **블록체인**: 0G Chain
- **보안**: AES-256, TEE

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