import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Toaster } from '@/components/ui/sonner'
import { 
  Navigation,
  Palette,
  Layout,
  MessageSquare,
  Type,
  Image,
  CreditCard,
  Shield,
  MoreHorizontal
} from 'lucide-react'

const componentCategories = [
  {
    title: '네비게이션 & 헤더',
    href: '/components/navigation',
    icon: Navigation,
    description: 'Header, Logo, UserMenu, SearchBar, BreadCrumb',
    items: ['Header', 'Logo', 'UserMenu', 'SearchBar', 'BreadCrumb']
  },
  {
    title: '폼 & 입력',
    href: '/components/forms',
    icon: Palette,
    description: 'Input, Button, Checkbox, Select, FormField',
    items: ['Input', 'Button', 'Checkbox', 'Select', 'FormField', 'PasswordInput']
  },
  {
    title: '카드 & 레이아웃',
    href: '/components/layout',
    icon: Layout,
    description: 'Card, CourseCard, Container, Grid, Section',
    items: ['Card', 'CourseCard', 'Container', 'Grid', 'Section', 'Sidebar']
  },
  {
    title: 'UI 피드백',
    href: '/components/feedback',
    icon: MessageSquare,
    description: 'Toast, Loading, Modal, Alert, Badge, Progress',
    items: ['Toast', 'Loading', 'Modal', 'Alert', 'Badge', 'Progress']
  },
  {
    title: '텍스트 & 타이포그래피',
    href: '/components/typography',
    icon: Type,
    description: 'Heading, Text, Link, Price, Rating',
    items: ['Heading', 'Text', 'Link', 'Price', 'Rating']
  },
  {
    title: '미디어 & 이미지',
    href: '/components/media',
    icon: Image,
    description: 'Image, Avatar, VideoPlayer, Icon',
    items: ['Image', 'Avatar', 'VideoPlayer', 'Icon']
  },
  {
    title: '결제 관련',
    href: '/components/payment',
    icon: CreditCard,
    description: 'PriceCard, PaymentMethod, CouponInput, OrderSummary',
    items: ['PriceCard', 'PaymentMethod', 'CouponInput', 'OrderSummary', 'PaymentForm']
  },
  {
    title: '인증 관련',
    href: '/components/auth',
    icon: Shield,
    description: 'LoginForm, SignupForm, SocialLoginButton, TermsCheckbox',
    items: ['LoginForm', 'SignupForm', 'SocialLoginButton', 'TermsCheckbox']
  },
  {
    title: '유틸리티',
    href: '/components/utility',
    icon: MoreHorizontal,
    description: 'Separator, Skeleton, Tooltip, Accordion, Tabs, Pagination',
    items: ['Separator', 'Skeleton', 'Tooltip', 'Accordion', 'Tabs', 'Pagination']
  }
]

interface ComponentsLayoutProps {
  children: React.ReactNode
}

export default function ComponentsLayout({ children }: ComponentsLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-primary rounded"></div>
              <span className="font-bold">forif Design System</span>
            </Link>
            <div className="ml-auto">
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link href="/components" className="text-foreground/60 hover:text-foreground">
                  컴포넌트
                </Link>
                <Link href="/docs" className="text-foreground/60 hover:text-foreground">
                  문서
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 shrink-0">
            <div className="sticky top-6 max-h-[calc(100vh-8rem)]">
              <div className="mb-4">
                <h2 className="px-2 py-1 text-lg font-semibold tracking-tight">
                  컴포넌트
                </h2>
              </div>
              <ScrollArea className="h-[calc(100vh-12rem)] px-1">
                <div className="space-y-2">
                  {componentCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <div key={category.href}>
                        <Link
                          href={category.href}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            // TODO: 현재 페이지 활성화 스타일 추가 필요
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {category.title}
                        </Link>
                        <div className="ml-6 space-y-1">
                          {category.items.map((item) => (
                            <Link
                              key={item}
                              href={`${category.href}#${item.toLowerCase()}`}
                              className="block rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}