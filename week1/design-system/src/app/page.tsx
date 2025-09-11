'use client'

import { CourseCard } from '@/components/ui/course-card'
import { Container } from '@/components/ui/container'
import { Grid } from '@/components/ui/grid'
import { Section } from '@/components/ui/section'
import { TestimonialsMarquee } from '@/components/ui/testimonials-marquee'
import { Newsletter } from '@/components/ui/newsletter'
import { Mail, Gift, CheckCircle } from 'lucide-react'

export default function HomePage() {
  const courses = [
    {
      id: '1',
      title: 'React 마스터 클래스',
      instructor: '김개발',
      price: 89000,
      originalPrice: 129000,
      rating: 4.8,
      reviewCount: 1234,
      level: 'intermediate' as const,
      thumbnail: '/course-thumbs/2.png',
      tags: ['React', 'JavaScript', 'Frontend'],
      duration: '12시간',
      students: 5678,
    },
    {
      id: '2',
      title: 'Vue.js 완벽 가이드',
      instructor: '박프론트',
      price: 79000,
      originalPrice: 109000,
      rating: 4.7,
      reviewCount: 892,
      level: 'beginner' as const,
      thumbnail: '/course-thumbs/3.png',
      tags: ['Vue.js', 'JavaScript', 'SPA'],
      duration: '10시간',
      students: 3421,
    },
    {
      id: '3',
      title: 'Next.js 실전 프로젝트',
      instructor: '이풀스택',
      price: 119000,
      originalPrice: 159000,
      rating: 4.9,
      reviewCount: 654,
      level: 'advanced' as const,
      thumbnail: '/course-thumbs/4.png',
      tags: ['Next.js', 'React', 'SSR'],
      duration: '15시간',
      students: 2145,
    },
    {
      id: '4',
      title: 'TypeScript 기초부터 심화까지',
      instructor: '최타입',
      price: 69000,
      originalPrice: 99000,
      rating: 4.6,
      reviewCount: 1567,
      level: 'beginner' as const,
      thumbnail: '/course-thumbs/5.png',
      tags: ['TypeScript', 'JavaScript', 'Type Safety'],
      duration: '8시간',
      students: 7890,
    },
    {
      id: '5',
      title: 'Node.js 백엔드 개발',
      instructor: '서백엔드',
      price: 99000,
      originalPrice: 139000,
      rating: 4.7,
      reviewCount: 432,
      level: 'intermediate' as const,
      thumbnail: '/course-thumbs/6.png',
      tags: ['Node.js', 'Express', 'MongoDB'],
      duration: '14시간',
      students: 1876,
    },
    {
      id: '6',
      title: 'Python 데이터 분석',
      instructor: '한데이터',
      price: 89000,
      originalPrice: 119000,
      rating: 4.5,
      reviewCount: 987,
      level: 'beginner' as const,
      thumbnail: '/course-thumbs/7.png',
      tags: ['Python', 'Pandas', 'NumPy'],
      duration: '11시간',
      students: 4532,
    },
  ]

  const testimonials = [
    {
      id: '1',
      name: '김수강생',
      role: '프론트엔드 개발자',
      content: 'React 마스터 클래스를 수강한 후 실력이 확실히 늘었어요. 실무에 바로 적용할 수 있는 내용들이 많아서 정말 만족합니다.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=11',
      tags: ['React', 'Frontend'],
    },
    {
      id: '2',
      name: '박개발자',
      role: '풀스택 개발자',
      content: '강사님의 설명이 정말 명확하고 체계적이에요. 복잡한 개념도 쉽게 이해할 수 있게 설명해주셔서 감사합니다.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=12',
      tags: ['Node.js', 'Backend'],
    },
    {
      id: '3',
      name: '이취준생',
      role: '취업 준비생',
      content: '취업 준비하면서 많은 도움이 되었습니다. 포트폴리오 프로젝트도 완성할 수 있었고, 면접에서도 자신감을 가질 수 있었어요.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=13',
      tags: ['취업', 'Portfolio'],
    },
    {
      id: '4',
      name: '정신입생',
      role: '신입 개발자',
      content: '업무에 바로 적용할 수 있는 실무 중심의 커리큘럼이 좋았습니다. 동료들에게도 추천하고 싶어요.',
      rating: 4,
      avatar: 'https://picsum.photos/100/100?random=14',
      tags: ['실무', 'Career'],
    },
    {
      id: '5',
      name: '최학습자',
      role: 'UI/UX 디자이너',
      content: '개발자와 소통할 때 도움이 많이 되었습니다. 디자이너도 기본적인 개발 지식이 있으면 좋다는 것을 느꼈어요.',
      rating: 4,
      avatar: 'https://picsum.photos/100/100?random=15',
      tags: ['Design', 'Communication'],
    },
    {
      id: '6',
      name: '윤커리어',
      role: '시니어 개발자',
      content: '최신 기술 트렌드를 따라잡기 위해 수강했는데, 정말 알차게 구성되어 있어요. 추천합니다!',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=16',
      tags: ['Senior', 'Tech Trends'],
    },
    {
      id: '7',
      name: '강백엔드',
      role: '백엔드 개발자',
      content: 'Node.js 강의가 정말 실용적이었어요. 실제 서비스 구축까지 경험할 수 있어서 좋았습니다.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=17',
      tags: ['Node.js', 'API'],
    },
    {
      id: '8',
      name: '조데이터',
      role: '데이터 분석가',
      content: 'Python 데이터 분석 강의를 통해 실무에서 바로 활용할 수 있는 스킬을 배웠습니다. 추천해요!',
      rating: 4,
      avatar: 'https://picsum.photos/100/100?random=18',
      tags: ['Python', 'Data'],
    },
    {
      id: '9',
      name: '송모바일',
      role: '모바일 개발자',
      content: '모바일 앱 개발 과정이 체계적으로 잘 구성되어 있어요. 초보자도 따라하기 쉬웠습니다.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=19',
      tags: ['Mobile', 'App'],
    },
    {
      id: '10',
      name: '구클라우드',
      role: '클라우드 엔지니어',
      content: '클라우드 인프라 구축 강의가 실무에 정말 도움이 되었어요. 실제 프로젝트에 바로 적용했습니다.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=20',
      tags: ['Cloud', 'DevOps'],
    },
    {
      id: '11',
      name: '한보안',
      role: '보안 전문가',
      content: '웹 보안 강의를 통해 취약점 분석과 대응 방법을 체계적으로 학습할 수 있었습니다.',
      rating: 4,
      avatar: 'https://picsum.photos/100/100?random=21',
      tags: ['Security', 'Web'],
    },
    {
      id: '12',
      name: '오게임',
      role: '게임 개발자',
      content: '게임 개발 강의가 정말 재미있었어요. 실제로 간단한 게임까지 만들 수 있어서 성취감이 컸습니다.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=22',
      tags: ['Game', 'Unity'],
    },
    {
      id: '13',
      name: '류머신러닝',
      role: 'AI 개발자',
      content: '머신러닝 기초부터 심화까지 단계적으로 학습할 수 있었어요. 프로젝트 위주의 수업이 좋았습니다.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=23',
      tags: ['AI', 'ML'],
    },
    {
      id: '14',
      name: '임블록체인',
      role: '블록체인 개발자',
      content: '블록체인 기술을 처음 접했는데, 이해하기 쉽게 설명해주셔서 빠르게 습득할 수 있었습니다.',
      rating: 4,
      avatar: 'https://picsum.photos/100/100?random=24',
      tags: ['Blockchain', 'Web3'],
    },
    {
      id: '15',
      name: '남테스트',
      role: 'QA 엔지니어',
      content: '테스트 자동화 강의가 정말 유용했어요. 업무 효율성이 크게 향상되었습니다.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=25',
      tags: ['Testing', 'QA'],
    },
    {
      id: '16',
      name: '유프리랜서',
      role: '프리랜서 개발자',
      content: '프리랜서로 일하면서 필요한 다양한 기술들을 배울 수 있었어요. 실무 중심의 커리큘럼이 좋습니다.',
      rating: 4,
      avatar: 'https://picsum.photos/100/100?random=26',
      tags: ['Freelance', 'Multi'],
    },
    {
      id: '17',
      name: '문스타트업',
      role: '스타트업 CTO',
      content: '스타트업에서 필요한 기술 스택을 효율적으로 학습할 수 있었습니다. 팀원들과 함께 수강했어요.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=27',
      tags: ['Startup', 'Leadership'],
    },
    {
      id: '18',
      name: '장전환',
      role: '비개발자 → 개발자',
      content: '비전공자였지만 차근차근 따라할 수 있게 구성되어 있어서 개발자로 전환할 수 있었습니다.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=28',
      tags: ['Career Change', 'Beginner'],
    },
    {
      id: '19',
      name: '차리모트',
      role: '원격 개발자',
      content: '원격 근무 환경에서도 효율적으로 학습할 수 있는 온라인 강의 시스템이 훌륭해요.',
      rating: 4,
      avatar: 'https://picsum.photos/100/100?random=29',
      tags: ['Remote', 'Online'],
    },
    {
      id: '20',
      name: '표국제',
      role: '해외 개발자',
      content: '해외에서도 한국어로 양질의 개발 강의를 들을 수 있어서 정말 감사합니다. 고품질 콘텐츠예요.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=30',
      tags: ['Global', 'Korean'],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* 히어로 섹션 */}
      <section className="relative w-full overflow-hidden py-20 md:py-32">
        {/* Unicorn Studio Background Animation */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            transform: 'scale(1.1)',
            transformOrigin: 'center center',
          }}
        >
          <div 
            data-us-project="HpEe8vhbFUj0SukkJeB9" 
            style={{
              width: '100%',
              height: '100%',
              minWidth: '1440px',
              minHeight: '900px',
            }}
          />
        </div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-sm font-medium text-white/90 uppercase tracking-wide">
              새로운 기술을 배우고 성장하세요
            </p>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              최고의 온라인 학습 플랫폼
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              전 세계 최고의 강사진과 함께하는 프리미엄 온라인 강의로 당신의 개발 실력을 한 단계 업그레이드하세요
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/signup" className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors min-w-[160px] shadow-lg">
                무료 시작하기
              </a>
              
              <button onClick={() => console.log('강의 미리보기 클릭')} className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors min-w-[160px]">
                강의 미리보기
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">10K+</div>
                <div className="text-sm text-white/80">수강생</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">150+</div>
                <div className="text-sm text-white/80">강의</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">50+</div>
                <div className="text-sm text-white/80">강사진</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">4.8</div>
                <div className="text-sm text-white/80">평균 평점</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 수강생 후기 섹션 */}
      <Section variant="muted" className="py-16">
        <Container size="full">
          <TestimonialsMarquee
            title="수강생 후기"
            description="실제 수강생들의 생생한 후기를 확인해보세요"
            testimonials={testimonials}
            showRatings={true}
            cardStyle="default"
            speed={50}
          />
        </Container>
      </Section>

      {/* 강의 그리드 섹션 */}
      <Section className="py-12">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              인기 강의
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              수강생들이 가장 많이 선택한 검증된 강의들을 만나보세요
            </p>
          </div>
          
          <Grid cols={3} gap="lg" className="mb-8">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                instructor={course.instructor}
                price={course.price}
                originalPrice={course.originalPrice}
                rating={course.rating}
                reviewCount={course.reviewCount}
                level={course.level}
                thumbnail={course.thumbnail}
                category={course.tags[0]}
                isFavorite={false}
                onFavoriteToggle={() => console.log('즐겨찾기 토글:', course.id)}
                onAddToCart={() => console.log('장바구니 추가:', course.id)}
              />
            ))}
          </Grid>

          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              더 많은 강의 보기
            </button>
          </div>
        </Container>
      </Section>

      {/* 뉴스레터 섹션 */}
      <Section className="py-12">
        <Container size="lg">
          <Newsletter
            title="최신 소식 받기"
            description="새로운 강의와 특별 할인 소식을 가장 먼저 받아보세요"
            variant="inline"
            benefits={[
              {
                icon: <Mail className="h-4 w-4" />,
                title: "새 강의 알림",
                description: "최신 강의를 가장 먼저 만나보세요"
              },
              {
                icon: <Gift className="h-4 w-4" />,
                title: "독점 할인",
                description: "구독자 전용 특별 할인 혜택"
              },
              {
                icon: <CheckCircle className="h-4 w-4" />,
                title: "무료 자료",
                description: "프리미엄 학습 자료 무료 다운로드"
              }
            ]}
            showPreferences={true}
            onSubscribe={async (email) => console.log('뉴스레터 구독:', email)}
          />
        </Container>
      </Section>
    </div>
  )
}
