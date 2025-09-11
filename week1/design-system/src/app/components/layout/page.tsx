"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, Heart, ShoppingCart, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseCard } from '@/components/ui/course-card'
import { Container } from '@/components/ui/container'
import { Grid, GridItem } from '@/components/ui/grid'
import { Section } from '@/components/ui/section'
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import { getConsistentCourseThumb } from '@/lib/sample-images'

export default function LayoutComponentsPage() {
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
          카드 & 레이아웃 컴포넌트
        </h1>
        <p className="text-lg text-muted-foreground">
          페이지 레이아웃과 콘텐츠 구조화를 위한 컴포넌트들
        </p>
      </div>

      <div className="space-y-12">
        {/* Card Component */}
        <Section>
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Card</h2>
                <p className="text-muted-foreground mb-4">
                  기본 카드 컴포넌트로 다양한 콘텐츠를 담을 수 있습니다.
                </p>
              </div>
              
              <Grid cols={3}>
                <Card>
                  <CardHeader>
                    <CardTitle>기본 카드</CardTitle>
                    <CardDescription>
                      간단한 설명이 들어갑니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">카드 내용이 여기에 표시됩니다.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>액션 포함 카드</CardTitle>
                    <CardDescription>
                      버튼이 포함된 카드 예시
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">카드 내용과 함께 액션 버튼을 제공합니다.</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">자세히 보기</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>배지 포함 카드</CardTitle>
                    <CardDescription>
                      상태 표시가 있는 카드
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge>New</Badge>
                      <Badge variant="outline">Popular</Badge>
                    </div>
                    <p className="text-sm">다양한 배지로 상태를 표시할 수 있습니다.</p>
                  </CardContent>
                </Card>
              </Grid>
            </div>
          </Container>
        </Section>

        {/* CourseCard Component */}
        <Section variant="muted">
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">CourseCard</h2>
                <p className="text-muted-foreground mb-4">
                  강의 미리보기를 위한 전용 카드 컴포넌트입니다.
                </p>
              </div>

              <Grid cols={3}>
                <CourseCard
                  title="React 완벽 마스터 강의"
                  instructor="김개발"
                  price={89000}
                  originalPrice={129000}
                  rating={4.8}
                  reviewCount={1234}
                  level="intermediate"
                  category="웹개발"
                  thumbnail={getConsistentCourseThumb("react-master")}
                />
                
                <CourseCard
                  title="JavaScript 기초부터 고급까지"
                  instructor="이프론트"
                  price={59000}
                  rating={4.6}
                  reviewCount={856}
                  level="beginner"
                  category="프로그래밍"
                  thumbnail={getConsistentCourseThumb("javascript-basic")}
                />

                <CourseCard
                  title="Next.js 실전 프로젝트"
                  instructor="박풀스택"
                  price={119000}
                  originalPrice={149000}
                  rating={4.9}
                  reviewCount={567}
                  level="advanced"
                  category="웹개발"
                  isFavorite={true}
                  thumbnail={getConsistentCourseThumb("nextjs-project")}
                />
              </Grid>
            </div>
          </Container>
        </Section>

        {/* Container Component */}
        <Section>
          <div className="space-y-6">
            <div className="px-4">
              <h2 className="text-2xl font-semibold mb-2">Container</h2>
              <p className="text-muted-foreground mb-4">
                콘텐츠의 최대 너비를 제한하고 중앙 정렬하는 컴포넌트입니다.
              </p>
            </div>

            <div className="space-y-4">
              <Container size="sm">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-sm">Small Container (max-w-2xl)</p>
                  </CardContent>
                </Card>
              </Container>

              <Container size="md">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-sm">Medium Container (max-w-4xl)</p>
                  </CardContent>
                </Card>
              </Container>

              <Container size="lg">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-sm">Large Container (max-w-6xl) - 기본값</p>
                  </CardContent>
                </Card>
              </Container>
            </div>
          </div>
        </Section>

        {/* Grid Component */}
        <Section variant="muted">
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Grid & GridItem</h2>
                <p className="text-muted-foreground mb-4">
                  반응형 그리드 시스템으로 콘텐츠를 정렬합니다.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">기본 3컬럼 그리드</h3>
                  <Grid cols={3} gap="md">
                    {Array.from({ length: 6 }, (_, i) => (
                      <Card key={i}>
                        <CardContent className="pt-6">
                          <p className="text-center text-sm">Grid Item {i + 1}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </Grid>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">반응형 그리드</h3>
                  <Grid responsive gap="lg">
                    {Array.from({ length: 4 }, (_, i) => (
                      <Card key={i}>
                        <CardContent className="pt-6">
                          <p className="text-center text-sm">
                            반응형 Item {i + 1}
                            <br />
                            <span className="text-xs text-muted-foreground">
                              1컬럼 → 2컬럼 → 3컬럼
                            </span>
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </Grid>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section Component */}
        <div className="space-y-0">
          <Section variant="default" padding="lg">
            <Container>
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">Section</h2>
                <p className="text-muted-foreground mb-4">
                  페이지를 논리적으로 구분하는 섹션 컴포넌트입니다.
                </p>
                <p className="text-sm">이 섹션은 기본 배경과 큰 패딩을 사용합니다.</p>
              </div>
            </Container>
          </Section>

          <Section variant="muted" padding="md">
            <Container>
              <div className="text-center">
                <p className="text-sm">회색 배경과 중간 패딩을 사용하는 섹션</p>
              </div>
            </Container>
          </Section>

          <Section variant="accent" padding="sm">
            <Container>
              <div className="text-center">
                <p className="text-sm">강조 배경과 작은 패딩을 사용하는 섹션</p>
              </div>
            </Container>
          </Section>
        </div>

        {/* Sidebar Component */}
        <Section>
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Sidebar</h2>
                <p className="text-muted-foreground mb-4">
                  접을 수 있는 사이드바 컴포넌트입니다.
                </p>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="flex h-96">
                  <Sidebar collapsible defaultCollapsed={false} width="md">
                    <SidebarHeader>
                      <h3 className="font-semibold">필터</h3>
                    </SidebarHeader>
                    <SidebarContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">카테고리</h4>
                          <div className="space-y-2">
                            <label className="flex items-center text-sm">
                              <input type="checkbox" className="mr-2" />
                              웹개발
                            </label>
                            <label className="flex items-center text-sm">
                              <input type="checkbox" className="mr-2" />
                              모바일앱
                            </label>
                            <label className="flex items-center text-sm">
                              <input type="checkbox" className="mr-2" />
                              데이터사이언스
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-2">난이도</h4>
                          <div className="space-y-2">
                            <label className="flex items-center text-sm">
                              <input type="radio" name="level" className="mr-2" />
                              초급
                            </label>
                            <label className="flex items-center text-sm">
                              <input type="radio" name="level" className="mr-2" />
                              중급
                            </label>
                            <label className="flex items-center text-sm">
                              <input type="radio" name="level" className="mr-2" />
                              고급
                            </label>
                          </div>
                        </div>
                      </div>
                    </SidebarContent>
                  </Sidebar>

                  <div className="flex-1 p-6">
                    <div className="text-center text-muted-foreground">
                      <p>메인 콘텐츠 영역</p>
                      <p className="text-sm mt-2">
                        사이드바의 접기/펴기 버튼을 클릭해보세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </div>
  )
}