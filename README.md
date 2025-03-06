# Playwright-test


## Setting
### Node : v20.17.0
### npm : v11.1.0


## Project Structure

#### `/tests` 폴더
- E2E(End-to-End) 테스트 자동화 스크립트가 위치
- Playwright 테스트 파일들 포함
- 서비스별로 분리된 테스트 구성:
  - `common`: 공통 테스트 설정 및 유틸리티
  - `saasdaService`: 서비스 관련 테스트
  - `saasdaAdmin`: 관리자 기능 테스트
  - `saasdaLearn`: 학습 기능 테스트

#### `/pages` 폴더
- Page Object Model (POM) 패턴 구현
- 각 웹 페이지의 요소와 동작을 캡슐화하는 클래스들 포함
- 구조:
  - `common`: 공통으로 사용되는 기본 페이지 클래스
  - 각 기능별 하위 폴더: 관련 페이지 객체들을 그룹화


## Dependencies
- **dotenv** (v16.4.7)
    - 환경 변수를 `.env` 파일에서 관리할 수 있게 해주는 라이브러리
    - 프로젝트의 설정값과 민감한 정보를 안전하게 관리

- **playwright** (v1.50.1)
    - 웹 브라우저 자동화 및 테스팅을 위한 프레임워크
    - 크로스 브라우저 테스트 지원 (Chromium, Firefox, WebKit)
    - 강력한 자동화 기능과 테스트 러너 제공

- **fs-extra** (v11.3.0)
    - Node.js의 `fs` 모듈을 확장한 라이브러리
    - 파일 시스템 작업을 더 쉽게 처리
    - 추가 유틸리티 함수 제공 (copy, remove, ensure 등)

- **yaml** (v2.7.0)
    - YAML 파일 파싱 및 생성을 위한 라이브러리
    - 설정 파일 처리에 사용

- **zod** (v3.24.2)
    - TS를 위한 스키마 선언 및 유효성 검사 라이브러리
    - 데이터 스키마 정의, 런타임 데이터 유효성 검사, TS 타입 추론, 데이터 파싱 및 변환



## DevDependencies (개발 도구)

이 도구들은 개발 환경에서만 사용되며, 프로덕션 환경에서는 포함되지 않습니다.

### 테스트 및 자동화
- **@playwright/test**
    - Playwright의 테스트 프레임워크
    - 테스트 케이스 작성 및 실행을 위한 도구 제공
    - 자동화된 브라우저 테스트 지원

### 코드 품질 및 스타일
- **@typescript-eslint/eslint-plugin**
    - TypeScript 코드를 위한 ESLint 규칙 제공
    - 코드 품질과 일관성 유지

- **@typescript-eslint/parser**
    - TypeScript 코드를 ESLint가 이해할 수 있도록 파싱
    - ESLint와 TypeScript의 통합을 지원

- **eslint**
    - 자바스크립트/TypeScript 코드 린터
    - 코드 스타일 및 잠재적 문제 검사

- **prettier**
    - 코드 포맷터
    - 일관된 코드 스타일 유지
    - 여러 언어 지원

### TypeScript 관련
- **typescript**
    - JavaScript의 정적 타입 확장
    - 타입 안정성과 개발 생산성 향상
    - 더 나은 IDE 지원

### 문서화
- **@types/node**
    - Node.js의 TypeScript 타입 정의
    - Node.js API를 TypeScript에서 사용할 수 있게 지원

- **@types/fs-extra**
    - fs-extra 라이브러리의 TypeScript 타입 정의


  
## 컨벤션

1. 파일 용도에 따른 접미사 규칙:
    - 헬퍼 클래스: `*-helper.ts`
    - 설정 파일: `*-config.ts`
    - 유틸리티: `*-utils.ts`
    - 테스트 파일: `*.spec.ts` 또는 `*.test.ts`
    - 타입 정의: `*.types.ts`
    - 상수: `*-constants.ts`


