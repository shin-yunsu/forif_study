"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Copy, Code } from 'lucide-react'

// 구현한 컴포넌트들 import
import { Header } from '@/components/navigation/Header'
import { Logo } from '@/components/navigation/Logo'
import { UserMenu } from '@/components/navigation/UserMenu'
import { SearchBar } from '@/components/navigation/SearchBar'
import { BreadCrumb } from '@/components/navigation/BreadCrumb'
import { getConsistentAvatar } from '@/lib/sample-images'

interface ComponentDemoProps {
  title: string
  description: string
  children: React.ReactNode
  code?: string
}

function ComponentDemo({ title, description, children, code }: ComponentDemoProps) {
  const [copied, setCopied] = React.useState(false)

  const copyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge variant="outline">완료</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">미리보기</TabsTrigger>
            <TabsTrigger value="code">코드</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-4">
            <div className="rounded-lg border bg-card p-6">
              {children}
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="mt-4">
            <div className="relative">
              <Button
                size="sm"
                variant="outline"
                className="absolute right-2 top-2 z-10"
                onClick={copyCode}
              >
                {copied ? '복사됨!' : <><Copy className="h-4 w-4 mr-2" />복사</>}
              </Button>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                <code>{code || '// 코드 예시가 준비 중입니다.'}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default function NavigationComponentsPage() {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false)

  const sampleUser = {
    name: '김개발',
    email: 'kim.dev@learnhub.com',
    avatar: getConsistentAvatar('nav-user')
  }

  const breadcrumbItems = [
    { label: '강의', href: '/courses' },
    { label: '프로그래밍', href: '/courses/programming' },
    { label: 'React 마스터하기' }
  ]

  const searchSuggestions = [
    'React 기초',
    'Next.js 실전',
    'TypeScript 입문',
    'JavaScript 심화',
    'Node.js 백엔드',
    'Vue.js 시작하기'
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          네비게이션 & 헤더 컴포넌트
        </h1>
        <p className="text-lg text-muted-foreground">
          사이트 전체 네비게이션과 헤더 관련 컴포넌트들
        </p>
      </div>

      {/* Header Component */}
      <ComponentDemo
        title="Header / Navigation"
        description="사이트 전체 네비게이션 바. 로고, 메뉴, 사용자 정보를 포함하며 반응형 디자인을 지원합니다."
        code={`<Header 
  variant="default" 
  sticky={true} 
  showSearch={true}
/>`}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">기본 헤더</h4>
            <Header variant="default" sticky={false} />
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-2">투명 헤더</h4>
            <Header variant="transparent" sticky={false} />
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-2">테두리 강조 헤더</h4>
            <Header variant="bordered" sticky={false} />
          </div>
        </div>
      </ComponentDemo>

      {/* Logo Component */}
      <ComponentDemo
        title="Logo"
        description="클릭 시 홈으로 이동하며 브랜드 아이덴티티를 표현합니다."
        code={`<Logo 
  size="md" 
  variant="default" 
  hideText={false} 
/>`}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">크기 변형</h4>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <Logo size="sm" />
                <p className="text-xs text-muted-foreground mt-2">Small</p>
              </div>
              <div className="text-center">
                <Logo size="md" />
                <p className="text-xs text-muted-foreground mt-2">Medium</p>
              </div>
              <div className="text-center">
                <Logo size="lg" />
                <p className="text-xs text-muted-foreground mt-2">Large</p>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">색상 변형</h4>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <Logo variant="default" />
                <p className="text-xs text-muted-foreground mt-2">Default</p>
              </div>
              <div className="text-center bg-black p-4 rounded">
                <Logo variant="white" />
                <p className="text-xs text-white mt-2">White</p>
              </div>
              <div className="text-center bg-gray-100 p-4 rounded">
                <Logo variant="dark" />
                <p className="text-xs text-muted-foreground mt-2">Dark</p>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">아이콘만 표시</h4>
            <Logo hideText />
          </div>
        </div>
      </ComponentDemo>

      {/* UserMenu Component */}
      <ComponentDemo
        title="UserMenu"
        description="로그인 상태에 따른 조건부 렌더링. 프로필, 설정, 로그아웃 등의 드롭다운 메뉴를 제공합니다."
        code={`<UserMenu 
  isLoggedIn={true}
  user={{
    name: '김개발',
    email: 'kim.dev@learnhub.com',
    avatar: getConsistentAvatar('nav-user')
  }}
/>`}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">로그인 상태</h4>
            <div className="flex justify-between items-center">
              <UserMenu 
                isLoggedIn={isUserLoggedIn}
                user={isUserLoggedIn ? sampleUser : undefined}
                onLogin={() => setIsUserLoggedIn(true)}
                onSignup={() => console.log('회원가입')}
                onLogout={() => setIsUserLoggedIn(false)}
              />
              <Button 
                variant="outline" 
                onClick={() => setIsUserLoggedIn(!isUserLoggedIn)}
              >
                {isUserLoggedIn ? '로그아웃 상태로 변경' : '로그인 상태로 변경'}
              </Button>
            </div>
          </div>
        </div>
      </ComponentDemo>

      {/* SearchBar Component */}
      <ComponentDemo
        title="SearchBar"
        description="강의 검색 기능. 자동완성 및 필터 연동을 지원합니다."
        code={`<SearchBar 
  placeholder="강의를 검색해보세요..."
  autoComplete={suggestions}
  onSearch={(query) => console.log(query)}
/>`}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">기본 검색바</h4>
            <SearchBar 
              placeholder="강의를 검색해보세요..."
              autoComplete={searchSuggestions}
              onSearch={(query) => console.log('검색:', query)}
            />
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">크기 변형</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Small</p>
                <SearchBar size="sm" showSearchButton={false} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Medium</p>
                <SearchBar size="md" showSearchButton={false} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Large</p>
                <SearchBar size="lg" showSearchButton={false} />
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">검색 버튼 포함</h4>
            <SearchBar 
              showSearchButton={true}
              autoComplete={searchSuggestions}
            />
          </div>
        </div>
      </ComponentDemo>

      {/* BreadCrumb Component */}
      <ComponentDemo
        title="BreadCrumb"
        description="현재 페이지 위치를 표시하여 네비게이션 편의성을 제공합니다."
        code={`<BreadCrumb 
  items={[
    { label: '강의', href: '/courses' },
    { label: '프로그래밍', href: '/courses/programming' },
    { label: 'React 마스터하기' }
  ]}
/>`}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">기본 브레드크럼</h4>
            <BreadCrumb items={breadcrumbItems} />
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">홈 아이콘 없음</h4>
            <BreadCrumb items={breadcrumbItems} showHome={false} />
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">긴 경로 (maxItems=3)</h4>
            <BreadCrumb 
              items={[
                { label: '강의', href: '/courses' },
                { label: '프로그래밍', href: '/courses/programming' },
                { label: 'Frontend', href: '/courses/programming/frontend' },
                { label: 'React', href: '/courses/programming/frontend/react' },
                { label: 'React 마스터하기' }
              ]}
              maxItems={3}
            />
          </div>
        </div>
      </ComponentDemo>

      {/* Usage Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="h-5 w-5 mr-2" />
            사용 가이드
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <h4>설치</h4>
          <pre className="bg-muted p-3 rounded text-sm">
            <code>{`// 개별 컴포넌트 import
import { Header, Logo, UserMenu, SearchBar, BreadCrumb } from '@/components/navigation'

// 또는 필요한 것만 import
import { Header } from '@/components/navigation/Header'`}</code>
          </pre>

          <h4>주요 특징</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>반응형 디자인</strong>: 모든 컴포넌트는 모바일과 데스크톱에서 최적화됩니다</li>
            <li><strong>접근성</strong>: ARIA 속성과 키보드 네비게이션을 지원합니다</li>
            <li><strong>커스터마이징</strong>: variants와 props를 통해 쉽게 커스터마이징할 수 있습니다</li>
            <li><strong>TypeScript</strong>: 완전한 타입 안전성을 제공합니다</li>
          </ul>

          <h4>페이지별 권장 조합</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-muted p-3 rounded">
              <h5 className="font-medium">홈페이지</h5>
              <p>Header + Logo + SearchBar + UserMenu</p>
            </div>
            <div className="bg-muted p-3 rounded">
              <h5 className="font-medium">상세 페이지</h5>
              <p>Header + BreadCrumb + UserMenu</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}