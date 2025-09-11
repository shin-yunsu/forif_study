"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, Chrome, Github } from "lucide-react"

const loginFormVariants = cva(
  "w-full",
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

interface LoginFormProps
  extends React.FormHTMLAttributes<HTMLFormElement>,
    VariantProps<typeof loginFormVariants> {
  title?: string
  description?: string
  showRememberMe?: boolean
  showForgotPassword?: boolean
  showSocialLogin?: boolean
  onSubmit?: (data: { email: string; password: string; rememberMe?: boolean }) => void
  onForgotPassword?: () => void
  onSocialLogin?: (provider: string) => void
  socialProviders?: string[]
  socialButtons?: React.ReactNode
  loading?: boolean
  isLoading?: boolean
}

const LoginForm = React.forwardRef<HTMLFormElement, LoginFormProps>(
  ({
    className,
    variant,
    title = "로그인",
    description = "계정에 로그인하세요",
    showRememberMe = true,
    showForgotPassword = true,
    showSocialLogin = false,
    onSubmit,
    onForgotPassword,
    onSocialLogin,
    socialProviders = [],
    socialButtons,
    loading = false,
    isLoading = false,
    ...formProps
  }, ref) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [rememberMe, setRememberMe] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const finalLoading = loading || isLoading

    const getSocialIcon = (provider: string) => {
      switch (provider.toLowerCase()) {
        case 'google':
          return <Chrome className="w-4 h-4" />
        case 'github':
          return <Github className="w-4 h-4" />
        case 'kakao':
          return <div className="w-4 h-4 bg-yellow-400 rounded-full" />
        case 'naver':
          return <div className="w-4 h-4 bg-green-500 rounded-full" />
        default:
          return null
      }
    }

    const getSocialButtonText = (provider: string) => {
      switch (provider.toLowerCase()) {
        case 'google':
          return 'Google로 계속하기'
        case 'github':
          return 'GitHub로 계속하기'
        case 'kakao':
          return '카카오로 계속하기'
        case 'naver':
          return '네이버로 계속하기'
        default:
          return `${provider}로 계속하기`
      }
    }

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      
      const newErrors: Record<string, string> = {}
      
      if (!email) {
        newErrors.email = "이메일을 입력해주세요"
      } else if (!validateEmail(email)) {
        newErrors.email = "올바른 이메일 형식을 입력해주세요"
      }
      
      if (!password) {
        newErrors.password = "비밀번호를 입력해주세요"
      } else if (password.length < 6) {
        newErrors.password = "비밀번호는 6자 이상이어야 합니다"
      }
      
      setErrors(newErrors)
      
      if (Object.keys(newErrors).length === 0) {
        onSubmit?.({ email, password, rememberMe })
      }
    }

    const FormContent = (
      <form ref={ref} onSubmit={handleSubmit} className="space-y-4" {...formProps}>
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              disabled={finalLoading}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10"
              disabled={finalLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={finalLoading}
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

        <div className="flex items-center justify-between">
          {showRememberMe && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={finalLoading}
              />
              <Label htmlFor="remember" className="text-sm">
                로그인 상태 유지
              </Label>
            </div>
          )}
          
          {showForgotPassword && (
            <Button
              type="button"
              variant="link"
              className="px-0 text-sm"
              onClick={onForgotPassword}
              disabled={finalLoading}
            >
              비밀번호 찾기
            </Button>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={finalLoading}>
          {finalLoading ? "로그인 중..." : "로그인"}
        </Button>

        {(showSocialLogin && socialProviders.length > 0) || socialButtons ? (
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
            
            {socialButtons ? (
              socialButtons
            ) : (
              <div className="space-y-2">
                {socialProviders.map((provider) => (
                  <Button
                    key={provider}
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => onSocialLogin?.(provider)}
                    disabled={finalLoading}
                  >
                    {getSocialIcon(provider)}
                    <span className="ml-2">{getSocialButtonText(provider)}</span>
                  </Button>
                ))}
              </div>
            )}
          </>
        ) : null}
      </form>
    )

    if (variant === "card") {
      return (
        <Card className={cn(loginFormVariants({ variant }), className)}>
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
      <div className={cn(loginFormVariants({ variant }), className)}>
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {FormContent}
      </div>
    )
  }
)

LoginForm.displayName = "LoginForm"

export { LoginForm, type LoginFormProps }