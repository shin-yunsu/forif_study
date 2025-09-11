"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Grid } from '@/components/ui/grid'
import { Section } from '@/components/ui/section'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { LoadingSpinner, Skeleton, SkeletonText, SkeletonCard } from '@/components/ui/loading-spinner'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'

export default function FeedbackComponentsPage() {
  const [progress, setProgress] = useState(65)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadingDemo = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 3000)
  }

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
          UI 피드백 컴포넌트
        </h1>
        <p className="text-lg text-muted-foreground">
          사용자 피드백과 상태 표시를 위한 컴포넌트들
        </p>
      </div>

      <div className="space-y-12">
        {/* Toast/Notification Component */}
        <Section>
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Toast/Notification</h2>
                <p className="text-muted-foreground mb-4">
                  사용자에게 즉각적인 피드백을 제공하는 토스트 알림입니다.
                </p>
              </div>
              
              <Grid cols={2} gap="md">
                <Card>
                  <CardHeader>
                    <CardTitle>기본 토스트</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      onClick={() => toast.success('성공적으로 저장되었습니다!')}
                      variant="default"
                      size="sm"
                    >
                      성공 토스트
                    </Button>
                    <Button 
                      onClick={() => toast.error('오류가 발생했습니다.')}
                      variant="destructive"
                      size="sm"
                    >
                      에러 토스트
                    </Button>
                    <Button 
                      onClick={() => toast.info('정보를 확인해주세요.')}
                      variant="outline"
                      size="sm"
                    >
                      정보 토스트
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>로딩 토스트</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => {
                        const loadingToast = toast.loading('처리 중...')
                        setTimeout(() => {
                          toast.success('완료되었습니다!', { id: loadingToast })
                        }, 2000)
                      }}
                      size="sm"
                    >
                      로딩 → 성공 토스트
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </div>
          </Container>
        </Section>

        {/* Loading/Spinner Component */}
        <Section variant="muted">
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Loading/Spinner</h2>
                <p className="text-muted-foreground mb-4">
                  로딩 상태를 표시하는 스피너와 스켈레톤 UI 컴포넌트입니다.
                </p>
              </div>

              <Grid cols={3} gap="lg">
                <Card>
                  <CardHeader>
                    <CardTitle>로딩 스피너</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <LoadingSpinner size="sm" />
                      <span className="text-sm">Small</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <LoadingSpinner size="md" />
                      <span className="text-sm">Medium</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <LoadingSpinner size="lg" />
                      <span className="text-sm">Large</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>스켈레톤 텍스트</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SkeletonText lines={3} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>스켈레톤 카드</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SkeletonCard />
                  </CardContent>
                </Card>
              </Grid>

              <Card>
                <CardHeader>
                  <CardTitle>오버레이 로딩 데모</CardTitle>
                  <CardDescription>
                    버튼을 클릭하면 3초간 오버레이 로딩이 표시됩니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <Button onClick={handleLoadingDemo} disabled={isLoading}>
                    {isLoading ? '로딩 중...' : '로딩 시작'}
                  </Button>
                  {isLoading && <LoadingSpinner overlay />}
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Modal/Dialog Component */}
        <Section>
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Modal/Dialog</h2>
                <p className="text-muted-foreground mb-4">
                  사용자 상호작용을 위한 모달 다이얼로그 컴포넌트입니다.
                </p>
              </div>

              <Grid cols={3} gap="md">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">기본 모달</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>모달 제목</DialogTitle>
                      <DialogDescription>
                        모달의 설명이 여기에 표시됩니다.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm">모달 내용이 여기에 들어갑니다.</p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">취소</Button>
                      <Button>확인</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">삭제 확인 모달</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
                      <DialogDescription>
                        이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">취소</Button>
                      <Button variant="destructive">삭제</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">폼 모달</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>새 항목 추가</DialogTitle>
                      <DialogDescription>
                        새로운 항목을 추가하려면 아래 정보를 입력해주세요.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm font-medium">제목</label>
                        <input className="w-full mt-1 px-3 py-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">설명</label>
                        <textarea className="w-full mt-1 px-3 py-2 border rounded-md" rows={3} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">취소</Button>
                      <Button>저장</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Grid>
            </div>
          </Container>
        </Section>

        {/* Alert Component */}
        <Section variant="muted">
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Alert</h2>
                <p className="text-muted-foreground mb-4">
                  중요한 정보를 사용자에게 전달하는 알림 컴포넌트입니다.
                </p>
              </div>

              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>정보</AlertTitle>
                  <AlertDescription>
                    일반적인 정보를 전달할 때 사용하는 기본 알림입니다.
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>오류</AlertTitle>
                  <AlertDescription>
                    오류나 위험한 상황을 알릴 때 사용하는 알림입니다.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </Container>
        </Section>

        {/* Badge Component */}
        <Section>
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Badge</h2>
                <p className="text-muted-foreground mb-4">
                  상태나 카테고리를 표시하는 배지 컴포넌트입니다.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">기본 배지</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">상태 배지</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      완료
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      대기
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      <Info className="w-3 h-3 mr-1" />
                      진행중
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">카테고리 배지</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">웹개발</Badge>
                    <Badge variant="outline">모바일</Badge>
                    <Badge variant="outline">데이터사이언스</Badge>
                    <Badge variant="outline">AI/ML</Badge>
                    <Badge variant="outline">디자인</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Progress Component */}
        <Section variant="muted">
          <Container>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Progress</h2>
                <p className="text-muted-foreground mb-4">
                  진행 상황을 시각적으로 표시하는 프로그레스 바 컴포넌트입니다.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>강의 진행률</CardTitle>
                    <CardDescription>
                      현재 강의 수강 진행 상황
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>React 기초</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>JavaScript ES6</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>TypeScript</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>인터랙티브 프로그레스</CardTitle>
                    <CardDescription>
                      버튼을 클릭하여 진행률을 변경해보세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>현재 진행률</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setProgress(Math.max(0, progress - 10))}
                      >
                        -10%
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setProgress(Math.min(100, progress + 10))}
                      >
                        +10%
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => setProgress(100)}
                      >
                        완료
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </div>
  )
}