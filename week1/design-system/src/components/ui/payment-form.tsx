"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Lock, Shield, Eye, EyeOff, AlertCircle, Calendar, User } from "lucide-react"

const paymentFormVariants = cva(
  "w-full max-w-md",
  {
    variants: {
      variant: {
        default: "",
        card: "",
        inline: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface PaymentFormData {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  cardholderName: string
  saveCard?: boolean
  billingAddress?: {
    country: string
    state: string
    city: string
    zipCode: string
    address1: string
    address2?: string
  }
}

interface PaymentFormProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paymentFormVariants> {
  onSubmit?: (data: PaymentFormData) => void
  onDataChange?: (data: Partial<PaymentFormData>) => void
  initialData?: Partial<PaymentFormData>
  isLoading?: boolean
  disabled?: boolean
  showSaveCard?: boolean
  showBillingAddress?: boolean
  showSecurityBadges?: boolean
  title?: string
  error?: string
  acceptedCards?: ("visa" | "mastercard" | "amex" | "discover" | "jcb")[]
}

const PaymentForm = React.forwardRef<HTMLDivElement, PaymentFormProps>(
  ({
    className,
    variant,
    onSubmit,
    onDataChange,
    initialData = {},
    isLoading = false,
    disabled = false,
    showSaveCard = false,
    showBillingAddress = false,
    showSecurityBadges = true,
    title = "결제 정보",
    error,
    acceptedCards = ["visa", "mastercard", "amex"],
    ...props
  }, ref) => {
    const [formData, setFormData] = React.useState<PaymentFormData>({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardholderName: "",
      saveCard: false,
      ...initialData,
    })
    const [showCvv, setShowCvv] = React.useState(false)
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const [cardType, setCardType] = React.useState<string>("")

    // 카드 번호에서 카드 타입 감지
    const detectCardType = (cardNumber: string) => {
      const number = cardNumber.replace(/\D/g, "")
      
      if (/^4/.test(number)) return "visa"
      if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) return "mastercard"
      if (/^3[47]/.test(number)) return "amex"
      if (/^6/.test(number)) return "discover"
      if (/^35/.test(number)) return "jcb"
      
      return ""
    }

    // 카드 번호 포맷팅
    const formatCardNumber = (value: string) => {
      const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
      const matches = v.match(/\d{4,16}/g)
      const match = (matches && matches[0]) || ""
      const parts = []

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
      }

      if (parts.length) {
        return parts.join(" ")
      } else {
        return v
      }
    }

    const handleInputChange = (field: keyof PaymentFormData, value: string | boolean) => {
      let processedValue = value

      if (field === "cardNumber" && typeof value === "string") {
        processedValue = formatCardNumber(value)
        setCardType(detectCardType(value))
      }

      if (field === "cvv" && typeof value === "string") {
        processedValue = value.replace(/\D/g, "").slice(0, 4)
      }

      const newFormData = { ...formData, [field]: processedValue }
      setFormData(newFormData)
      onDataChange?.(newFormData)

      // 에러 클리어
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: "" }))
      }
    }

    const validateForm = () => {
      const newErrors: Record<string, string> = {}

      if (!formData.cardNumber.replace(/\s/g, "")) {
        newErrors.cardNumber = "카드 번호를 입력해주세요"
      } else if (formData.cardNumber.replace(/\s/g, "").length < 13) {
        newErrors.cardNumber = "올바른 카드 번호를 입력해주세요"
      }

      if (!formData.expiryMonth) {
        newErrors.expiryMonth = "만료 월을 선택해주세요"
      }

      if (!formData.expiryYear) {
        newErrors.expiryYear = "만료 년을 선택해주세요"
      }

      if (!formData.cvv) {
        newErrors.cvv = "CVV를 입력해주세요"
      } else if (formData.cvv.length < 3) {
        newErrors.cvv = "올바른 CVV를 입력해주세요"
      }

      if (!formData.cardholderName.trim()) {
        newErrors.cardholderName = "카드 소유자 이름을 입력해주세요"
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      
      if (validateForm()) {
        onSubmit?.(formData)
      }
    }

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i)
    const months = Array.from({ length: 12 }, (_, i) => ({
      value: String(i + 1).padStart(2, "0"),
      label: String(i + 1).padStart(2, "0")
    }))

    const getCardIcon = (type: string) => {
      switch (type) {
        case "visa":
          return <div className="text-blue-600 font-bold text-xs">VISA</div>
        case "mastercard":
          return <div className="text-red-600 font-bold text-xs">MC</div>
        case "amex":
          return <div className="text-blue-700 font-bold text-xs">AMEX</div>
        default:
          return <CreditCard className="h-4 w-4 text-muted-foreground" />
      }
    }

    const FormContent = (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 카드 번호 */}
        <div className="space-y-2">
          <Label htmlFor="cardNumber">카드 번호</Label>
          <div className="relative">
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              maxLength={19}
              disabled={disabled || isLoading}
              className={cn(errors.cardNumber && "border-destructive")}
            />
            <div className="absolute right-3 top-3">
              {getCardIcon(cardType)}
            </div>
          </div>
          {errors.cardNumber && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.cardNumber}
            </p>
          )}
        </div>

        {/* 만료일 & CVV */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryMonth">월</Label>
            <Select
              value={formData.expiryMonth}
              onValueChange={(value) => handleInputChange("expiryMonth", value)}
              disabled={disabled || isLoading}
            >
              <SelectTrigger className={cn(errors.expiryMonth && "border-destructive")}>
                <SelectValue placeholder="월" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.expiryMonth && (
              <p className="text-xs text-destructive">{errors.expiryMonth}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryYear">년</Label>
            <Select
              value={formData.expiryYear}
              onValueChange={(value) => handleInputChange("expiryYear", value)}
              disabled={disabled || isLoading}
            >
              <SelectTrigger className={cn(errors.expiryYear && "border-destructive")}>
                <SelectValue placeholder="년" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.expiryYear && (
              <p className="text-xs text-destructive">{errors.expiryYear}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <div className="relative">
              <Input
                id="cvv"
                type={showCvv ? "text" : "password"}
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                maxLength={4}
                disabled={disabled || isLoading}
                className={cn(errors.cvv && "border-destructive", "pr-10")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowCvv(!showCvv)}
                disabled={disabled || isLoading}
              >
                {showCvv ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.cvv && (
              <p className="text-xs text-destructive">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* 카드 소유자 이름 */}
        <div className="space-y-2">
          <Label htmlFor="cardholderName">카드 소유자 이름</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="cardholderName"
              placeholder="홍길동"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange("cardholderName", e.target.value)}
              className={cn(errors.cardholderName && "border-destructive", "pl-10")}
              disabled={disabled || isLoading}
            />
          </div>
          {errors.cardholderName && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.cardholderName}
            </p>
          )}
        </div>

        {/* 카드 저장 옵션 */}
        {showSaveCard && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="saveCard"
              checked={formData.saveCard}
              onCheckedChange={(checked) => handleInputChange("saveCard", checked as boolean)}
              disabled={disabled || isLoading}
            />
            <Label htmlFor="saveCard" className="text-sm">
              다음에도 사용할 수 있도록 카드 정보 저장
            </Label>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          </div>
        )}

        {/* 보안 정보 */}
        {showSecurityBadges && (
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="font-medium">보안 결제</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                <Lock className="h-3 w-3 mr-1" />
                SSL 암호화
              </Badge>
              <Badge variant="outline" className="text-xs">
                PCI DSS 준수
              </Badge>
              {acceptedCards.map((card) => (
                <Badge key={card} variant="outline" className="text-xs uppercase">
                  {card}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* 제출 버튼 */}
        <Button
          type="submit"
          className="w-full"
          disabled={disabled || isLoading}
          size="lg"
        >
          {isLoading ? "처리 중..." : "결제하기"}
        </Button>
      </form>
    )

    if (variant === "card") {
      return (
        <Card ref={ref} className={cn(paymentFormVariants({ variant }), className)} {...props}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {FormContent}
          </CardContent>
        </Card>
      )
    }

    return (
      <div ref={ref} className={cn(paymentFormVariants({ variant }), className)} {...props}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {title}
          </h3>
          {FormContent}
        </div>
      </div>
    )
  }
)

PaymentForm.displayName = "PaymentForm"

export { PaymentForm, paymentFormVariants, type PaymentFormProps, type PaymentFormData }