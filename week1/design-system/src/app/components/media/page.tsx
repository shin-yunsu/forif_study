"use client"

import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icon } from "@/components/ui/icon"
import { Image } from "@/components/ui/image"
import { VideoPlayer } from "@/components/ui/video-player"
import { useState } from "react"
import { getRandomCourseThumb, getConsistentCourseThumb, getConsistentAvatar } from "@/lib/sample-images"

export default function MediaPage() {
  const [videoState, setVideoState] = useState({
    isPlaying: false,
    isMuted: false,
    currentTime: 0,
    duration: 0
  })

  const handleVideoPlay = () => {
    setVideoState(prev => ({ ...prev, isPlaying: true }))
    console.log("Video play")
  }

  const handleVideoPause = () => {
    setVideoState(prev => ({ ...prev, isPlaying: false }))
    console.log("Video pause")
  }

  const handleVideoTimeUpdate = (currentTime: number) => {
    setVideoState(prev => ({ ...prev, currentTime }))
  }

  const handleVideoLoadedMetadata = (duration: number) => {
    setVideoState(prev => ({ ...prev, duration }))
  }

  const handleVideoMute = () => {
    setVideoState(prev => ({ ...prev, isMuted: !prev.isMuted }))
  }

  const handleVideoFullscreen = () => {
    console.log("Video fullscreen")
  }

  return (
    <Container size="lg">
      <div className="space-y-8 py-8">
        {/* Header */}
        <div className="space-y-2">
          <Heading size="h1">미디어 & 이미지 컴포넌트</Heading>
          <Text size="lg" color="muted">
            이미지, 아바타, 아이콘, 비디오 플레이어 등 미디어 관련 컴포넌트들
          </Text>
        </div>

        <div className="space-y-12">
          {/* 이미지 컴포넌트 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">이미지</Heading>
              <Text color="muted">최적화된 이미지 컴포넌트</Text>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>기본 이미지</CardTitle>
                  <CardDescription>기본 설정</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Image
                    src={getConsistentCourseThumb("basic-image")}
                    alt="샘플 이미지"
                    width={300}
                    height={200}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>둥근 모서리</CardTitle>
                  <CardDescription>border radius 적용</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Image
                    src={getConsistentCourseThumb("rounded-lg")}
                    alt="둥근 이미지"
                    width={300}
                    height={200}
                    radius="lg"
                  />
                  <Image
                    src={getConsistentCourseThumb("rounded-full")}
                    alt="원형 이미지"
                    width={150}
                    height={150}
                    radius="full"
                    objectFit="cover"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>다양한 크기</CardTitle>
                  <CardDescription>responsive 이미지</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Image
                    src={getConsistentCourseThumb("small-image")}
                    alt="작은 이미지"
                    width={200}
                    height={150}
                    radius="md"
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 아바타 컴포넌트 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">아바타</Heading>
              <Text color="muted">사용자 프로필 이미지</Text>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>기본 아바타</CardTitle>
                  <CardDescription>다양한 크기 옵션</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar size="sm">
                      <AvatarImage src={getConsistentAvatar("user1")} alt="사용자1" />
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarImage src={getConsistentAvatar("user2")} alt="사용자2" />
                      <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg">
                      <AvatarImage src={getConsistentAvatar("user3")} alt="사용자3" />
                      <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                    <Avatar size="xl">
                      <AvatarImage src="" alt="fallback example" />
                      <AvatarFallback>FB</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>사용자 정보와 함께</CardTitle>
                  <CardDescription>실제 사용 예시</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Avatar size="lg">
                      <AvatarImage src={getConsistentAvatar("hong-gildong")} alt="사용자" />
                      <AvatarFallback>홍길동</AvatarFallback>
                    </Avatar>
                    <div>
                      <Text weight="medium">홍길동</Text>
                      <Text size="sm" color="muted">frontend@example.com</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 아이콘 컴포넌트 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">아이콘</Heading>
              <Text color="muted">Lucide React 아이콘 시스템</Text>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>기본 아이콘</CardTitle>
                  <CardDescription>다양한 크기와 색상</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col items-center space-y-2">
                      <Icon name="Home" size="sm" />
                      <Text size="xs">Small</Text>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Icon name="User" size="md" />
                      <Text size="xs">Medium</Text>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Icon name="Settings" size="lg" />
                      <Text size="xs">Large</Text>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Icon name="Heart" size="xl" color="red" />
                      <Text size="xs">XL Red</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>다양한 아이콘</CardTitle>
                  <CardDescription>일반적으로 사용되는 아이콘들</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-6 gap-4">
                    {["Mail", "Phone", "MapPin", "Calendar", "Clock", "Star", 
                      "Download", "Upload", "Search", "Filter", "Edit", "Trash2"].map((iconName) => (
                      <div key={iconName} className="flex flex-col items-center space-y-1">
                        <Icon name={iconName as any} size="md" />
                        <Text size="xs" className="text-center">{iconName}</Text>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 비디오 플레이어 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">비디오 플레이어</Heading>
              <Text color="muted">강의 미리보기용 비디오 플레이어</Text>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>기본 비디오 플레이어</CardTitle>
                  <CardDescription>썸네일과 컨트롤러 포함</CardDescription>
                </CardHeader>
                <CardContent>
                  <VideoPlayer
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    poster={getConsistentCourseThumb("video-poster-1")}
                    title="샘플 강의 비디오"
                    duration={596}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onTimeUpdate={handleVideoTimeUpdate}
                    onLoadedMetadata={handleVideoLoadedMetadata}
                    onMute={handleVideoMute}
                    onFullscreen={handleVideoFullscreen}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>자동재생 비디오</CardTitle>
                  <CardDescription>autoPlay 옵션</CardDescription>
                </CardHeader>
                <CardContent>
                  <VideoPlayer
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                    poster={getConsistentCourseThumb("video-poster-2")}
                    title="자동재생 데모"
                    duration={653}
                    autoPlay
                    muted
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onTimeUpdate={handleVideoTimeUpdate}
                    onLoadedMetadata={handleVideoLoadedMetadata}
                    onMute={handleVideoMute}
                    onFullscreen={handleVideoFullscreen}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 통합 예시 */}
          <section className="space-y-6">
            <div className="space-y-2">
              <Heading size="h2">통합 예시</Heading>
              <Text color="muted">실제 사용 시나리오</Text>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>강사 소개 카드</CardTitle>
                <CardDescription>아바타, 이미지, 아이콘을 조합한 예시</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar size="xl">
                    <AvatarImage src={getConsistentAvatar("kim-developer")} alt="강사" />
                    <AvatarFallback>강사</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Text size="xl" weight="bold">김개발</Text>
                      <Icon name="BadgeCheck" size="sm" color="blue" />
                    </div>
                    <Text color="muted" className="mb-3">시니어 프론트엔드 개발자</Text>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size="sm" />
                        <span>1,234명 수강</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size="sm" color="yellow" />
                        <span>4.9점 평점</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Play" size="sm" />
                        <span>15개 강의</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Container>
  )
}