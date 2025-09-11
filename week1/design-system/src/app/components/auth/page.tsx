"use client"

import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/ui/login-form"
import { SignupForm } from "@/components/ui/signup-form"
import { SocialLoginButton } from "@/components/ui/social-login-button"
import { TermsCheckbox, type TermItem } from "@/components/ui/terms-checkbox"

const sampleTerms: TermItem[] = [
  {
    id: "service",
    title: "서비스 이용약관",
    required: true,
    content: `제1조 (목적)
이 약관은 회사가 운영하는 온라인 강의 플랫폼에서 제공하는 서비스의 이용조건 및 절차에 관한 사항과 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (용어의 정의)
1. "서비스"라 함은 구현되는 단말기(PC, TV, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 "이용자"가 이용할 수 있는 회사가 제공하는 제반 서비스를 의미합니다.
2. "이용자"란 당 사이트에 접속하여 이 약관에 따라 당 사이트가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.

제3조 (약관의 효력 및 변경)
1. 이 약관은 당 사이트에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.
2. 회사는 약관의규제에관한법률, 정보통신망이용촉진및정보보호등에관한법률 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.`,
    description: "서비스 이용에 대한 기본 약관입니다."
  },
  {
    id: "privacy",
    title: "개인정보 처리방침",
    required: true,
    content: `개인정보보호법에 따라 회사는 이용자의 개인정보 보호 및 권익을 보호하고자 다음과 같은 처리방침을 두고 있습니다.

1. 개인정보의 처리 목적
회사는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
- 고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리
- 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는 서비스의 공급·배송

2. 개인정보의 처리 및 보유 기간
① 회사는 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.`,
    description: "개인정보 수집 및 이용에 대한 방침입니다."
  },
  {
    id: "marketing",
    title: "마케팅 정보 수신 동의",
    required: false,
    description: "새로운 강의, 이벤트, 할인 정보를 받아보실 수 있습니다.",
    content: `마케팅 정보 수신 동의

1. 수집목적: 신상품 소식 전달, 이벤트 및 광고성 정보 전달
2. 수집항목: 이메일 주소, 휴대폰번호
3. 보유기간: 회원 탈퇴 시 또는 동의 철회 시까지
4. 동의거부권: 마케팅 정보 수신에 동의하지 않으셔도 서비스 이용이 가능합니다.

마케팅 정보는 이메일, SMS, 푸시 알림을 통해 발송되며, 언제든지 수신을 거부할 수 있습니다.`
  }
]

export default function AuthPage() {
  const handleLogin = (data: { email: string; password: string; rememberMe?: boolean }) => {
    console.log("Login data:", data)
    alert(`로그인 시도: ${data.email}`)
  }

  const handleSignup = (data: any) => {
    console.log("Signup data:", data)
    alert(`회원가입 시도: ${data.email}`)
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with: ${provider}`)
    alert(`${provider} 로그인`)
  }

  const handleTermsChange = (checkedTerms: Record<string, boolean>) => {
    console.log("Checked terms:", checkedTerms)
  }

  return (
    <Container size="lg">
      <div className="space-y-8 py-8">
        {/* Header */}
        <div className="space-y-2">
          <Heading size="h1">인증 컴포넌트</Heading>
          <Text size="lg" color="muted">
            로그인, 회원가입, 소셜 로그인, 약관 동의 등 인증 관련 컴포넌트들
          </Text>
        </div>

        <div className="space-y-12">
          {/* 로그인 & 회원가입 폼 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">인증 폼</Heading>
              <Text color="muted">로그인과 회원가입 폼 컴포넌트</Text>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>LoginForm</CardTitle>
                  <CardDescription>기본 로그인 폼</CardDescription>
                </CardHeader>
                <CardContent>
                  <LoginForm
                    onSubmit={handleLogin}
                    onForgotPassword={() => alert("비밀번호 찾기")}
                    socialButtons={
                      <div className="space-y-2">
                        <SocialLoginButton
                          provider="google"
                          onClick={() => handleSocialLogin("Google")}
                        />
                        <SocialLoginButton
                          provider="kakao"
                          onClick={() => handleSocialLogin("KakaoTalk")}
                        />
                      </div>
                    }
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SignupForm</CardTitle>
                  <CardDescription>단계별 회원가입 폼</CardDescription>
                </CardHeader>
                <CardContent>
                  <SignupForm
                    showStep
                    onSubmit={handleSignup}
                    socialButtons={
                      <div className="space-y-2">
                        <SocialLoginButton
                          provider="google"
                          onClick={() => handleSocialLogin("Google")}
                        />
                      </div>
                    }
                    termsCheckbox={
                      <TermsCheckbox
                        terms={sampleTerms}
                        onTermsChange={handleTermsChange}
                        variant="compact"
                      />
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 카드 스타일 폼 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">카드 스타일 폼</Heading>
              <Text color="muted">Card variant를 사용한 폼들</Text>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
              <LoginForm
                variant="card"
                title="계정 로그인"
                description="기존 계정으로 로그인하세요"
                onSubmit={handleLogin}
                socialButtons={
                  <div className="grid grid-cols-2 gap-2">
                    <SocialLoginButton
                      provider="google"
                      size="sm"
                      onClick={() => handleSocialLogin("Google")}
                    >
                      Google
                    </SocialLoginButton>
                    <SocialLoginButton
                      provider="github"
                      size="sm"
                      onClick={() => handleSocialLogin("GitHub")}
                    >
                      GitHub
                    </SocialLoginButton>
                  </div>
                }
              />

              <SignupForm
                variant="card"
                title="계정 생성"
                description="새로운 계정을 만드세요"
                onSubmit={handleSignup}
                socialButtons={
                  <SocialLoginButton
                    provider="google"
                    onClick={() => handleSocialLogin("Google")}
                  />
                }
              />
            </div>
          </section>

          {/* 소셜 로그인 버튼들 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">소셜 로그인 버튼</Heading>
              <Text color="muted">다양한 소셜 로그인 제공업체 버튼들</Text>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Text size="sm" weight="medium">글로벌 서비스</Text>
                    <div className="space-y-2">
                      <SocialLoginButton 
                        provider="google" 
                        onClick={() => handleSocialLogin("Google")}
                      />
                      <SocialLoginButton 
                        provider="facebook" 
                        onClick={() => handleSocialLogin("Facebook")}
                      />
                      <SocialLoginButton 
                        provider="github" 
                        onClick={() => handleSocialLogin("GitHub")}
                      />
                      <SocialLoginButton 
                        provider="apple" 
                        onClick={() => handleSocialLogin("Apple")}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Text size="sm" weight="medium">국내 서비스</Text>
                    <div className="space-y-2">
                      <SocialLoginButton 
                        provider="kakao" 
                        onClick={() => handleSocialLogin("Kakao")}
                      />
                      <SocialLoginButton 
                        provider="naver" 
                        onClick={() => handleSocialLogin("Naver")}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Text size="sm" weight="medium">다양한 크기</Text>
                  <div className="flex flex-wrap gap-2">
                    <SocialLoginButton 
                      provider="google" 
                      size="sm"
                      onClick={() => handleSocialLogin("Google")}
                    >
                      Small
                    </SocialLoginButton>
                    <SocialLoginButton 
                      provider="google" 
                      size="md"
                      onClick={() => handleSocialLogin("Google")}
                    >
                      Medium
                    </SocialLoginButton>
                    <SocialLoginButton 
                      provider="google" 
                      size="lg"
                      onClick={() => handleSocialLogin("Google")}
                    >
                      Large
                    </SocialLoginButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 약관 동의 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">약관 동의</Heading>
              <Text color="muted">이용약관, 개인정보처리방침 동의 컴포넌트</Text>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>기본 약관 동의</CardTitle>
                  <CardDescription>전체 동의 옵션 포함</CardDescription>
                </CardHeader>
                <CardContent>
                  <TermsCheckbox
                    terms={sampleTerms}
                    onTermsChange={handleTermsChange}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>컴팩트 약관 동의</CardTitle>
                  <CardDescription>간소화된 버전</CardDescription>
                </CardHeader>
                <CardContent>
                  <TermsCheckbox
                    terms={sampleTerms}
                    onTermsChange={handleTermsChange}
                    variant="compact"
                    showSelectAll={false}
                  />
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </Container>
  )
}