"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Price } from "@/components/ui/price"
import { Separator } from "@/components/ui/separator"
import { Check, Star, Clock, Users, Play } from "lucide-react"

const priceCardVariants = cva(
  "w-full max-w-sm",
  {
    variants: {
      variant: {
        default: "",
        featured: "ring-2 ring-primary relative",
        compact: "",
      },
      size: {
        sm: "max-w-xs",
        md: "max-w-sm",
        lg: "max-w-md",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface CourseFeature {
  icon?: React.ReactNode
  text: string
  included: boolean
}

interface PriceCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priceCardVariants> {
  title: string
  description?: string
  price: number
  originalPrice?: number
  currency?: "KRW" | "USD" | "EUR" | "JPY"
  discountPercentage?: number
  features?: CourseFeature[]
  rating?: number
  reviewCount?: number
  studentCount?: number
  duration?: string
  videoCount?: number
  badge?: string
  badgeColor?: "default" | "success" | "warning" | "destructive"
  buttonText?: string
  buttonVariant?: "default" | "secondary" | "outline"
  onPurchase?: () => void
  onAddToCart?: () => void
  isLoading?: boolean
  showAddToCart?: boolean
}

const PriceCard = React.forwardRef<HTMLDivElement, PriceCardProps>(
  ({
    className,
    variant,
    size,
    title,
    description,
    price,
    originalPrice,
    currency = "KRW",
    discountPercentage,
    features = [],
    rating,
    reviewCount,
    studentCount,
    duration,
    videoCount,
    badge,
    badgeColor = "default",
    buttonText = "지금 구매하기",
    buttonVariant = "default",
    onPurchase,
    onAddToCart,
    isLoading = false,
    showAddToCart = false,
    ...props
  }, ref) => {
    const hasDiscount = originalPrice && originalPrice > price
    
    return (
      <Card 
        ref={ref} 
        className={cn(priceCardVariants({ variant, size }), className)} 
        {...props}
      >
        {variant === "featured" && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="px-3 py-1">인기 강의</Badge>
          </div>
        )}
        
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg text-left flex-1">{title}</CardTitle>
            {badge && (
              <Badge variant={badgeColor === "default" ? "default" : "secondary"} className="ml-2">
                {badge}
              </Badge>
            )}
          </div>
          
          {description && (
            <CardDescription className="text-left text-sm">
              {description}
            </CardDescription>
          )}

          {/* 평점 및 통계 */}
          {(rating || studentCount || duration || videoCount) && (
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-3">
              {rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{rating}</span>
                  {reviewCount && (
                    <span>({reviewCount.toLocaleString()})</span>
                  )}
                </div>
              )}
              
              {studentCount && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{studentCount.toLocaleString()}명</span>
                </div>
              )}
              
              {duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{duration}</span>
                </div>
              )}
              
              {videoCount && (
                <div className="flex items-center gap-1">
                  <Play className="h-4 w-4" />
                  <span>{videoCount}개 강의</span>
                </div>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 가격 섹션 */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Price
                amount={price}
                originalAmount={originalPrice}
                currency={currency}
                size="lg"
                className="text-2xl font-bold"
              />
            </div>
            
            {hasDiscount && discountPercentage && (
              <Badge variant="destructive" className="text-sm">
                {discountPercentage}% 할인
              </Badge>
            )}
          </div>

          {/* 기능 목록 */}
          {features.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium text-sm">포함 내용</h4>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li 
                      key={index}
                      className={cn(
                        "flex items-start gap-2 text-sm",
                        !feature.included && "text-muted-foreground"
                      )}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {feature.icon || (
                          <Check 
                            className={cn(
                              "h-4 w-4",
                              feature.included 
                                ? "text-green-500" 
                                : "text-muted-foreground"
                            )} 
                          />
                        )}
                      </div>
                      <span className={cn(
                        !feature.included && "line-through"
                      )}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* 구매 버튼들 */}
          <div className="space-y-2 pt-4">
            <Button
              className="w-full"
              variant={buttonVariant}
              onClick={onPurchase}
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? "처리 중..." : buttonText}
            </Button>
            
            {showAddToCart && onAddToCart && (
              <Button
                className="w-full"
                variant="outline"
                onClick={onAddToCart}
                disabled={isLoading}
              >
                장바구니 추가
              </Button>
            )}
          </div>

          {/* 보장/정책 정보 */}
          <div className="text-center text-xs text-muted-foreground pt-2 border-t">
            <p>30일 환불 보장 • 평생 수강 • 수료증 제공</p>
          </div>
        </CardContent>
      </Card>
    )
  }
)

PriceCard.displayName = "PriceCard"

export { PriceCard, priceCardVariants, type PriceCardProps, type CourseFeature }