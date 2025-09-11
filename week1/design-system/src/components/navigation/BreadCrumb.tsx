"use client"

import React from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

export interface BreadCrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadCrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadCrumbItem[]
  separator?: React.ReactNode
  showHome?: boolean
  maxItems?: number
  homeLabel?: string
  homeHref?: string
}

export function BreadCrumb({
  items,
  separator,
  showHome = true,
  maxItems = 4,
  homeLabel = "홈",
  homeHref = "/",
  className,
  ...props
}: BreadCrumbProps) {
  // 홈 아이템 추가
  const allItems = showHome 
    ? [{ label: homeLabel, href: homeHref }, ...items]
    : items

  // maxItems 제한 적용
  const displayItems = allItems.length > maxItems 
    ? [
        allItems[0], // 첫번째 (홈)
        { label: "...", href: undefined }, // 생략 표시
        ...allItems.slice(-(maxItems - 2)) // 마지막 몇개
      ]
    : allItems

  return (
    <Breadcrumb className={cn(className)} {...props}>
      <BreadcrumbList>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1
          const isEllipsis = item.label === "..."
          const isHome = index === 0 && showHome

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {isEllipsis ? (
                  <BreadcrumbEllipsis />
                ) : isLast || !item.href ? (
                  <BreadcrumbPage>
                    {isHome ? (
                      <span className="flex items-center">
                        <Home className="mr-1 h-4 w-4" />
                        {item.label}
                      </span>
                    ) : (
                      item.label
                    )}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>
                      {isHome ? (
                        <span className="flex items-center">
                          <Home className="mr-1 h-4 w-4" />
                          {item.label}
                        </span>
                      ) : (
                        item.label
                      )}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator>
                  {separator}
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

// 편의를 위한 타입은 이미 상단에서 export됨

// 사용 예시를 위한 데모 훅
export function useBreadcrumb(pathname: string): BreadCrumbItem[] {
  return React.useMemo(() => {
    if (!pathname || pathname === '/') return []
    
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadCrumbItem[] = []
    
    segments.forEach((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/')
      const isLast = index === segments.length - 1
      
      // URL 세그먼트를 읽기 쉬운 라벨로 변환
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      breadcrumbs.push({
        label,
        href: isLast ? undefined : href,
        current: isLast
      })
    })
    
    return breadcrumbs
  }, [pathname])
}