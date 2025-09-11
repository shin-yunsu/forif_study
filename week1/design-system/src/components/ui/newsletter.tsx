"use client"

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, CheckCircle, Gift, Zap, Users } from 'lucide-react'

const newsletterVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "bg-card border rounded-lg",
        minimal: "bg-transparent border-none",
        featured: "bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 rounded-lg",
        hero: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg",
        inline: "bg-transparent border-none",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface NewsletterBenefit {
  icon: React.ReactNode
  title: string
  description: string
}

interface NewsletterProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof newsletterVariants> {
  title?: string
  description?: string
  benefits?: NewsletterBenefit[]
  placeholder?: string
  buttonText?: string
  successMessage?: string
  showPrivacyText?: boolean
  privacyText?: string
  onSubscribe?: (email: string, preferences?: string[]) => Promise<void>
  showPreferences?: boolean
  preferences?: Array<{
    id: string
    label: string
    description?: string
  }>
  subscriberCount?: number
}

const Newsletter = React.forwardRef<HTMLDivElement, NewsletterProps>(
  ({
    className,
    variant,
    size,
    title = "최신 소식 받기",
    description = "뉴스레터를 구독하여 최신 업데이트와 독점 콘텐츠를 받아보세요.",
    benefits = [
      {
        icon: <Zap className="h-4 w-4" />,
        title: "최신 업데이트",
        description: "새로운 기능과 강의 소식 받기"
      },
      {
        icon: <Gift className="h-4 w-4" />,
        title: "독점 콘텐츠",
        description: "구독자 전용 리소스 이용"
      },
      {
        icon: <Users className="h-4 w-4" />,
        title: "커뮤니티",
        description: "학습자 커뮤니티에 참여"
      }
    ],
    placeholder = "이메일 주소를 입력하세요",
    buttonText = "구독하기",
    successMessage = "구독해주셔서 감사합니다! 이메일을 확인하여 구독을 완료해주세요.",
    showPrivacyText = true,
    privacyText = "개인정보를 보호합니다. 언제든지 구독을 취소할 수 있습니다.",
    onSubscribe,
    showPreferences = false,
    preferences = [
      { id: "updates", label: "제품 업데이트", description: "새로운 기능과 개선사항" },
      { id: "courses", label: "새로운 강의", description: "최신 강의 출시 소식" },
      { id: "tips", label: "학습 팁", description: "공부 방법과 모범 사례" }
    ],
    subscriberCount,
    ...props
  }, ref) => {
    const [email, setEmail] = React.useState("")
    const [selectedPreferences, setSelectedPreferences] = React.useState<string[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [isSubscribed, setIsSubscribed] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email.trim()) return

      setIsLoading(true)
      try {
        await onSubscribe?.(email, selectedPreferences)
        setIsSubscribed(true)
        setEmail("")
        setSelectedPreferences([])
      } catch (error) {
        console.error('Newsletter subscription failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const handlePreferenceChange = (preferenceId: string, checked: boolean) => {
      setSelectedPreferences(prev => 
        checked 
          ? [...prev, preferenceId]
          : prev.filter(id => id !== preferenceId)
      )
    }

    if (isSubscribed) {
      return (
        <Card ref={ref} className={cn(newsletterVariants({ variant, size }), className)} {...props}>
          <CardContent className="text-center space-y-4 p-0">
            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">구독이 완료되었습니다!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {successMessage}
              </p>
            </div>
          </CardContent>
        </Card>
      )
    }

    const isHeroVariant = variant === "hero"
    const isInlineVariant = variant === "inline"

    // Inline 레이아웃
    if (isInlineVariant) {
      return (
        <div ref={ref} className={cn(newsletterVariants({ variant, size }), "py-8 border-t border-b border-border/50", className)} {...props}>
          <div className="text-center space-y-6">
            {/* 헤더 */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">
                  {title}
                </h2>
                <span className="text-muted-foreground">|</span>
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>

            {/* 혜택들을 수평으로 배치 */}
            {benefits.length > 0 && (
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <span className="font-medium text-foreground">{benefit.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* 이메일 입력 폼 */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder={placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  variant="default"
                  className="px-6"
                >
                  {isLoading ? "구독 중..." : buttonText}
                </Button>
              </div>
            </form>

            {/* 개인정보 텍스트 */}
            {showPrivacyText && (
              <p className="text-xs text-muted-foreground">
                {privacyText}
              </p>
            )}
          </div>
        </div>
      )
    }

    return (
      <Card ref={ref} className={cn(newsletterVariants({ variant, size }), className)} {...props}>
        <CardHeader className="pb-4 p-0">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Mail className={cn(
                "h-5 w-5",
                isHeroVariant ? "text-primary-foreground" : "text-primary"
              )} />
              <h2 className={cn(
                "text-xl font-bold",
                isHeroVariant ? "text-primary-foreground" : "text-foreground"
              )}>
                {title}
              </h2>
            </div>
            <p className={cn(
              "text-sm",
              isHeroVariant ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {description}
            </p>
            {subscriberCount && (
              <Badge 
                variant={isHeroVariant ? "secondary" : "outline"}
                className="text-xs"
              >
                {subscriberCount.toLocaleString()}+ 구독자
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-0">
          {/* Benefits */}
          {benefits.length > 0 && (
            <div className="grid gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    isHeroVariant 
                      ? "bg-primary-foreground/20 text-primary-foreground" 
                      : "bg-primary/10 text-primary"
                  )}>
                    {benefit.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className={cn(
                      "text-sm font-medium",
                      isHeroVariant ? "text-primary-foreground" : "text-foreground"
                    )}>
                      {benefit.title}
                    </h4>
                    <p className={cn(
                      "text-xs",
                      isHeroVariant ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label 
                htmlFor="newsletter-email"
                className={cn(
                  "text-sm font-medium",
                  isHeroVariant ? "text-primary-foreground" : "text-foreground"
                )}
              >
                이메일 주소
              </Label>
              <div className="flex gap-2">
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder={placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className={cn(
                    "flex-1",
                    isHeroVariant && "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  )}
                />
                <Button 
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  variant={isHeroVariant ? "secondary" : "default"}
                  className="px-6"
                >
                  {isLoading ? "구독 중..." : buttonText}
                </Button>
              </div>
            </div>

            {/* Preferences */}
            {showPreferences && preferences.length > 0 && (
              <div className="space-y-3">
                <Label className={cn(
                  "text-sm font-medium",
                  isHeroVariant ? "text-primary-foreground" : "text-foreground"
                )}>
                  어떤 소식을 받고 싶으신가요?
                </Label>
                <div className="space-y-2">
                  {preferences.map((preference) => (
                    <div key={preference.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={`pref-${preference.id}`}
                        checked={selectedPreferences.includes(preference.id)}
                        onCheckedChange={(checked) => 
                          handlePreferenceChange(preference.id, checked as boolean)
                        }
                        className={cn(
                          "mt-0.5",
                          isHeroVariant && "border-primary-foreground/30 data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
                        )}
                      />
                      <div className="space-y-1 leading-none">
                        <Label 
                          htmlFor={`pref-${preference.id}`}
                          className={cn(
                            "text-sm font-medium cursor-pointer",
                            isHeroVariant ? "text-primary-foreground" : "text-foreground"
                          )}
                        >
                          {preference.label}
                        </Label>
                        {preference.description && (
                          <p className={cn(
                            "text-xs",
                            isHeroVariant ? "text-primary-foreground/70" : "text-muted-foreground"
                          )}>
                            {preference.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Text */}
            {showPrivacyText && (
              <p className={cn(
                "text-xs",
                isHeroVariant ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {privacyText}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    )
  }
)

Newsletter.displayName = "Newsletter"

export { Newsletter, newsletterVariants }
export type { NewsletterBenefit, NewsletterProps }