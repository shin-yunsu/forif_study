"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Settings, 
  BookOpen, 
  Heart, 
  CreditCard, 
  LogOut,
  ShoppingCart 
} from 'lucide-react'

interface UserMenuProps {
  isLoggedIn?: boolean
  user?: {
    name: string
    email: string
    avatar?: string
  }
  onLogout?: () => void
}

export function UserMenu({ 
  isLoggedIn = false,
  user,
  onLogout
}: UserMenuProps) {
  // 로그인되지 않은 상태
  if (!isLoggedIn || !user) {
    return (
      <div className="flex items-center space-x-2">
        <Link href="/login">
          <Button
            variant="ghost"
            size="sm"
          >
            로그인
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            size="sm"
          >
            회원가입
          </Button>
        </Link>
      </div>
    )
  }

  // 사용자 이름에서 이니셜 생성
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  // 로그인된 상태
  return (
    <div className="flex items-center space-x-2">
      {/* 장바구니 버튼 */}
      <Button variant="ghost" size="icon">
        <ShoppingCart className="h-4 w-4" />
        <span className="sr-only">장바구니</span>
      </Button>

      {/* 사용자 드롭다운 메뉴 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xs">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>프로필</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>내 강의</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Heart className="mr-2 h-4 w-4" />
            <span>위시리스트</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>결제 내역</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>설정</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={onLogout} variant="destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}