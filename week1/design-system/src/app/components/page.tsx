import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Navigation,
  Palette,
  Layout,
  MessageSquare,
  Type,
  Image,
  CreditCard,
  Shield,
  MoreHorizontal,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react'

const componentCategories = [
  {
    title: '네비게이션 & 헤더',
    href: '/components/navigation',
    icon: Navigation,
    description: '사이트 전체 네비게이션과 헤더 관련 컴포넌트들',
    count: 5,
    status: 'completed',
    items: ['Header/Navigation', 'Logo', 'UserMenu', 'SearchBar', 'BreadCrumb']
  },
  {
    title: '폼 & 입력',
    href: '/components/forms',
    icon: Palette,
    description: '사용자 입력과 폼 처리를 위한 컴포넌트들',
    count: 6,
    status: 'completed',
    items: ['Input', 'Button', 'Checkbox', 'Select', 'FormField', 'PasswordInput']
  },
  {
    title: '카드 & 레이아웃',
    href: '/components/layout',
    icon: Layout,
    description: '페이지 레이아웃과 콘텐츠 구조화를 위한 컴포넌트들',
    count: 6,
    status: 'completed',
    items: ['Card', 'CourseCard', 'Container', 'Grid', 'Section', 'Sidebar']
  },
  {
    title: 'UI 피드백',
    href: '/components/feedback',
    icon: MessageSquare,
    description: '사용자 피드백과 상태 표시를 위한 컴포넌트들',
    count: 6,
    status: 'completed',
    items: ['Toast', 'Loading', 'Modal', 'Alert', 'Badge', 'Progress']
  },
  {
    title: '텍스트 & 타이포그래피',
    href: '/components/typography',
    icon: Type,
    description: '텍스트 표시와 타이포그래피 관련 컴포넌트들',
    count: 5,
    status: 'completed',
    items: ['Heading', 'Text', 'Link', 'Price', 'Rating']
  },
  {
    title: '미디어 & 이미지',
    href: '/components/media',
    icon: Image,
    description: '이미지, 비디오 등 미디어 처리 컴포넌트들',
    count: 4,
    status: 'completed',
    items: ['Image', 'Avatar', 'VideoPlayer', 'Icon']
  },
  {
    title: '결제 관련',
    href: '/components/payment',
    icon: CreditCard,
    description: '결제 프로세스와 관련된 전용 컴포넌트들',
    count: 5,
    status: 'completed',
    items: ['PriceCard', 'PaymentMethod', 'CouponInput', 'OrderSummary', 'PaymentForm']
  },
  {
    title: '인증 관련',
    href: '/components/auth',
    icon: Shield,
    description: '로그인, 회원가입 등 인증 관련 컴포넌트들',
    count: 4,
    status: 'completed',
    items: ['LoginForm', 'SignupForm', 'SocialLoginButton', 'TermsCheckbox']
  },
  {
    title: '유틸리티',
    href: '/components/utilities',
    icon: MoreHorizontal,
    description: '다양한 유틸리티와 보조 기능 컴포넌트들',
    count: 8,
    status: 'completed',
    items: ['Separator', 'Tabs', 'Accordion', 'Avatar', 'Tooltip', 'Pagination', 'Image', 'VideoPlayer']
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          완료
        </Badge>
      )
    case 'in-progress':
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          진행중
        </Badge>
      )
    case 'planned':
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          계획됨
        </Badge>
      )
    default:
      return <Badge variant="outline">미정</Badge>
  }
}

export default function ComponentsIndexPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          forif 디자인 시스템 컴포넌트
        </h1>
        <p className="text-lg text-muted-foreground">
          온라인 강의사이트를 위한 재사용 가능한 UI 컴포넌트 라이브러리
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">컴포넌트 카테고리</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">46</div>
            <p className="text-xs text-muted-foreground">총 컴포넌트 수</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">46</div>
            <p className="text-xs text-muted-foreground">완료된 컴포넌트</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">계획된 컴포넌트</p>
          </CardContent>
        </Card>
      </div>

      {/* Component Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {componentCategories.map((category) => {
          const Icon = category.icon
          return (
            <Card key={category.href} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={category.href}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                    {getStatusBadge(category.status)}
                  </div>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">컴포넌트 수</span>
                      <span className="font-medium">{category.count}개</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {category.items.join(', ')}
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            이 디자인 시스템은 <strong>shadcn/ui</strong>를 기반으로 구축되었으며, 
            TypeScript와 Tailwind CSS를 사용합니다.
          </p>
          <p className="mt-2">
            각 컴포넌트는 접근성, 반응형 디자인, 그리고 재사용성을 고려하여 설계되었습니다.
          </p>
        </div>
      </div>
    </div>
  )
}