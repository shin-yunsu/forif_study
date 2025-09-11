'use client'

import { LoginForm } from '@/components/ui/login-form'
import { AuthBackground } from '@/components/ui/auth-background'
import { Container } from '@/components/ui/container'
import { Link } from '@/components/ui/link'

export default function LoginPage() {
  const handleLogin = (data: {
    email: string
    password: string
    rememberMe: boolean
  }) => {
    console.log('로그인 데이터:', data)
  }

  const handleSocialLogin = (provider: string) => {
    console.log('소셜 로그인:', provider)
  }

  const handleForgotPassword = () => {
    console.log('비밀번호 찾기')
  }

  return (
    <AuthBackground
      variant="gradient"
      overlay="light"
      decorative={true}
      showStats={true}
      stats={[
        { value: "10K+", label: "수강생" },
        { value: "150+", label: "강의" },
        { value: "4.8", label: "평균 평점" }
      ]}
    >
      <Container size="md" className="flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-lg">
          {/* 로그인 폼 */}
          <div className="bg-background rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                로그인
              </h1>
              <p className="text-muted-foreground">
                계정에 로그인하여 학습을 시작하세요
              </p>
            </div>

            <LoginForm
              onSubmit={handleLogin}
              onSocialLogin={handleSocialLogin}
              onForgotPassword={handleForgotPassword}
              showRememberMe={true}
              showSocialLogin={true}
              socialProviders={[
                'google',
                'github',
                'kakao',
                'naver'
              ]}
              loading={false}
            />

            {/* 회원가입 링크 */}
            <div className="text-center mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                아직 계정이 없으신가요?{' '}
                <Link href="/signup" className="text-primary font-medium hover:underline">
                  회원가입
                </Link>
              </p>
            </div>
          </div>

          {/* 추가 링크 */}
          <div className="text-center mt-6">
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <Link href="/help" className="hover:text-foreground transition-colors">
                도움말
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                개인정보처리방침
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </AuthBackground>
  )
}