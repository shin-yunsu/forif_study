"use client"

import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Image } from "@/components/ui/image"
import { VideoPlayer } from "@/components/ui/video-player"
import { Info, User, Settings, Bell, Mail } from "lucide-react"
import { getConsistentCourseThumb, getConsistentAvatar } from "@/lib/sample-images"

export default function UtilitiesPage() {
  return (
    <Container size="lg">
      <div className="space-y-8 py-8">
        {/* Header */}
        <div className="space-y-2">
          <Heading size="h1">유틸리티 컴포넌트</Heading>
          <Text size="lg" color="muted">
            구분선, 탭, 아코디언, 아바타, 툴팁, 페이지네이션 등 다양한 유틸리티 컴포넌트들
          </Text>
        </div>

        <div className="space-y-12">
          {/* Separator */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">Separator (구분선)</Heading>
              <Text color="muted">섹션을 구분하는 구분선 컴포넌트</Text>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Text>가로 구분선</Text>
                  <Separator />
                  <Text>세로 구분선</Text>
                  <div className="flex h-12 items-center space-x-4">
                    <Text>Left</Text>
                    <Separator orientation="vertical" />
                    <Text>Right</Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Tabs */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">Tabs (탭)</Heading>
              <Text color="muted">컨텐츠 영역 전환을 위한 탭 네비게이션</Text>
            </div>
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="account" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="space-y-4">
                    <Heading size="h3">Account</Heading>
                    <Text>계정 정보를 관리할 수 있습니다.</Text>
                  </TabsContent>
                  <TabsContent value="password" className="space-y-4">
                    <Heading size="h3">Password</Heading>
                    <Text>비밀번호를 변경할 수 있습니다.</Text>
                  </TabsContent>
                  <TabsContent value="settings" className="space-y-4">
                    <Heading size="h3">Settings</Heading>
                    <Text>시스템 설정을 변경할 수 있습니다.</Text>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {/* Accordion */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">Accordion (아코디언)</Heading>
              <Text color="muted">접을 수 있는 섹션으로 FAQ나 상세 정보 표시</Text>
            </div>
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>강의는 언제까지 들을 수 있나요?</AccordionTrigger>
                    <AccordionContent>
                      강의는 구매일로부터 평생 수강 가능합니다. 언제든지 원하는 시간에 반복 학습하실 수 있습니다.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>환불 정책은 어떻게 되나요?</AccordionTrigger>
                    <AccordionContent>
                      구매 후 7일 이내에 수강률 10% 미만인 경우 100% 환불 가능합니다.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>수료증을 받을 수 있나요?</AccordionTrigger>
                    <AccordionContent>
                      모든 강의를 완주하시면 수료증을 발급해드립니다. 수료증은 PDF 형태로 다운로드 가능합니다.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </section>

          {/* Avatar */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">Avatar (아바타)</Heading>
              <Text color="muted">사용자 프로필 이미지 표시</Text>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar size="sm">
                    <AvatarImage src={getConsistentAvatar("utils-user1")} />
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <Avatar size="md">
                    <AvatarImage src={getConsistentAvatar("utils-user2")} />
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg">
                    <AvatarImage src={getConsistentAvatar("utils-user3")} />
                    <AvatarFallback>U3</AvatarFallback>
                  </Avatar>
                  <Avatar size="xl">
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <Avatar size="2xl">
                    <AvatarFallback>KD</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Tooltip */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">Tooltip (툴팁)</Heading>
              <Text color="muted">추가 정보 표시를 위한 호버 툴팁</Text>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>추가 정보</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>설정</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>알림</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Pagination */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">Pagination (페이지네이션)</Heading>
              <Text color="muted">페이지 번호 표시 및 네비게이션</Text>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">8</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">9</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">10</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Media Components */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">미디어 컴포넌트</Heading>
              <Text color="muted">이미지와 비디오 플레이어 컴포넌트</Text>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Image</CardTitle>
                  <CardDescription>최적화된 이미지 컴포넌트</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Text size="sm" color="muted">둥근 모서리</Text>
                      <Image
                        src={getConsistentCourseThumb("utils-image1")}
                        alt="Course thumbnail"
                        width={150}
                        height={100}
                        radius="lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Text size="sm" color="muted">원형</Text>
                      <Image
                        src={getConsistentCourseThumb("utils-image2")}
                        alt="Profile"
                        width={100}
                        height={100}
                        radius="full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Player */}
              <Card>
                <CardHeader>
                  <CardTitle>Video Player</CardTitle>
                  <CardDescription>강의 미리보기 비디오 플레이어</CardDescription>
                </CardHeader>
                <CardContent>
                  <VideoPlayer
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    poster={getConsistentCourseThumb("utils-video")}
                    title="샘플 강의 영상"
                    duration={596}
                    className="w-full"
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