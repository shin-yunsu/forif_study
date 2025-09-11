# 자기소개 ~

## Study Overview

### 📚 backgrounds:

GIT, 웹개발에 대한 기초적인 이해, claude code (windows면 wsl), gemini

## 2주차: Frontend

### 🎨 프론트엔드
- **React, TypeScript**
    - [Claude Code](https://docs.anthropic.com/en/docs/claude-code)로 실습 구현
    - 컴포넌트 기반 개발 이해
    - 타입 안정성 확보
    - 📖 [React 공식 문서](https://react.dev/)
    - 📖 [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- **Figma MCP 연동**
    - [Figma](https://www.figma.com/) 디자인 시스템 구현
    - 디자인 토큰 활용
    - 컴포넌트 라이브러리 구축
    - 🎨 [Figma Dev Mode](https://www.figma.com/dev-mode/)
- **Vercel 배포**
    - [Vercel](https://vercel.com/) 자동 배포 설정
    - 환경 변수 관리
    - 도메인 연결
    - 🚀 [Vercel 시작하기](https://vercel.com/docs)
- **프론트엔드도 이건 알아야한다!**
    - 브라우저 기능
        - 쿠키 / 세션 / 로컬 스토리지
    - 개발자 도구 사용법
    - 프론트엔드 아키텍처
    - npm 사용법
    - optimistic & skeleton ui 를 사용한 ux 최적화
- **심화**
    - react query란?
    - 프론트엔드 최적화 기법
    - 추상화 정도
    - ssr vs csr | spa
    - seo 원리 (google bot, site map)
    - i18n (google sheet 연동)

## 3주차: Backend

### 🔧 백엔드

- **Server란?**
    - 클라이언트-서버 아키텍처
    - HTTP 프로토콜 이해
    - 요청-응답 사이클
    - 📚 [MDN HTTP 가이드](https://developer.mozilla.org/ko/docs/Web/HTTP)
- **Database**
    - RDBMS vs NoSQL
    - 데이터 모델링
    - 인덱싱과 쿼리 최적화
    - 🗄️ [PostgreSQL](https://www.postgresql.org/) | [MongoDB](https://www.mongodb.com/)
- **RESTful API**
    - REST 원칙과 설계
    - HTTP 메소드 활용
    - API 문서화 ([Swagger](https://swagger.io/)/OpenAPI)
    - 📋 [REST API 설계 가이드](https://restfulapi.net/)

### 💡 알면 좋을 개념!

- **Browser Cookie**
    - 쿠키의 동작 원리
    - SameSite, Secure 속성
    - 세션 관리
    - 🍪 [MDN Cookies](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)
- **JWT Token vs Session**
    - 인증 방식 비교
    - Stateless vs Stateful
    - 보안 고려사항
    - 🔐 [JWT.io](https://jwt.io/)
- **ORM (Object-Relational Mapping)**
    - ORM의 장단점
    - [SQLAlchemy](https://www.sqlalchemy.org/), [Prisma](https://www.prisma.io/) 등
    - 마이그레이션 관리
- **Express/FastAPI vs Nest/Spring**
    - 프레임워크 선택 기준
    - 생산성 vs 구조화
    - 생태계 비교
    - ⚡ [FastAPI](https://fastapi.tiangolo.com/) | 🚂 [Express](https://expressjs.com/)
    - 🏗️ [NestJS](https://nestjs.com/) | 🍃 [Spring](https://spring.io/)
- **Query Parameter**
    - URL 파라미터 처리
    - 필터링과 페이지네이션
    - 검증과 sanitization
- **Scheduling**
    - Cron job
    - 백그라운드 작업 처리
    - 큐 시스템 활용
    - ⏰ [Crontab Guru](https://crontab.guru/)
- **Architecture**
    - MVC, MVP, MVVM 패턴
    - 마이크로서비스 vs 모놀리식
    - 레이어드 아키텍처 (최애)
    
    중에 하나 선택해서 하면 될듯요
    
    ![Architecture Patterns](https://miro.medium.com/v2/resize:fit:1400/1*NfFzI7Z-E3ypn8ahESbDzw.png)

### 🚀 실습

- **Supabase와 FastAPI를 사용한 Backend 구현**
    - [Claude Code](https://docs.anthropic.com/en/docs/claude-code)로 백엔드 구현 ([Supabase](https://supabase.com/) or SQLite 사용)
    - [FastAPI](https://fastapi.tiangolo.com/)로 REST API 개발
    - [Railway](https://railway.app/)를 통한 배포
    - 📖 [Supabase Docs](https://supabase.com/docs)

## 4주차: Infra/Cloud & CI/CD

![AWS Architecture](https://d1.awsstatic.com/webteam/getting_started/GSRC%202020%20updates/full-stack%20amplify%20console%20arch%20diagram%20module%205.8d82fc2a7b47b307dfcefb6fa5f364e8c24426bc.png)

![Backend Architecture](https://miro.medium.com/v2/resize:fit:1400/1*K6M-x-6e39jMq_c-2xqZIQ.png)

### ☁️ Infra/Cloud

- **AWS 핵심 서비스 (개념만)**
    - **[CloudFront](https://aws.amazon.com/ko/cloudfront/) (CDN)**
        - 콘텐츠 전송 최적화
        - 캐싱 전략
        - 오리진 설정
    - **[ALB](https://aws.amazon.com/ko/elasticloadbalancing/application-load-balancer/) (Application Load Balancing)**
        - 트래픽 분산
        - 헬스 체크
        - 타겟 그룹 관리
    - **[EC2](https://aws.amazon.com/ko/ec2/)**
        - 인스턴스 타입 선택
        - 보안 그룹 설정
        - SSH 접속 관리
    - **[S3](https://aws.amazon.com/ko/s3/)**
        - 정적 파일 호스팅
        - 버킷 정책
        - 라이프사이클 관리
    - **[CloudWatch](https://aws.amazon.com/ko/cloudwatch/)**
        - 로그 모니터링
        - 메트릭 수집
        - 알람 설정
    - **[RDS](https://aws.amazon.com/ko/rds/)**
        - 관계형 DB 관리
        - 백업과 복구
        - 읽기 전용 복제본
- **Container & Orchestration**
    - **[Docker](https://www.docker.com/) Container**
        - 컨테이너화의 이점
        - Dockerfile 작성
        - 이미지 최적화
        - 🐳 [Docker Hub](https://hub.docker.com/)
    - **[Kubernetes](https://kubernetes.io/)**
        - 컨테이너 오케스트레이션
        - Pod, Service, Deployment
        - 스케일링과 롤링 업데이트
        - ☸️ [K8s 문서](https://kubernetes.io/ko/docs/home/)
    - **왜 쓰는가? 장단점**
        - 환경 일관성
        - 리소스 효율성
        - 학습 곡선과 복잡도

### 🔒 보안

- **HTTPS용 인증서 구입**
    - SSL/TLS 인증서 종류
    - [Let's Encrypt](https://letsencrypt.org/) 활용
    - 인증서 갱신 자동화
    - 🔐 [SSL Labs 테스트](https://www.ssllabs.com/ssltest/)

### 🔄 CI/CD

![GitHub Actions](https://github.githubassets.com/images/modules/site/features/actions-icon-actions.svg)

- **[GitHub Actions](https://github.com/features/actions)를 사용한 CI/CD 구현**
    - 워크플로우 작성
    - 테스트 자동화
    - 빌드 및 배포 파이프라인
    - 시크릿 관리
    - 📚 [GitHub Actions 문서](https://docs.github.com/ko/actions)

### 🎯 스터디 방향성 정하기

- 프로젝트 주제 선정
- 역할 분담
- 일정 계획
- 코드 리뷰 방식

### 💻 바이브코딩 해보자~

- 페어 프로그래밍
- 라이브 코딩 세션
- 문제 해결 과정 공유
- 🎬 [Live Share Extension](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)

### ⚙️ 개발 환경설정

- IDE 설정 ([VS Code](https://code.visualstudio.com/) 등)
- [Git](https://git-scm.com/) 설정 및 브랜치 전략
- 패키지 매니저 ([npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/))
- 린터 및 포맷터 설정
    - [ESLint](https://eslint.org/)
    - [Prettier](https://prettier.io/)
- 환경 변수 관리
    - [dotenv](https://www.npmjs.com/package/dotenv)

---