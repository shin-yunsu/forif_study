"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Building2, Banknote, Shield } from "lucide-react"

const paymentMethodVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        compact: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface PaymentMethodOption {
  id: string
  name: string
  description?: string
  icon?: React.ReactNode
  badge?: string
  badgeColor?: "default" | "success" | "warning" | "destructive" | "secondary"
  fee?: number
  feeType?: "fixed" | "percentage"
  minAmount?: number
  maxAmount?: number
  processingTime?: string
  available?: boolean
  popular?: boolean
}

interface PaymentMethodProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paymentMethodVariants> {
  methods: PaymentMethodOption[]
  value?: string
  onValueChange?: (value: string) => void
  showFees?: boolean
  showProcessingTime?: boolean
  disabled?: boolean
}

const defaultMethods: PaymentMethodOption[] = [
  {
    id: "card",
    name: "신용카드/체크카드",
    description: "Visa, Mastercard, JCB",
    icon: <CreditCard className="h-5 w-5" />,
    processingTime: "즉시",
    popular: true,
    available: true
  },
  {
    id: "kakaopay",
    name: "카카오페이",
    description: "간편하고 안전한 결제",
    icon: <Smartphone className="h-5 w-5" />,
    badge: "간편결제",
    badgeColor: "secondary",
    processingTime: "즉시",
    available: true
  },
  {
    id: "toss",
    name: "토스페이",
    description: "토스 앱으로 간편결제",
    icon: <Smartphone className="h-5 w-5" />,
    badge: "간편결제", 
    badgeColor: "secondary",
    processingTime: "즉시",
    available: true
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "전 세계 안전한 결제",
    icon: <CreditCard className="h-5 w-5" />,
    fee: 3.4,
    feeType: "percentage",
    processingTime: "즉시",
    available: true
  },
  {
    id: "bank",
    name: "무통장입금",
    description: "계좌이체로 결제",
    icon: <Building2 className="h-5 w-5" />,
    processingTime: "1-2시간",
    available: true
  },
  {
    id: "crypto",
    name: "암호화폐",
    description: "비트코인, 이더리움",
    icon: <Banknote className="h-5 w-5" />,
    badge: "신규",
    badgeColor: "warning",
    processingTime: "10-30분",
    available: false
  }
]

const PaymentMethod = React.forwardRef<HTMLDivElement, PaymentMethodProps>(
  ({
    className,
    variant,
    methods = defaultMethods,
    value,
    onValueChange,
    showFees = true,
    showProcessingTime = true,
    disabled = false,
    ...props
  }, ref) => {
    const formatFee = (method: PaymentMethodOption) => {
      if (!method.fee) return null
      
      if (method.feeType === "percentage") {
        return `${method.fee}% 수수료`
      } else {
        return `${method.fee.toLocaleString()}원 수수료`
      }
    }

    return (
      <div ref={ref} className={cn(paymentMethodVariants({ variant }), className)} {...props}>
        <RadioGroup
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          className="space-y-3"
        >
          {methods.map((method) => (
            <div key={method.id} className="relative">
              <Label
                htmlFor={method.id}
                className={cn(
                  "cursor-pointer block",
                  (!method.available || disabled) && "cursor-not-allowed"
                )}
              >
                <Card 
                  className={cn(
                    "transition-all duration-200 hover:shadow-md",
                    value === method.id && "ring-2 ring-primary bg-primary/5",
                    !method.available && "opacity-50 bg-muted",
                    disabled && "cursor-not-allowed"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        disabled={!method.available || disabled}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {method.icon && (
                              <div className="text-muted-foreground">
                                {method.icon}
                              </div>
                            )}
                            
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium text-sm">
                                  {method.name}
                                </h3>
                                
                                {method.popular && (
                                  <Badge variant="default" className="text-xs px-2 py-0">
                                    인기
                                  </Badge>
                                )}
                                
                                {method.badge && (
                                  <Badge 
                                    variant={method.badgeColor || "secondary"} 
                                    className="text-xs px-2 py-0"
                                  >
                                    {method.badge}
                                  </Badge>
                                )}
                              </div>
                              
                              {method.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {method.description}
                                </p>
                              )}
                            </div>
                          </div>

                          {!method.available && (
                            <Badge variant="secondary" className="text-xs">
                              준비중
                            </Badge>
                          )}
                        </div>
                        
                        {/* 추가 정보 */}
                        {(showFees || showProcessingTime) && method.available && (
                          <div className="flex items-center justify-between mt-3 pt-3 border-t">
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              {showProcessingTime && method.processingTime && (
                                <span>처리시간: {method.processingTime}</span>
                              )}
                              
                              {showFees && method.fee && (
                                <span className="text-amber-600">
                                  {formatFee(method)}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Shield className="h-3 w-3 mr-1" />
                              <span>보안결제</span>
                            </div>
                          </div>
                        )}
                        
                        {/* 금액 제한 정보 */}
                        {(method.minAmount || method.maxAmount) && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            {method.minAmount && method.maxAmount && (
                              <span>
                                결제 한도: {method.minAmount.toLocaleString()}원 ~ {method.maxAmount.toLocaleString()}원
                              </span>
                            )}
                            {method.minAmount && !method.maxAmount && (
                              <span>최소 결제금액: {method.minAmount.toLocaleString()}원</span>
                            )}
                            {!method.minAmount && method.maxAmount && (
                              <span>최대 결제금액: {method.maxAmount.toLocaleString()}원</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {/* 보안 정보 */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>
              모든 결제는 SSL 보안 프로토콜로 암호화되어 안전하게 처리됩니다.
            </span>
          </div>
        </div>
      </div>
    )
  }
)

PaymentMethod.displayName = "PaymentMethod"

export { PaymentMethod, paymentMethodVariants, type PaymentMethodProps, type PaymentMethodOption }