"use client"

import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PriceCard, type CourseFeature } from "@/components/ui/price-card"
import { PaymentMethod } from "@/components/ui/payment-method"
import { CouponInput, type AppliedCoupon } from "@/components/ui/coupon-input"
import { OrderSummary, type OrderItem, type OrderDiscount } from "@/components/ui/order-summary"
import { PaymentForm, type PaymentFormData } from "@/components/ui/payment-form"
import { useState } from "react"
import { Clock, Users, Play, Download, Award, Headphones, BookOpen, Video } from "lucide-react"
import { getConsistentCourseThumb } from "@/lib/sample-images"

const sampleFeatures: CourseFeature[] = [
  { icon: <Video className="h-4 w-4" />, text: "30시간 동영상 강의", included: true },
  { icon: <Download className="h-4 w-4" />, text: "강의 자료 다운로드", included: true },
  { icon: <Award className="h-4 w-4" />, text: "수료증 발급", included: true },
  { icon: <Headphones className="h-4 w-4" />, text: "1:1 멘토링", included: true },
  { icon: <BookOpen className="h-4 w-4" />, text: "실습 프로젝트", included: true },
  { icon: <Users className="h-4 w-4" />, text: "커뮤니티 액세스", included: false }
]

const sampleOrderItems: OrderItem[] = [
  {
    id: "1",
    name: "React 마스터 클래스",
    description: "현업 개발자와 함께하는 실전 React 개발",
    price: 89000,
    originalPrice: 129000,
    quantity: 1,
    thumbnail: getConsistentCourseThumb("react-masterclass"),
    badge: "베스트셀러",
    badgeColor: "default"
  },
  {
    id: "2", 
    name: "TypeScript 완전정복",
    description: "타입스크립트 기초부터 고급까지",
    price: 65000,
    originalPrice: 95000,
    quantity: 1,
    thumbnail: getConsistentCourseThumb("typescript-complete"),
    badge: "신규",
    badgeColor: "success"
  }
]

const sampleDiscounts: OrderDiscount[] = [
  {
    type: "coupon",
    name: "신규회원 20% 할인",
    code: "WELCOME20",
    amount: 30800,
    description: "첫 구매 고객 대상"
  },
  {
    type: "promotion",
    name: "번들 할인",
    amount: 15000,
    description: "2개 이상 구매시 추가 할인"
  }
]

export default function PaymentPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")
  const [appliedCoupons, setAppliedCoupons] = useState<AppliedCoupon[]>([])

  const handlePurchase = () => {
    alert("구매 버튼 클릭!")
  }

  const handleAddToCart = () => {
    alert("장바구니에 추가!")
  }

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value)
    console.log("Selected payment method:", value)
  }

  const handleApplyCoupon = async (code: string): Promise<AppliedCoupon | null> => {
    // 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (code === "SAVE20") {
      const newCoupon: AppliedCoupon = {
        code: "SAVE20",
        name: "20% 할인 쿠폰",
        discountType: "percentage",
        discountValue: 20,
        discountAmount: 30000,
        description: "모든 강의 20% 할인"
      }
      setAppliedCoupons(prev => [...prev, newCoupon])
      return newCoupon
    }
    
    if (code === "FIRST") {
      const newCoupon: AppliedCoupon = {
        code: "FIRST",
        name: "신규회원 할인",
        discountType: "fixed",
        discountValue: 10000,
        discountAmount: 10000,
        description: "첫 구매 고객 1만원 할인"
      }
      setAppliedCoupons(prev => [...prev, newCoupon])
      return newCoupon
    }
    
    return null
  }

  const handleRemoveCoupon = (code: string) => {
    setAppliedCoupons(prev => prev.filter(coupon => coupon.code !== code))
  }

  const handlePaymentSubmit = (data: PaymentFormData) => {
    console.log("Payment form data:", data)
    alert("결제 정보 제출!")
  }

  return (
    <Container size="lg">
      <div className="space-y-8 py-8">
        {/* Header */}
        <div className="space-y-2">
          <Heading size="h1">결제 컴포넌트</Heading>
          <Text size="lg" color="muted">
            가격 카드, 결제 수단, 쿠폰, 주문 요약, 결제 폼 등 결제 관련 컴포넌트들
          </Text>
        </div>

        <div className="space-y-12">
          {/* 가격 카드 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">가격 카드</Heading>
              <Text color="muted">강의 가격 정보와 구매 옵션을 표시하는 카드</Text>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PriceCard
                title="React 기초 과정"
                description="리액트의 기본 개념부터 실전까지"
                price={59000}
                originalPrice={89000}
                discountPercentage={34}
                features={sampleFeatures.slice(0, 4)}
                rating={4.8}
                reviewCount={234}
                studentCount={1205}
                duration="12시간"
                videoCount={45}
                onPurchase={handlePurchase}
                onAddToCart={handleAddToCart}
                showAddToCart
              />

              <PriceCard
                variant="featured"
                title="React 마스터 클래스"
                description="현업 개발자와 함께하는 실전 React"
                price={89000}
                originalPrice={129000}
                discountPercentage={31}
                features={sampleFeatures}
                rating={4.9}
                reviewCount={567}
                studentCount={2840}
                duration="30시간"
                videoCount={120}
                badge="베스트셀러"
                badgeColor="default"
                onPurchase={handlePurchase}
                onAddToCart={handleAddToCart}
                showAddToCart
                size="lg"
              />

              <PriceCard
                title="TypeScript 완전정복"
                description="타입스크립트 기초부터 고급까지"
                price={65000}
                originalPrice={95000}
                discountPercentage={32}
                features={sampleFeatures.slice(0, 5)}
                rating={4.7}
                reviewCount={189}
                studentCount={856}
                duration="18시간"
                videoCount={68}
                badge="신규"
                badgeColor="success"
                onPurchase={handlePurchase}
              />
            </div>
          </section>

          {/* 결제 수단 선택 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">결제 수단 선택</Heading>
              <Text color="muted">다양한 결제 방법을 제공하는 컴포넌트</Text>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>결제 방법 선택</CardTitle>
                <CardDescription>원하시는 결제 수단을 선택해주세요</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentMethod
                  value={selectedPaymentMethod}
                  onValueChange={handlePaymentMethodChange}
                  showFees
                  showProcessingTime
                />
              </CardContent>
            </Card>
          </section>

          {/* 쿠폰 입력 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">쿠폰 입력</Heading>
              <Text color="muted">할인 쿠폰을 적용할 수 있는 컴포넌트</Text>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>기본 쿠폰 입력</CardTitle>
                  <CardDescription>인라인 스타일</CardDescription>
                </CardHeader>
                <CardContent>
                  <CouponInput
                    variant="inline"
                    onApply={handleApplyCoupon}
                    onRemove={handleRemoveCoupon}
                    appliedCoupons={appliedCoupons}
                    suggestions={["SAVE20", "FIRST", "WELCOME10"]}
                    showSuggestions
                  />
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                    <p>테스트 쿠폰: SAVE20, FIRST</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>카드 스타일 쿠폰</CardTitle>
                  <CardDescription>풍부한 정보 표시</CardDescription>
                </CardHeader>
                <CardContent>
                  <CouponInput
                    variant="card"
                    onApply={handleApplyCoupon}
                    onRemove={handleRemoveCoupon}
                    appliedCoupons={appliedCoupons.slice(0, 1)} // 첫 번째만 표시
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 주문 요약 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">주문 요약</Heading>
              <Text color="muted">장바구니 항목과 결제 금액을 요약</Text>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OrderSummary
                items={sampleOrderItems}
                discounts={sampleDiscounts}
                showItemDetails
                showDiscountDetails
                onEditCart={() => alert("장바구니 편집")}
                onApplyCoupon={() => alert("쿠폰 적용")}
                editable
              />

              <OrderSummary
                variant="detailed"
                title="최종 결제 내역"
                items={sampleOrderItems}
                discounts={sampleDiscounts}
                taxes={[
                  { name: "부가세", rate: 10, amount: 10830 }
                ]}
                showTaxBreakdown
                footer={
                  <div className="text-center">
                    <Text size="sm" color="muted">
                      결제 완료 후 즉시 수강 가능합니다
                    </Text>
                  </div>
                }
              />
            </div>
          </section>

          {/* 결제 폼 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">결제 폼</Heading>
              <Text color="muted">신용카드 결제 정보 입력 폼</Text>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PaymentForm
                onSubmit={handlePaymentSubmit}
                showSaveCard
                showSecurityBadges
              />

              <PaymentForm
                variant="card"
                title="카드 결제 정보"
                onSubmit={handlePaymentSubmit}
                showSaveCard
                acceptedCards={["visa", "mastercard", "amex", "jcb"]}
              />
            </div>
          </section>

          {/* 통합 결제 플로우 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">통합 결제 플로우</Heading>
              <Text color="muted">실제 결제 페이지와 유사한 레이아웃</Text>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 주문 요약 */}
              <div className="lg:col-span-1">
                <OrderSummary
                  variant="compact"
                  items={sampleOrderItems.slice(0, 1)}
                  discounts={sampleDiscounts.slice(0, 1)}
                  showItemDetails={false}
                />
              </div>

              {/* 결제 정보 */}
              <div className="lg:col-span-2 space-y-6">
                <PaymentMethod
                  value={selectedPaymentMethod}
                  onValueChange={handlePaymentMethodChange}
                />
                
                {selectedPaymentMethod === "card" && (
                  <PaymentForm
                    variant="inline"
                    title="카드 정보"
                    onSubmit={handlePaymentSubmit}
                    showSaveCard
                  />
                )}

                <CouponInput
                  variant="inline"
                  placeholder="쿠폰 코드 입력"
                  onApply={handleApplyCoupon}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Container>
  )
}