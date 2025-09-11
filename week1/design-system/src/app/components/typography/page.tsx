"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Grid } from '@/components/ui/grid'
import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Link as CustomLink } from '@/components/ui/link'
import { Price } from '@/components/ui/price'
import { Rating } from '@/components/ui/rating'

export default function TypographyComponentsPage() {
  const [rating, setRating] = useState(4.5)
  
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/components" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          컴포넌트 목록으로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          텍스트 & 타이포그래피 컴포넌트
        </h1>
        <p className="text-lg text-muted-foreground">
          텍스트 표시와 타이포그래피 관련 컴포넌트들
        </p>
      </div>

      <div className="space-y-12">
        {/* Heading Component */}
        <Section>
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Heading</h2>
                <p className="text-muted-foreground mb-4">
                  다양한 크기와 스타일의 제목을 표시하는 컴포넌트입니다.
                </p>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>크기별 제목</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Heading size="h1">H1 제목 - 가장 큰 제목</Heading>
                    </div>
                    <div>
                      <Heading size="h2">H2 제목 - 섹션 제목</Heading>
                    </div>
                    <div>
                      <Heading size="h3">H3 제목 - 서브섹션</Heading>
                    </div>
                    <div>
                      <Heading size="h4">H4 제목 - 소제목</Heading>
                    </div>
                    <div>
                      <Heading size="h5">H5 제목 - 작은 제목</Heading>
                    </div>
                    <div>
                      <Heading size="h6">H6 제목 - 가장 작은 제목</Heading>
                    </div>
                  </CardContent>
                </Card>

                <Grid cols={2} gap="md">
                  <Card>
                    <CardHeader>
                      <CardTitle>굵기 변형</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Heading size="h3" weight="light">Light 제목</Heading>
                      <Heading size="h3" weight="normal">Normal 제목</Heading>
                      <Heading size="h3" weight="medium">Medium 제목</Heading>
                      <Heading size="h3" weight="semibold">Semibold 제목</Heading>
                      <Heading size="h3" weight="bold">Bold 제목</Heading>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>색상 변형</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Heading size="h4" color="default">기본 색상</Heading>
                      <Heading size="h4" color="muted">흐린 색상</Heading>
                      <Heading size="h4" color="primary">주요 색상</Heading>
                      <Heading size="h4" color="destructive">위험 색상</Heading>
                    </CardContent>
                  </Card>
                </Grid>
              </div>
            </div>
          </Container>
        </Section>

        {/* Text Component */}
        <Section variant="muted">
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Text/Paragraph</h2>
                <p className="text-muted-foreground mb-4">
                  본문 텍스트와 문단을 표시하는 컴포넌트입니다.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>크기별 텍스트</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Text size="xs">매우 작은 텍스트 (xs)</Text>
                    <Text size="sm">작은 텍스트 (sm)</Text>
                    <Text size="base">기본 텍스트 (base)</Text>
                    <Text size="lg">큰 텍스트 (lg)</Text>
                    <Text size="xl">매우 큰 텍스트 (xl)</Text>
                    <Text size="2xl">가장 큰 텍스트 (2xl)</Text>
                  </CardContent>
                </Card>

                <Grid cols={2} gap="md">
                  <Card>
                    <CardHeader>
                      <CardTitle>색상 변형</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Text color="default">기본 색상 텍스트</Text>
                      <Text color="muted">흐린 색상 텍스트</Text>
                      <Text color="primary">주요 색상 텍스트</Text>
                      <Text color="destructive">위험 색상 텍스트</Text>
                      <Text color="success">성공 색상 텍스트</Text>
                      <Text color="warning">경고 색상 텍스트</Text>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>줄 간격</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Text size="sm" color="muted">Tight (촘촘한 간격):</Text>
                        <Text leading="tight">
                          이 텍스트는 촘촘한 줄 간격을 사용합니다. 
                          여러 줄에 걸쳐 표시될 때 줄 사이의 간격이 좁습니다.
                        </Text>
                      </div>
                      <div>
                        <Text size="sm" color="muted">Relaxed (여유로운 간격):</Text>
                        <Text leading="relaxed">
                          이 텍스트는 여유로운 줄 간격을 사용합니다. 
                          여러 줄에 걸쳐 표시될 때 줄 사이의 간격이 넓어 읽기 편합니다.
                        </Text>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>

                <Card>
                  <CardHeader>
                    <CardTitle>텍스트 요소 변형</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Text as="p">문단으로 표시되는 텍스트입니다.</Text>
                    <Text as="span" weight="semibold">인라인 스팬으로 표시되는 굵은 텍스트입니다.</Text>
                    <Text as="strong" color="primary">Strong 태그로 표시되는 중요한 텍스트입니다.</Text>
                    <Text as="em" color="muted">Em 태그로 표시되는 강조 텍스트입니다.</Text>
                    <Text as="small" size="sm">Small 태그로 표시되는 작은 텍스트입니다.</Text>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Link Component */}
        <Section>
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Link</h2>
                <p className="text-muted-foreground mb-4">
                  내부 및 외부 링크를 처리하는 컴포넌트입니다.
                </p>
              </div>

              <Grid cols={2} gap="md">
                <Card>
                  <CardHeader>
                    <CardTitle>내부 링크</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <CustomLink href="/components">컴포넌트 목록</CustomLink>
                    </div>
                    <div>
                      <CustomLink href="/components/forms" variant="muted">
                        폼 컴포넌트 (muted)
                      </CustomLink>
                    </div>
                    <div>
                      <CustomLink href="/components/layout" size="lg">
                        레이아웃 컴포넌트 (large)
                      </CustomLink>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>외부 링크</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <CustomLink href="https://ui.shadcn.com" external>
                        shadcn/ui 공식 사이트
                      </CustomLink>
                    </div>
                    <div>
                      <CustomLink 
                        href="https://tailwindcss.com" 
                        external 
                        showExternalIcon={false}
                        variant="muted"
                      >
                        Tailwind CSS (아이콘 없음)
                      </CustomLink>
                    </div>
                    <div>
                      <CustomLink href="mailto:contact@example.com" external size="sm">
                        이메일 보내기
                      </CustomLink>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Card>
                <CardHeader>
                  <CardTitle>링크 변형</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <CustomLink href="#" variant="default">기본 링크</CustomLink>
                    <CustomLink href="#" variant="muted">흐린 링크</CustomLink>
                    <CustomLink href="#" variant="destructive">위험 링크</CustomLink>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <CustomLink href="#" size="sm">작은 링크</CustomLink>
                    <CustomLink href="#" size="base">기본 크기</CustomLink>
                    <CustomLink href="#" size="lg">큰 링크</CustomLink>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Price Component */}
        <Section variant="muted">
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Price</h2>
                <p className="text-muted-foreground mb-4">
                  가격을 표시하고 할인 정보를 처리하는 컴포넌트입니다.
                </p>
              </div>

              <Grid cols={2} gap="md">
                <Card>
                  <CardHeader>
                    <CardTitle>기본 가격</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Text size="sm" color="muted">일반 가격:</Text>
                      <Price amount={89000} />
                    </div>
                    <div>
                      <Text size="sm" color="muted">큰 가격:</Text>
                      <Price amount={129000} size="lg" />
                    </div>
                    <div>
                      <Text size="sm" color="muted">특별가:</Text>
                      <Price amount={59000} size="xl" color="primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>할인 가격</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Text size="sm" color="muted">30% 할인:</Text>
                      <Price amount={69000} originalAmount={99000} />
                    </div>
                    <div>
                      <Text size="sm" color="muted">50% 할인 (큰 크기):</Text>
                      <Price 
                        amount={59000} 
                        originalAmount={119000} 
                        size="lg"
                        color="success"
                      />
                    </div>
                    <div>
                      <Text size="sm" color="muted">할인율 숨김:</Text>
                      <Price 
                        amount={79000} 
                        originalAmount={99000} 
                        showDiscount={false}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Card>
                <CardHeader>
                  <CardTitle>다양한 통화</CardTitle>
                  <CardDescription>
                    다른 통화와 로케일로 가격을 표시할 수 있습니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Text size="sm" color="muted">한국 원화:</Text>
                      <Price amount={99000} currency="KRW" locale="ko-KR" />
                    </div>
                    <div>
                      <Text size="sm" color="muted">미국 달러:</Text>
                      <Price amount={79} currency="USD" locale="en-US" />
                    </div>
                    <div>
                      <Text size="sm" color="muted">유로:</Text>
                      <Price amount={69} currency="EUR" locale="de-DE" />
                    </div>
                    <div>
                      <Text size="sm" color="muted">일본 엔화:</Text>
                      <Price amount={8900} currency="JPY" locale="ja-JP" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Rating Component */}
        <Section>
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Rating</h2>
                <p className="text-muted-foreground mb-4">
                  별점을 표시하고 사용자 평가를 받는 컴포넌트입니다.
                </p>
              </div>

              <Grid cols={2} gap="md">
                <Card>
                  <CardHeader>
                    <CardTitle>읽기 전용 평점</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Text size="sm" color="muted">소형 평점:</Text>
                      <Rating rating={4.5} size="sm" reviewCount={1234} />
                    </div>
                    <div>
                      <Text size="sm" color="muted">중형 평점:</Text>
                      <Rating rating={4.8} size="md" reviewCount={567} />
                    </div>
                    <div>
                      <Text size="sm" color="muted">대형 평점:</Text>
                      <Rating rating={4.2} size="lg" reviewCount={89} />
                    </div>
                    <div>
                      <Text size="sm" color="muted">값 숨김:</Text>
                      <Rating rating={3.7} showValue={false} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>상호작용 평점</CardTitle>
                    <CardDescription>
                      별을 클릭하여 평점을 변경해보세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Text size="sm" color="muted">현재 평점: {rating}</Text>
                      <Rating 
                        rating={rating} 
                        readonly={false}
                        onRatingChange={setRating}
                        size="lg"
                      />
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setRating(4.5)}
                    >
                      평점 초기화
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Card>
                <CardHeader>
                  <CardTitle>부분 평점</CardTitle>
                  <CardDescription>
                    소수점이 포함된 평점도 정확히 표시됩니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <Text size="sm" color="muted">1.0점</Text>
                      <Rating rating={1.0} />
                    </div>
                    <div>
                      <Text size="sm" color="muted">2.3점</Text>
                      <Rating rating={2.3} />
                    </div>
                    <div>
                      <Text size="sm" color="muted">3.7점</Text>
                      <Rating rating={3.7} />
                    </div>
                    <div>
                      <Text size="sm" color="muted">4.1점</Text>
                      <Rating rating={4.1} />
                    </div>
                    <div>
                      <Text size="sm" color="muted">5.0점</Text>
                      <Rating rating={5.0} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>
      </div>
    </div>
  )
}