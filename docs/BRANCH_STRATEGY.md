# 브랜치 전략

## 브랜치 구조

### 1. 메인 브랜치
- `main`: 프로덕션 환경용 브랜치
  - 안정적인 버전만 포함
  - 직접 커밋 불가
  - PR과 코드 리뷰 필수
  - CI/CD 파이프라인 통과 필수

- `develop`: 개발 환경용 브랜치
  - 다음 릴리즈를 위한 개발 브랜치
  - 기능 브랜치의 통합 지점
  - PR과 코드 리뷰 필수
  - CI 테스트 통과 필수

### 2. 보조 브랜치
- `feature/*`: 기능 개발 브랜치
  - 명명 규칙: `feature/기능명-이슈번호`
  - 예: `feature/user-auth-123`
  - develop 브랜치에서 분기
  - 개발 완료 후 develop 브랜치로 PR

- `hotfix/*`: 긴급 수정 브랜치
  - 명명 규칙: `hotfix/버그명-이슈번호`
  - main 브랜치에서 분기
  - 수정 완료 후 main과 develop 브랜치로 PR

- `release/*`: 릴리즈 준비 브랜치
  - 명명 규칙: `release/버전번호`
  - develop 브랜치에서 분기
  - 버그 수정 및 문서 업데이트
  - 준비 완료 후 main과 develop 브랜치로 PR

## 브랜치 생성 및 관리 규칙

### 1. 브랜치 생성
```bash
# 기능 브랜치 생성
git checkout -b feature/기능명-이슈번호 develop

# 핫픽스 브랜치 생성
git checkout -b hotfix/버그명-이슈번호 main

# 릴리즈 브랜치 생성
git checkout -b release/버전번호 develop
```

### 2. 브랜치 병합
```bash
# 기능 브랜치 -> develop
git checkout develop
git merge --no-ff feature/기능명-이슈번호

# 핫픽스 -> main
git checkout main
git merge --no-ff hotfix/버그명-이슈번호

# 핫픽스 -> develop
git checkout develop
git merge --no-ff hotfix/버그명-이슈번호
```

### 3. 브랜치 삭제
```bash
# 로컬 브랜치 삭제
git branch -d feature/기능명-이슈번호

# 원격 브랜치 삭제
git push origin --delete feature/기능명-이슈번호
```

## PR 프로세스

### 1. PR 생성
- 제목: `[기능/버그/릴리즈] 간단한 설명 (이슈번호)`
- 설명: 변경 사항 상세 설명
- 관련 이슈 링크
- 체크리스트 작성

### 2. 코드 리뷰
- 최소 1명 이상의 리뷰어 승인 필요
- CI 테스트 통과 필수
- 코드 스타일 준수 확인
- 문서 업데이트 확인

### 3. 병합
- Squash and Merge 사용
- 커밋 메시지 규칙 준수
- 브랜치 삭제 확인

## 커밋 메시지 규칙

```
[타입] 제목 (이슈번호)

본문

꼬리말
```

### 타입
- feat: 새로운 기능
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 스타일 변경
- refactor: 코드 리팩토링
- test: 테스트 코드
- chore: 빌드 프로세스, 패키지 매니저 설정

### 예시
```
[feat] 사용자 인증 기능 추가 (#123)

- JWT 기반 인증 구현
- 로그인/회원가입 API 추가
- 테스트 코드 작성

Resolves: #123
``` 