"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"

const signupFormVariants = cva(
  "w-full max-w-3xl",
  {
    variants: {
      variant: {
        default: "",
        card: "",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SignupFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>,
    VariantProps<typeof signupFormVariants> {
  title?: string
  description?: string
  showStep?: boolean
  onSubmit?: (data: any) => void
  onSocialSignup?: (provider: string) => void
  onStepChange?: (step: number) => void
  showPasswordStrength?: boolean
  showSocialSignup?: boolean
  socialProviders?: string[]
  requiredFields?: string[]
  optionalFields?: string[]
  interests?: Array<{ id: string; label: string }>
  loading?: boolean
  socialButtons?: React.ReactNode
  termsCheckbox?: React.ReactNode
  isLoading?: boolean
}

interface SignupData {
  name: string
  email: string
  phone?: string
  password: string
  confirmPassword: string
}

const SignupForm = React.forwardRef<HTMLFormElement, SignupFormProps>(
  ({
    className,
    variant,
    title = "회원가입",
    description = "새 계정을 만들어보세요",
    showStep = false,
    onSubmit,
    onSocialSignup,
    onStepChange,
    showPasswordStrength,
    showSocialSignup,
    socialProviders,
    requiredFields,
    optionalFields,
    interests,
    loading,
    socialButtons,
    termsCheckbox,
    isLoading = false,
    ...props
  }, ref) => {
    const [currentStep, setCurrentStep] = React.useState(1)
    const [formData, setFormData] = React.useState<SignupData>({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    })
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const [passwordStrength, setPasswordStrength] = React.useState(0)

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    const calculatePasswordStrength = (password: string) => {
      let strength = 0
      if (password.length >= 8) strength += 25
      if (/[A-Z]/.test(password)) strength += 25
      if (/[0-9]/.test(password)) strength += 25
      if (/[^A-Za-z0-9]/.test(password)) strength += 25
      return strength
    }

    const handleInputChange = (field: keyof SignupData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))
      
      if (field === "password") {
        setPasswordStrength(calculatePasswordStrength(value))
      }
      
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: "" }))
      }
    }

    const validateStep = (step: number) => {
      const newErrors: Record<string, string> = {}
      
      if (step === 1) {
        if (!formData.name.trim()) {
          newErrors.name = "이름을 입력해주세요"
        }
        
        if (!formData.email) {
          newErrors.email = "이메일을 입력해주세요"
        } else if (!validateEmail(formData.email)) {
          newErrors.email = "올바른 이메일 형식을 입력해주세요"
        }
      }
      
      if (step === 2) {
        if (!formData.password) {
          newErrors.password = "비밀번호를 입력해주세요"
        } else if (formData.password.length < 8) {
          newErrors.password = "비밀번호는 8자 이상이어야 합니다"
        }
        
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "비밀번호 확인을 입력해주세요"
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "비밀번호가 일치하지 않습니다"
        }
      }
      
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
      if (validateStep(currentStep)) {
        setCurrentStep(2)
      }
    }

    const handleBack = () => {
      setCurrentStep(1)
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      
      if (showStep) {
        if (currentStep === 1) {
          handleNext()
          return
        }
        if (!validateStep(2)) return
      } else {
        if (!validateStep(1) || !validateStep(2)) return
      }
      
      onSubmit?.(formData)
    }

    const getPasswordStrengthColor = () => {
      if (passwordStrength <= 25) return "bg-red-500"
      if (passwordStrength <= 50) return "bg-yellow-500"
      if (passwordStrength <= 75) return "bg-blue-500"
      return "bg-green-500"
    }

    const getPasswordStrengthText = () => {
      if (passwordStrength <= 25) return "약함"
      if (passwordStrength <= 50) return "보통"
      if (passwordStrength <= 75) return "강함"
      return "매우 강함"
    }

    // DOM에 전달하면 안되는 props들을 제거
    const {
      onSocialSignup: _onSocialSignup,
      onStepChange: _onStepChange,
      showPasswordStrength: _showPasswordStrength,
      showSocialSignup: _showSocialSignup,
      socialProviders: _socialProviders,
      requiredFields: _requiredFields,
      optionalFields: _optionalFields,
      interests: _interests,
      loading: _loading,
      ...domProps
    } = props

    const FormContent = (
      <form ref={ref} onSubmit={handleSubmit} className="space-y-4" {...domProps}>
        {showStep && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>단계 {currentStep} of 2</span>
              <span>{currentStep === 1 ? "기본 정보" : "비밀번호 설정"}</span>
            </div>
            <Progress value={(currentStep / 2) * 100} />
          </div>
        )}

        {(!showStep || currentStep === 1) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">전화번호 (선택)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">이메일</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </div>
        )}

        {(!showStep || currentStep === 2) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>
            
            {formData.password && (
              <div className="md:col-span-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>비밀번호 강도</span>
                  <span className={cn(
                    "font-medium",
                    passwordStrength <= 25 && "text-red-500",
                    passwordStrength > 25 && passwordStrength <= 50 && "text-yellow-500",
                    passwordStrength > 50 && passwordStrength <= 75 && "text-blue-500",
                    passwordStrength > 75 && "text-green-500"
                  )}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full transition-all duration-300", getPasswordStrengthColor())}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {termsCheckbox && (
          <div className="space-y-4">
            {termsCheckbox}
          </div>
        )}

        <div className="flex space-x-2">
          {showStep && currentStep === 2 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isLoading}
              className="flex-1"
            >
              이전
            </Button>
          )}
          
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "처리 중..." : 
             showStep && currentStep === 1 ? "다음" : "회원가입"}
          </Button>
        </div>

        {socialButtons && currentStep === 1 && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  또는
                </span>
              </div>
            </div>
            {socialButtons}
          </>
        )}
      </form>
    )

    if (variant === "card") {
      return (
        <Card className={cn(signupFormVariants({ variant }), className)}>
          <CardHeader className="text-center">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {FormContent}
          </CardContent>
        </Card>
      )
    }

    return (
      <div className={cn(signupFormVariants({ variant }), className)}>
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {FormContent}
      </div>
    )
  }
)

SignupForm.displayName = "SignupForm"

export { SignupForm, type SignupFormProps, type SignupData }