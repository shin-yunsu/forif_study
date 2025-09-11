'use client'

import { SignupForm } from '@/components/ui/signup-form'
import { AuthBackground } from '@/components/ui/auth-background'
import { Container } from '@/components/ui/container'
import { Link } from '@/components/ui/link'
import { StepProgress } from '@/components/ui/step-progress'

export default function SignupPage() {
  const steps = [
    {
      id: 'basic',
      title: '기본 정보',
      description: '이메일과 비밀번호를 입력하세요',
    },
    {
      id: 'profile',
      title: '프로필 설정',
      description: '프로필 정보를 완성하세요',
    },
    {
      id: 'verify',
      title: '이메일 인증',
      description: '이메일 인증을 완료하세요',
    },
  ]

  const handleSignup = (data: {
    email: string
    password: string
    confirmPassword: string
    name: string
    phoneNumber: string
    birthDate: string
    gender: string
    interests: string[]
    terms: {
      service: boolean
      privacy: boolean
      marketing: boolean
    }
  }) => {
    console.log('회원가입 데이터:', data)
  }

  const handleSocialSignup = (provider: string) => {
    console.log('소셜 회원가입:', provider)
  }

  const handleStepChange = (step: number) => {
    console.log('단계 변경:', step)
  }

  return (
    <AuthBackground
      variant="pattern"
      overlay="dark"
      decorative={true}
      showStats={true}
      stats={[
        { value: "10K+", label: "수강생" },
        { value: "150+", label: "강의" },
        { value: "50+", label: "강사진" }
      ]}
    >
      <Container size="md" className="flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-lg">
          {/* 단계 진행률 */}
          <div className="mb-8">
            <StepProgress
              steps={steps}
              currentStep={0}
              completedSteps={[]}
              variant="horizontal"
              clickableSteps={false}
            />
          </div>

          {/* 회원가입 폼 */}
          <div className="bg-background rounded-xl shadow-lg p-12">
            <SignupForm
              onSubmit={handleSignup}
              onSocialSignup={handleSocialSignup}
              onStepChange={handleStepChange}
              showPasswordStrength={true}
              showSocialSignup={true}
              socialProviders={[
                'google',
                'github',
                'kakao',
                'naver'
              ]}
              requiredFields={[
                'email',
                'password',
                'confirmPassword',
                'name'
              ]}
              optionalFields={[
                'phoneNumber',
                'birthDate',
                'gender',
                'interests'
              ]}
              interests={[
                { id: 'frontend', label: '프론트엔드' },
                { id: 'backend', label: '백엔드' },
                { id: 'mobile', label: '모바일 개발' },
                { id: 'data', label: '데이터 분석' },
                { id: 'ai', label: '인공지능' },
                { id: 'devops', label: 'DevOps' },
                { id: 'design', label: 'UI/UX 디자인' },
                { id: 'game', label: '게임 개발' }
              ]}
              loading={false}
            />

            {/* 로그인 링크 */}
            <div className="text-center mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                이미 계정이 있으신가요?{' '}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  로그인
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