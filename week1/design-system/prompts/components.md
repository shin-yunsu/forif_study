# 온라인 강의사이트 공통 컴포넌트 분석

온라인 강의사이트의 홈페이지, 로그인, 회원가입, 결제 페이지 구현에 필요한 공통 컴포넌트들을 분류하고 정리합니다.

## 1. 네비게이션 & 헤더 컴포넌트

### - [x] Header/Navigation
- 사이트 전체 네비게이션 바
- 로고, 메뉴, 사용자 정보 포함
- 반응형 디자인 지원

### - [x] Logo
- 클릭 시 홈으로 이동
- 브랜드 아이덴티티 표현

### - [x] UserMenu  
- 로그인 상태에 따른 조건부 렌더링
- 프로필, 설정, 로그아웃 등 드롭다운

### - [x] SearchBar
- 강의 검색 기능
- 자동완성 및 필터 연동

### - [x] BreadCrumb
- 현재 페이지 위치 표시
- 네비게이션 편의성 제공

## 2. 폼 & 입력 컴포넌트

### - [x] Input
- 기본 텍스트 입력 필드
- 타입별 변형 (email, password, text, number)
- 유효성 검사 상태 표시

### - [x] Button
- 다양한 스타일 변형
- Primary, Secondary, Outline, Ghost 등
- 로딩 상태 및 비활성화 지원

### - [x] Checkbox
- 약관 동의
- 기억하기 옵션
- 다중 선택 기능

### - [x] Select/Dropdown
- 국가, 지역 선택
- 카테고리 선택
- 검색 가능한 드롭다운

### - [x] FormField
- 라벨 + 입력 + 에러메시지 래퍼
- 통일된 폼 스타일
- 접근성 고려

### - [x] PasswordInput
- 패스워드 표시/숨김 토글
- 강도 표시 기능
- 확인 입력 검증

## 3. 카드 & 레이아웃 컴포넌트

### - [x] Card
- 기본 카드 컴포넌트
- 그림자, 테두리 등 스타일 변형
- 호버 효과 지원

### - [x] CourseCard
- 강의 미리보기 카드
- 썸네일, 제목, 가격, 평점 포함
- 즐겨찾기, 장바구니 기능

### - [x] Container
- 페이지 최대 너비 제한
- 반응형 패딩 적용

### - [x] Grid/GridItem
- 반응형 그리드 시스템
- 다양한 컬럼 수 지원

### - [x] Section
- 페이지 섹션 구분
- 배경색, 패딩 변형

### - [x] Sidebar
- 카테고리 필터
- 가격 범위 선택
- 접을 수 있는 기능

## 4. UI 피드백 컴포넌트

### - [x] Toast/Notification
- 성공/에러/경고 알림
- 자동 사라짐 기능
- 위치 커스터마이징

### - [x] Loading/Spinner
- 다양한 로딩 상태 표시
- 전체 페이지 및 부분 로딩
- 스켈레톤 UI

### - [x] Modal/Dialog
- 팝업 창
- 배경 오버레이
- ESC 키 및 외부 클릭 닫기

### - [x] Alert
- 경고 및 정보 메시지
- 아이콘 포함
- 닫기 버튼 옵션

### - [x] Badge
- 태그 표시
- 난이도, 카테고리 라벨
- 상태 표시 (NEW, SALE 등)

### - [x] Progress
- 강의 진행률
- 결제 단계 표시
- 애니메이션 효과

## 5. 텍스트 & 타이포그래피

### - [x] Heading
- h1~h6 제목 컴포넌트
- 반응형 크기 조절
- 색상 및 굵기 변형

### - [x] Text/Paragraph
- 본문 텍스트
- 다양한 크기 및 색상
- 줄 간격 조절

### - [x] Link
- 스타일링된 링크
- 호버 효과
- 외부 링크 표시

### - [x] Price
- 가격 표시 컴포넌트
- 할인가, 원가 구분
- 통화 포맷팅

### - [x] Rating
- 별점 표시
- 평균 점수 계산
- 리뷰 수 표시

## 6. 미디어 & 이미지

### - [ ] Image
- 최적화된 이미지 로딩
- 지연 로딩 지원
- 오류 시 대체 이미지

### - [ ] Avatar
- 사용자 프로필 이미지
- 이름 이니셜 대체
- 다양한 크기 지원

### - [ ] VideoPlayer
- 강의 미리보기 영상
- 재생/일시정지 제어
- 썸네일 오버레이

### - [ ] Icon
- Lucide React 기반 아이콘
- 다양한 크기 및 색상
- 일관된 스타일

## 7. 결제 관련 컴포넌트

### - [ ] PriceCard
- 강의 가격 정보
- 할인 정보 표시
- 구매 버튼 포함

### - [ ] PaymentMethod
- 신용카드, 페이팔 등 결제 수단
- 라디오 버튼 선택
- 보안 인증 표시

### - [ ] CouponInput
- 쿠폰 코드 입력
- 적용/취소 기능
- 할인 금액 표시

### - [ ] OrderSummary
- 주문 내역 요약
- 총 금액 계산
- 세금, 할인 정보

### - [ ] PaymentForm
- 결제 정보 입력 폼
- 유효성 검사
- 보안 입력 처리

## 8. 인증 관련 컴포넌트

### - [ ] LoginForm
- 이메일/패스워드 입력
- 기억하기 옵션
- 로그인 상태 관리

### - [ ] SignupForm
- 회원가입 정보 입력
- 실시간 유효성 검사
- 단계별 진행

### - [ ] SocialLoginButton
- Google, Facebook 등 소셜 로그인
- 브랜드 색상 및 아이콘
- OAuth 연동

### - [ ] TermsCheckbox
- 이용약관, 개인정보 동의
- 전체 동의 기능
- 약관 내용 모달 연결

## 9. 기타 유틸리티 컴포넌트

### - [ ] Separator/Divider
- 섹션 구분선
- 다양한 스타일 (실선, 점선)
- 텍스트 포함 구분선

### - [ ] Skeleton
- 로딩 중 스켈레톤 UI
- 컨텐츠 모양 흉내
- 애니메이션 효과

### - [ ] Tooltip
- 추가 정보 표시
- 호버 시 나타남
- 위치 자동 조절

### - [ ] Accordion
- 접을 수 있는 섹션
- FAQ, 상세 정보 표시
- 다중 확장 지원

### - [ ] Tabs
- 탭 네비게이션
- 컨텐츠 영역 전환
- 키보드 접근성

### - [ ] Pagination
- 페이지 번호 표시
- 이전/다음 버튼
- 점프 기능

## 페이지별 주요 컴포넌트 사용

### 홈페이지
- Header, Hero Section, CourseCard Grid
- SearchBar, CategoryFilter, Testimonials
- Newsletter Signup, Footer

### 로그인 페이지
- LoginForm, SocialLoginButton
- ForgotPassword Link, SignupRedirect
- Brand Logo, Background Image

### 회원가입 페이지  
- SignupForm, TermsCheckbox
- PasswordStrength Indicator
- Step Progress, LoginRedirect

### 결제 페이지
- OrderSummary, PaymentForm
- PaymentMethod Selection, CouponInput
- Progress Steps, Security Badges

## shadcn/ui 활용 방안

이 프로젝트는 shadcn/ui를 기반으로 하므로 다음 컴포넌트들을 우선적으로 설치하고 커스터마이징할 수 있습니다:

**기본 컴포넌트:**
- button, input, card, badge, avatar
- dialog, toast, dropdown-menu, tabs
- form, checkbox, select, textarea

**확장 컴포넌트:**
- accordion, alert, breadcrumb, pagination  
- progress, separator, skeleton, tooltip
- sheet, popover, command, calendar

각 컴포넌트는 Tailwind CSS와 TypeScript를 활용하여 일관된 디자인 시스템을 구축할 수 있도록 설계되었습니다.