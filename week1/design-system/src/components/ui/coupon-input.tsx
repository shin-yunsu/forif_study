"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X, Tag, Percent, Gift, AlertCircle } from "lucide-react"

const couponInputVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        inline: "flex items-end gap-2",
        card: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AppliedCoupon {
  code: string
  name: string
  discountType: "percentage" | "fixed"
  discountValue: number
  discountAmount: number
  maxDiscount?: number
  description?: string
}

interface CouponInputProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof couponInputVariants> {
  label?: string
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  onApply?: (code: string) => Promise<AppliedCoupon | null>
  onRemove?: (code: string) => void
  appliedCoupons?: AppliedCoupon[]
  isLoading?: boolean
  disabled?: boolean
  maxCoupons?: number
  showSuggestions?: boolean
  suggestions?: string[]
  error?: string
}

const CouponInput = React.forwardRef<HTMLDivElement, CouponInputProps>(
  ({
    className,
    variant,
    label = "쿠폰 코드",
    placeholder = "쿠폰 코드를 입력하세요",
    value = "",
    onValueChange,
    onApply,
    onRemove,
    appliedCoupons = [],
    isLoading = false,
    disabled = false,
    maxCoupons = 3,
    showSuggestions = false,
    suggestions = [],
    error,
    ...props
  }, ref) => {
    const [inputValue, setInputValue] = React.useState(value)
    const [localError, setLocalError] = React.useState<string>("")
    const [showSuggestionsDropdown, setShowSuggestionsDropdown] = React.useState(false)

    React.useEffect(() => {
      setInputValue(value)
    }, [value])

    const handleInputChange = (newValue: string) => {
      setInputValue(newValue)
      onValueChange?.(newValue)
      setLocalError("")
      
      if (showSuggestions && newValue) {
        setShowSuggestionsDropdown(true)
      } else {
        setShowSuggestionsDropdown(false)
      }
    }

    const handleApply = async () => {
      if (!inputValue.trim()) {
        setLocalError("쿠폰 코드를 입력해주세요")
        return
      }

      if (appliedCoupons.length >= maxCoupons) {
        setLocalError(`최대 ${maxCoupons}개의 쿠폰만 적용 가능합니다`)
        return
      }

      if (appliedCoupons.some(coupon => coupon.code === inputValue.trim())) {
        setLocalError("이미 적용된 쿠폰입니다")
        return
      }

      try {
        const result = await onApply?.(inputValue.trim())
        if (result) {
          setInputValue("")
          setLocalError("")
        } else {
          setLocalError("유효하지 않은 쿠폰 코드입니다")
        }
      } catch (err) {
        setLocalError("쿠폰 적용 중 오류가 발생했습니다")
      }
    }

    const handleSuggestionClick = (suggestion: string) => {
      setInputValue(suggestion)
      onValueChange?.(suggestion)
      setShowSuggestionsDropdown(false)
    }

    const formatDiscount = (coupon: AppliedCoupon) => {
      if (coupon.discountType === "percentage") {
        return `${coupon.discountValue}% 할인`
      } else {
        return `${coupon.discountValue.toLocaleString()}원 할인`
      }
    }

    const formatDiscountAmount = (amount: number) => {
      return `-${amount.toLocaleString()}원`
    }

    const displayError = error || localError

    if (variant === "inline") {
      return (
        <div ref={ref} className={cn(couponInputVariants({ variant }), className)} {...props}>
          <div className="flex-1">
            {label && (
              <Label className="text-sm font-medium mb-2 block">{label}</Label>
            )}
            <div className="relative">
              <Input
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleApply()
                  }
                }}
                disabled={disabled || isLoading}
                className={cn(displayError && "border-destructive")}
              />
              <Tag className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <Button
            onClick={handleApply}
            disabled={disabled || isLoading || !inputValue.trim()}
            className="shrink-0"
          >
            {isLoading ? "확인 중..." : "적용"}
          </Button>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn(couponInputVariants({ variant }), className)} {...props}>
        {variant === "card" ? (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                <h3 className="font-medium">쿠폰 적용</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder={placeholder}
                      value={inputValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleApply()
                        }
                      }}
                      disabled={disabled || isLoading}
                      className={cn(displayError && "border-destructive")}
                    />
                    <Tag className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                  <Button
                    onClick={handleApply}
                    disabled={disabled || isLoading || !inputValue.trim()}
                  >
                    {isLoading ? "확인 중..." : "적용"}
                  </Button>
                </div>

                {displayError && (
                  <div className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{displayError}</span>
                  </div>
                )}
              </div>

              {/* 적용된 쿠폰들 */}
              {appliedCoupons.length > 0 && (
                <div className="space-y-3 pt-2 border-t">
                  <h4 className="text-sm font-medium text-muted-foreground">적용된 쿠폰</h4>
                  <div className="space-y-2">
                    {appliedCoupons.map((coupon, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                            {coupon.discountType === "percentage" ? (
                              <Percent className="h-4 w-4 text-green-600" />
                            ) : (
                              <Tag className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{coupon.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {coupon.code}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {formatDiscount(coupon)}
                            </p>
                            {coupon.description && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {coupon.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-green-600">
                            {formatDiscountAmount(coupon.discountAmount)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            onClick={() => onRemove?.(coupon.code)}
                            disabled={disabled}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 쿠폰 적용 제한 안내 */}
              {appliedCoupons.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {appliedCoupons.length}/{maxCoupons}개 쿠폰 적용됨
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {label && (
              <Label className="text-sm font-medium">{label}</Label>
            )}
            
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleApply()
                    }
                  }}
                  disabled={disabled || isLoading}
                  className={cn(displayError && "border-destructive")}
                />
                <Tag className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
                {/* 제안 드롭다운 */}
                {showSuggestionsDropdown && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-popover border rounded-md shadow-md mt-1">
                    <div className="p-1">
                      {suggestions
                        .filter(suggestion => 
                          suggestion.toLowerCase().includes(inputValue.toLowerCase())
                        )
                        .slice(0, 5)
                        .map((suggestion, index) => (
                          <button
                            key={index}
                            className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>
              <Button
                onClick={handleApply}
                disabled={disabled || isLoading || !inputValue.trim()}
              >
                {isLoading ? "확인 중..." : "적용"}
              </Button>
            </div>

            {displayError && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>{displayError}</span>
              </div>
            )}

            {/* 간단한 적용된 쿠폰 목록 */}
            {appliedCoupons.length > 0 && variant === "default" && (
              <div className="space-y-2 pt-2">
                {appliedCoupons.map((coupon, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{coupon.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {coupon.code}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">
                        {formatDiscountAmount(coupon.discountAmount)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => onRemove?.(coupon.code)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

CouponInput.displayName = "CouponInput"

export { CouponInput, couponInputVariants, type CouponInputProps, type AppliedCoupon }