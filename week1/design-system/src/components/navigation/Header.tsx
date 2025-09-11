"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Menu, X, Search } from 'lucide-react'
import { Logo } from './Logo'
import { UserMenu } from './UserMenu'
import { SearchBar } from './SearchBar'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean
  variant?: 'default' | 'transparent' | 'bordered'
  showSearch?: boolean
}

export function Header({ 
  className, 
  sticky = true, 
  variant = 'default',
  showSearch = true,
  ...props 
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const headerVariants = {
    default: 'bg-background border-b border-border',
    transparent: 'bg-transparent',
    bordered: 'bg-background border-b-2 border-primary'
  }

  return (
    <header 
      className={cn(
        'w-full z-50 transition-all duration-200',
        sticky && 'sticky top-0',
        headerVariants[variant],
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo and Main Navigation */}
          <div className="flex items-center space-x-8">
            <Logo />
            
            {/* Desktop Navigation using shadcn NavigationMenu */}
            <div className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>강의</NavigationMenuTrigger>
                    <NavigationMenuContent className="!bg-background !text-foreground border border-border shadow-lg rounded-md">
                      <div className="grid gap-3 p-6 w-[400px]">
                        <NavigationMenuLink 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/courses/all"
                        >
                          <div className="text-sm font-medium leading-none">전체 강의</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            모든 강의를 한번에 확인하세요
                          </p>
                        </NavigationMenuLink>
                        <NavigationMenuLink 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/courses/popular"
                        >
                          <div className="text-sm font-medium leading-none">인기 강의</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            가장 많이 수강하는 인기 강의들
                          </p>
                        </NavigationMenuLink>
                        <NavigationMenuLink 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/courses/new"
                        >
                          <div className="text-sm font-medium leading-none">신규 강의</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            최근에 등록된 새로운 강의들
                          </p>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>카테고리</NavigationMenuTrigger>
                    <NavigationMenuContent className="!bg-background !text-foreground border border-border shadow-lg rounded-md">
                      <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                        <NavigationMenuLink 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/categories/programming"
                        >
                          <div className="text-sm font-medium leading-none">프로그래밍</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            웹 개발, 앱 개발, 데이터 사이언스
                          </p>
                        </NavigationMenuLink>
                        <NavigationMenuLink 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/categories/design"
                        >
                          <div className="text-sm font-medium leading-none">디자인</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            UI/UX, 그래픽 디자인, 영상 편집
                          </p>
                        </NavigationMenuLink>
                        <NavigationMenuLink 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/categories/business"
                        >
                          <div className="text-sm font-medium leading-none">비즈니스</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            마케팅, 창업, 경영 전략
                          </p>
                        </NavigationMenuLink>
                        <NavigationMenuLink 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/categories/language"
                        >
                          <div className="text-sm font-medium leading-none">언어</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            영어, 중국어, 일본어
                          </p>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/instructors" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                      강사
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                      소개
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Center Section - Search (Desktop) */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar showSearchButton={false} />
            </div>
          )}

          {/* Right Section - User Menu and Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            {showSearch && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => {/* 모바일 검색 토글 로직 */}}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">검색</span>
              </Button>
            )}
            
            <UserMenu />
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">메뉴</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              {showSearch && (
                <div className="px-3 py-2">
                  <SearchBar showSearchButton={false} />
                </div>
              )}
              
              {/* Mobile Navigation Links */}
              <a
                href="/courses"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                강의
              </a>
              <a
                href="/categories"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                카테고리
              </a>
              <a
                href="/instructors"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                강사
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                소개
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}