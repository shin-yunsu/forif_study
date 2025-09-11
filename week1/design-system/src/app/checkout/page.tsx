'use client'

import { OrderSummary } from '@/components/ui/order-summary'
import { PaymentForm } from '@/components/ui/payment-form'
import { PaymentMethod } from '@/components/ui/payment-method'
import { CouponInput } from '@/components/ui/coupon-input'
import { ProgressSteps } from '@/components/ui/progress-steps'
import { SecurityBadges } from '@/components/ui/security-badges'
import { Container } from '@/components/ui/container'
import { Grid } from '@/components/ui/grid'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, CreditCard, CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const progressSteps = [
    {
      id: 'cart',
      title: '장바구니',
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      id: 'payment',
      title: '결제 정보',
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      id: 'confirm',
      title: '주문 확인',
      icon: <CheckCircle className="h-4 w-4" />,
    },
  ]

  const orderItems = [
    {
      id: '1',
      title: 'React 마스터 클래스',
      instructor: '김개발',
      price: 89000,
      originalPrice: 129000,
      thumbnail: '/course-thumbs/2.png',
      duration: '12시간',
    },
    {
      id: '2',
      title: 'Next.js 실전 프로젝트',
      instructor: '이풀스택',
      price: 119000,
      originalPrice: 159000,
      thumbnail: '/course-thumbs/4.png',
      duration: '15시간',
    },
  ]

  const paymentMethods = [
    {
      id: 'card',
      label: '신용카드',
      description: '모든 카드사 지원',
      icon: 'credit-card',
      fee: 0,
      recommended: true,
    },
    {
      id: 'kakaopay',
      label: '카카오페이',
      description: '간편하고 안전한 결제',
      icon: 'wallet',
      fee: 0,
      recommended: false,
    },
    {
      id: 'naverpay',
      label: '네이버페이',
      description: '네이버 간편결제',
      icon: 'smartphone',
      fee: 0,
      recommended: false,
    },
    {
      id: 'bank',
      label: '무통장입금',
      description: '가상계좌 입금',
      icon: 'building',
      fee: 1000,
      recommended: false,
    },
  ]

  const coupons = [
    {
      id: '1',
      code: 'WELCOME20',
      title: '신규 회원 20% 할인',
      discountType: 'percentage' as const,
      discountValue: 20,
      minAmount: 50000,
      maxDiscount: 30000,
      validUntil: '2024-12-31',
    },
    {
      id: '2',
      code: 'SAVE10000',
      title: '만원 할인 쿠폰',
      discountType: 'amount' as const,
      discountValue: 10000,
      minAmount: 100000,
      validUntil: '2024-11-30',
    },
  ]

  const securityBadges = [
    {
      type: 'ssl' as const,
      label: 'SSL 보안',
      description: '256비트 SSL 암호화로 안전하게 보호됩니다',
      link: '/security/ssl',
    },
    {
      type: 'pci' as const,
      label: 'PCI DSS',
      description: '결제 보안 표준을 준수합니다',
      link: '/security/pci',
    },
    {
      type: 'encryption' as const,
      label: '개인정보 암호화',
      description: '개인정보는 암호화되어 안전하게 처리됩니다',
    },
  ]

  const handlePaymentMethodChange = (method: string) => {
    console.log('결제 방법 변경:', method)
  }

  const handleCouponApply = (couponCode: string) => {
    console.log('쿠폰 적용:', couponCode)
    return Promise.resolve({
      success: true,
      discount: 20000,
      message: '쿠폰이 적용되었습니다.',
    })
  }

  const handleCouponRemove = (couponId: string) => {
    console.log('쿠폰 제거:', couponId)
  }

  const handlePayment = (paymentData: {
    method: string
    cardNumber?: string
    expiryDate?: string
    cvv?: string
    cardholderName?: string
    saveCard?: boolean
  }) => {
    console.log('결제 처리:', paymentData)
  }

  return (
    <div className="min-h-screen bg-muted/50">
      {/* 헤더와 진행률 */}
      <Section className="py-8 bg-background border-b">
        <Container size="lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              결제하기
            </h1>
            <p className="text-muted-foreground">
              선택하신 강의의 결제를 진행해주세요
            </p>
          </div>

          <ProgressSteps
            steps={progressSteps}
            currentStep={1}
            completedSteps={[0]}
            variant="horizontal"
            showCompletedTime={true}
          />
        </Container>
      </Section>

      {/* 메인 콘텐츠 */}
      <Section className="py-12">
        <Container size="lg">
          <Grid cols={3} gap="lg" className="items-start">
            {/* 왼쪽 열 - 결제 폼 */}
            <div className="col-span-2 space-y-6">
              {/* 결제 방법 선택 */}
              <Card>
                <CardHeader>
                  <CardTitle>결제 방법 선택</CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentMethod
                    methods={paymentMethods}
                    selectedMethod="card"
                    onMethodChange={handlePaymentMethodChange}
                    showFees={true}
                    layout="grid"
                  />
                </CardContent>
              </Card>

              {/* 결제 정보 폼 */}
              <Card>
                <CardHeader>
                  <CardTitle>결제 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentForm
                    onSubmit={handlePayment}
                    showSaveCard={true}
                    showBillingAddress={false}
                    showInstallment={true}
                    installmentOptions={[0, 2, 3, 6, 12]}
                    loading={false}
                  />
                </CardContent>
              </Card>

              {/* 보안 뱃지 */}
              <SecurityBadges
                title="안전한 결제"
                description="업계 표준 보안으로 안전하게 보호됩니다"
                badges={securityBadges}
                showTooltips={true}
                variant="compact"
              />
            </div>

            {/* 오른쪽 열 - 주문 요약 */}
            <div className="space-y-6">
              {/* 쿠폰 입력 */}
              <Card>
                <CardHeader>
                  <CardTitle>할인 쿠폰</CardTitle>
                </CardHeader>
                <CardContent>
                  <CouponInput
                    onApply={handleCouponApply}
                    onRemove={handleCouponRemove}
                    availableCoupons={coupons}
                    appliedCoupons={[]}
                    showSuggestions={true}
                    placeholder="쿠폰 코드를 입력하세요"
                  />
                </CardContent>
              </Card>

              {/* 주문 요약 */}
              <OrderSummary
                items={orderItems}
                subtotal={208000}
                discount={40000}
                couponDiscount={20000}
                tax={0}
                total={148000}
                currency="KRW"
                showItemImages={true}
                showRemoveButton={true}
                onItemRemove={(itemId) => console.log('아이템 제거:', itemId)}
                onQuantityChange={(itemId, quantity) => 
                  console.log('수량 변경:', itemId, quantity)
                }
              />

              {/* 결제 버튼 */}
              <div className="sticky top-6">
                <button className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors">
                  148,000원 결제하기
                </button>
                
                <p className="text-xs text-muted-foreground text-center mt-3">
                  결제 시 <span className="font-medium">이용약관</span> 및{' '}
                  <span className="font-medium">개인정보처리방침</span>에 동의합니다.
                </p>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>
    </div>
  )
}