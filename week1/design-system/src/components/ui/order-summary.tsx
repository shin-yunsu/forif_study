"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Price } from "@/components/ui/price"
import { ShoppingCart, Tag, Gift, CreditCard, Info } from "lucide-react"

const orderSummaryVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        compact: "",
        detailed: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface OrderItem {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  quantity?: number
  thumbnail?: string
  badge?: string
  badgeColor?: "default" | "success" | "warning" | "destructive"
}

interface OrderDiscount {
  type: "coupon" | "promotion" | "bulk" | "member"
  name: string
  code?: string
  amount: number
  description?: string
}

interface OrderTax {
  name: string
  rate: number
  amount: number
}

interface OrderSummaryProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof orderSummaryVariants> {
  items: OrderItem[]
  discounts?: OrderDiscount[]
  taxes?: OrderTax[]
  shippingCost?: number
  currency?: "KRW" | "USD" | "EUR" | "JPY"
  showItemDetails?: boolean
  showTaxBreakdown?: boolean
  showDiscountDetails?: boolean
  onEditCart?: () => void
  onApplyCoupon?: () => void
  editable?: boolean
  footer?: React.ReactNode
  title?: string
}

const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  ({
    className,
    variant,
    items,
    discounts = [],
    taxes = [],
    shippingCost = 0,
    currency = "KRW",
    showItemDetails = true,
    showTaxBreakdown = false,
    showDiscountDetails = true,
    onEditCart,
    onApplyCoupon,
    editable = false,
    footer,
    title = "주문 요약",
    ...props
  }, ref) => {
    // 계산
    const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
    const totalDiscounts = discounts.reduce((sum, discount) => sum + discount.amount, 0)
    const totalTaxes = taxes.reduce((sum, tax) => sum + tax.amount, 0)
    const total = subtotal - totalDiscounts + totalTaxes + shippingCost

    const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0)
    const totalSavings = items.reduce((sum, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return sum + ((item.originalPrice - item.price) * (item.quantity || 1))
      }
      return sum
    }, 0) + totalDiscounts

    const formatItemPrice = (item: OrderItem) => {
      const quantity = item.quantity || 1
      if (quantity === 1) {
        return item.price.toLocaleString()
      }
      return `${item.price.toLocaleString()} × ${quantity}`
    }

    const formatItemTotal = (item: OrderItem) => {
      const total = item.price * (item.quantity || 1)
      return total.toLocaleString()
    }

    return (
      <Card ref={ref} className={cn(orderSummaryVariants({ variant }), className)} {...props}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {title}
            </CardTitle>
            {editable && onEditCart && (
              <Button variant="ghost" size="sm" onClick={onEditCart}>
                편집
              </Button>
            )}
          </div>
          {totalItems > 0 && (
            <p className="text-sm text-muted-foreground">
              {totalItems}개 항목
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 주문 항목들 */}
          {showItemDetails && items.length > 0 && (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id || index} className="flex items-start justify-between gap-3">
                  <div className="flex gap-3 flex-1 min-w-0">
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        {item.badge && (
                          <Badge 
                            variant={item.badgeColor === "default" ? "default" : "secondary"}
                            className="text-xs px-1 py-0"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      )}
                      {variant === "detailed" && (
                        <div className="text-xs text-muted-foreground mt-2">
                          {formatItemPrice(item)}원
                          {item.quantity && item.quantity > 1 && (
                            <span className="ml-1">= {formatItemTotal(item)}원</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-medium text-sm">
                      {formatItemTotal(item)}원
                    </div>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <div className="text-xs text-muted-foreground line-through">
                        {(item.originalPrice * (item.quantity || 1)).toLocaleString()}원
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>장바구니가 비어있습니다</p>
            </div>
          )}

          {items.length > 0 && (
            <>
              <Separator />

              {/* 계산 섹션 */}
              <div className="space-y-2">
                {/* 소계 */}
                <div className="flex justify-between text-sm">
                  <span>소계</span>
                  <span>{subtotal.toLocaleString()}원</span>
                </div>

                {/* 할인 */}
                {discounts.length > 0 && (
                  <>
                    {showDiscountDetails ? (
                      discounts.map((discount, index) => (
                        <div key={index} className="flex justify-between text-sm text-green-600">
                          <div className="flex items-center gap-1">
                            {discount.type === "coupon" ? (
                              <Tag className="h-3 w-3" />
                            ) : (
                              <Gift className="h-3 w-3" />
                            )}
                            <span>{discount.name}</span>
                            {discount.code && (
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                {discount.code}
                              </Badge>
                            )}
                          </div>
                          <span>-{discount.amount.toLocaleString()}원</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>할인</span>
                        <span>-{totalDiscounts.toLocaleString()}원</span>
                      </div>
                    )}
                  </>
                )}

                {/* 배송비 */}
                {shippingCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>배송비</span>
                    <span>{shippingCost.toLocaleString()}원</span>
                  </div>
                )}

                {/* 세금 */}
                {taxes.length > 0 && (
                  <>
                    {showTaxBreakdown ? (
                      taxes.map((tax, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{tax.name} ({tax.rate}%)</span>
                          <span>{tax.amount.toLocaleString()}원</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-between text-sm">
                        <span>세금</span>
                        <span>{totalTaxes.toLocaleString()}원</span>
                      </div>
                    )}
                  </>
                )}

                {/* 총 절약 금액 */}
                {totalSavings > 0 && variant === "detailed" && (
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>총 절약</span>
                    <span>{totalSavings.toLocaleString()}원</span>
                  </div>
                )}
              </div>

              <Separator />

              {/* 총합 */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>총 결제금액</span>
                <Price amount={total} currency={currency} size="lg" />
              </div>

              {/* 쿠폰 적용 버튼 */}
              {onApplyCoupon && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onApplyCoupon}
                >
                  <Tag className="h-4 w-4 mr-2" />
                  쿠폰 적용하기
                </Button>
              )}

              {/* 추가 정보 */}
              {variant === "detailed" && (
                <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p>• 결제 완료 후 즉시 수강 가능합니다</p>
                      <p>• 30일 환불 보장이 적용됩니다</p>
                      <p>• 평생 수강 가능한 디지털 상품입니다</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Footer 섹션 */}
          {footer && (
            <>
              <Separator />
              {footer}
            </>
          )}
        </CardContent>
      </Card>
    )
  }
)

OrderSummary.displayName = "OrderSummary"

export { 
  OrderSummary, 
  orderSummaryVariants, 
  type OrderSummaryProps, 
  type OrderItem, 
  type OrderDiscount, 
  type OrderTax 
}