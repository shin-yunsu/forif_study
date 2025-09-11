'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface ReviewData {
  id: string
  name: string
  course: string
  rating: number
  review: string
  avatar?: string
}

const topRowReviews: ReviewData[] = [
  {
    id: '1',
    name: '김민수',
    course: 'React 마스터 클래스',
    rating: 5,
    review: '정말 체계적이고 실무에 바로 적용할 수 있는 내용들로 구성되어 있어서 너무 만족합니다!'
  },
  {
    id: '2',
    name: '박지은',
    course: 'TypeScript 완벽가이드',
    rating: 5,
    review: '복잡한 타입스크립트 개념들을 쉽게 설명해주셔서 이해하기 쉬웠어요.'
  },
  {
    id: '3',
    name: '이준호',
    course: 'Next.js 풀스택 개발',
    rating: 5,
    review: '프론트엔드부터 백엔드까지 전체적인 웹 개발 흐름을 완벽하게 배울 수 있었습니다.'
  },
  {
    id: '4',
    name: '최유진',
    course: 'Node.js 백엔드 개발',
    rating: 5,
    review: '실습 위주의 수업이어서 직접 서버를 만들어보면서 배울 수 있어서 좋았어요.'
  },
  {
    id: '5',
    name: '정현우',
    course: 'JavaScript 심화과정',
    rating: 5,
    review: '자바스크립트의 동작 원리부터 고급 기법까지 모든 것을 배울 수 있었습니다.'
  },
  {
    id: '6',
    name: '한소영',
    course: 'React Native 앱 개발',
    rating: 5,
    review: '모바일 앱 개발이 이렇게 재미있는 줄 몰랐어요. 선생님 설명이 정말 명쾌해요!'
  },
  {
    id: '7',
    name: '송민철',
    course: 'Vue.js 완벽 마스터',
    rating: 5,
    review: 'Vue의 모든 기능을 체계적으로 배울 수 있어서 실무에서 자신감이 생겼습니다.'
  },
  {
    id: '8',
    name: '김나영',
    course: 'GraphQL API 개발',
    rating: 5,
    review: '복잡한 API 설계가 이렇게 간단해질 수 있다니! 정말 유용한 강의였어요.'
  },
  {
    id: '9',
    name: '조성훈',
    course: '웹 성능 최적화',
    rating: 5,
    review: '웹사이트 속도를 크게 개선할 수 있는 실전 기법들을 배웠습니다.'
  },
  {
    id: '10',
    name: '윤혜진',
    course: 'AWS 클라우드 배포',
    rating: 5,
    review: '클라우드 배포가 이렇게 체계적으로 배울 수 있어서 정말 감사합니다!'
  }
]

const bottomRowReviews: ReviewData[] = [
  {
    id: '11',
    name: '장세훈',
    course: 'Docker & Kubernetes',
    rating: 5,
    review: '컨테이너 기술을 처음부터 차근차근 배울 수 있어서 좋았어요.'
  },
  {
    id: '12',
    name: '임다은',
    course: 'MongoDB 데이터베이스',
    rating: 5,
    review: 'NoSQL 데이터베이스의 모든 것을 배울 수 있는 최고의 강의입니다!'
  },
  {
    id: '13',
    name: '강민재',
    course: 'Python 백엔드 개발',
    rating: 5,
    review: 'FastAPI부터 Django까지 파이썬 백엔드의 모든 것을 배웠습니다.'
  },
  {
    id: '14',
    name: '서지혜',
    course: '웹 보안 및 해킹 방어',
    rating: 5,
    review: '웹 보안의 중요성을 깨닫고 실전 방어 기법을 배울 수 있었어요.'
  },
  {
    id: '15',
    name: '홍준표',
    course: 'Redis & 캐싱 전략',
    rating: 5,
    review: '성능 향상을 위한 캐싱 전략을 실습을 통해 완벽하게 이해했습니다.'
  },
  {
    id: '16',
    name: '오수빈',
    course: 'Git & GitHub 협업',
    rating: 5,
    review: '팀 개발에 필수인 Git 활용법을 체계적으로 배울 수 있었어요.'
  },
  {
    id: '17',
    name: '신동혁',
    course: 'Svelte & SvelteKit',
    rating: 5,
    review: '새로운 프론트엔드 프레임워크를 배우는 재미가 쏠쏠했습니다!'
  },
  {
    id: '18',
    name: '문지원',
    course: 'Flutter 앱 개발',
    rating: 5,
    review: '크로스 플랫폼 앱 개발의 매력을 느낄 수 있는 훌륭한 강의였어요.'
  },
  {
    id: '19',
    name: '백현수',
    course: 'Rust 시스템 프로그래밍',
    rating: 5,
    review: '어려운 Rust를 이해하기 쉽게 설명해주셔서 정말 감사합니다.'
  },
  {
    id: '20',
    name: '유채영',
    course: 'ElasticSearch 검색엔진',
    rating: 5,
    review: '복잡한 검색 시스템을 구축하는 방법을 실습을 통해 배웠습니다!'
  }
]

interface MarqueeRowProps {
  reviews: ReviewData[]
  direction: 'left' | 'right'
  speed?: number
}

function MarqueeRow({ reviews, direction, speed = 50 }: MarqueeRowProps) {
  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === 'left' ? [0, -100 * reviews.length] : [0, 100 * reviews.length]
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity
        }}
        style={{
          width: `${200 * reviews.length}%`
        }}
      >
        {[...reviews, ...reviews].map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} review={review} />
        ))}
      </motion.div>
    </div>
  )
}

interface ReviewCardProps {
  review: ReviewData
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="flex-shrink-0 w-80 p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {review.name.charAt(0)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {review.name}
            </h4>
            <div className="flex items-center space-x-1">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-xs text-blue-600 font-medium mb-3 truncate">
            {review.course}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
            {review.review}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default function StudentReviewsMarquee() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            수강생들의 생생한 후기
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            실제 수강생들이 남긴 진솔한 후기를 확인해보세요
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Top row - scrolling left */}
          <MarqueeRow reviews={topRowReviews} direction="left" speed={60} />
          
          {/* Bottom row - scrolling right */}
          <MarqueeRow reviews={bottomRowReviews} direction="right" speed={55} />
        </div>
      </div>
    </section>
  )
}