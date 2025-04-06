# MCS Agent - Modular Code Security

MCS Agent는 코드 보안을 위한 모듈식 솔루션입니다. GitHub 저장소의 코드를 분석하고, 암호화하며, IPFS에 업로드하고, 0G Chain에 NFT로 민팅하는 기능을 제공합니다.

## 기술 스택

- **프론트엔드**: Next.js, React, Tailwind CSS
- **백엔드**: Node.js, TypeScript
- **분석 서버**: Python, FastAPI
- **블록체인**: 0G Chain, IPFS

## 시작하기

### 필수 조건

- Node.js 18.x 이상
- Python 3.8 이상
- Git

### 설치

1. 저장소를 클론합니다:
```bash
git clone https://github.com/your-username/mcs-agent.git
cd mcs-agent
```

2. 의존성 패키지를 설치합니다:
```bash
npm install
```

3. 환경 변수를 설정합니다:
```bash
cp .env.example .env
# .env 파일을 편집하여 필요한 환경 변수를 설정합니다
```

### 개발 서버 실행

프론트엔드 개발 서버를 실행합니다:
```bash
npm run dev
```

Python 분석 서버를 실행합니다:
```bash
cd python-analyzer
pip install -r requirements.txt
python app.py
```

브라우저에서 [http://localhost:3000](http://localhost:3000)를 열어 결과를 확인할 수 있습니다.

## 프로젝트 구조

```
mcs-agent/
├── src/                    # 소스 코드
│   ├── app/               # Next.js 앱 라우터
│   ├── components/        # UI 컴포넌트
│   ├── lib/              # 유틸리티 함수
│   └── services/         # 핵심 서비스
├── python-analyzer/       # Python 분석 서버
├── public/               # 정적 자산
└── scripts/             # 자동화 스크립트
```

## 주요 기능

1. **코드 분석**
   - GitHub 저장소 클론
   - 취약점 분석
   - AI 기반 주석 생성

2. **암호화**
   - 코드 암호화
   - 메타데이터 생성

3. **IPFS 업로드**
   - 암호화된 코드 업로드
   - 메타데이터 업로드

4. **NFT 민팅**
   - 0G Chain에 NFT 민팅
   - TEE 증명 생성

## 배포

### Vercel에 배포

Next.js 앱을 Vercel에 배포하는 가장 쉬운 방법은 [Vercel 플랫폼](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)을 사용하는 것입니다.

### Python 서버 배포

Python 분석 서버는 다음 방법으로 배포할 수 있습니다:
- Docker 컨테이너
- 클라우드 플랫폼 (AWS, GCP, Azure)
- 전용 서버

## 기여하기

기여를 원하시면 다음 단계를 따르세요:

1. 이슈를 생성하여 변경사항을 논의합니다.
2. Fork하여 변경사항을 작업합니다.
3. Pull Request를 생성합니다.

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.
