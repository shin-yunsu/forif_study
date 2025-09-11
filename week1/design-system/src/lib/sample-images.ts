/**
 * 샘플 이미지 유틸리티 함수들
 */

// 사용 가능한 샘플 썸네일 이미지 목록
const COURSE_THUMBS = [
  '/course-thumbs/2.png',
  '/course-thumbs/3.png',
  '/course-thumbs/4.png',
  '/course-thumbs/5.png',
  '/course-thumbs/6.png',
  '/course-thumbs/7.png',
  '/course-thumbs/8.png',
  '/course-thumbs/9.png',
  '/course-thumbs/10.png',
  '/course-thumbs/11.png'
]

/**
 * 랜덤한 강의 썸네일 이미지를 반환합니다.
 */
export function getRandomCourseThumb(): string {
  const randomIndex = Math.floor(Math.random() * COURSE_THUMBS.length)
  return COURSE_THUMBS[randomIndex]
}

/**
 * 여러 개의 랜덤한 강의 썸네일 이미지를 반환합니다 (중복 제거).
 * @param count 반환할 이미지 개수
 */
export function getRandomCourseThumbs(count: number): string[] {
  const shuffled = [...COURSE_THUMBS].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, COURSE_THUMBS.length))
}

/**
 * 시드를 기반으로 일관된 랜덤 이미지를 반환합니다.
 * 같은 시드를 사용하면 항상 같은 이미지를 반환합니다.
 * @param seed 시드 문자열 또는 숫자
 */
export function getConsistentCourseThumb(seed: string | number): string {
  const seedString = typeof seed === 'string' ? seed : seed.toString()
  let hash = 0
  for (let i = 0; i < seedString.length; i++) {
    const char = seedString.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 32bit integer로 변환
  }
  const index = Math.abs(hash) % COURSE_THUMBS.length
  return COURSE_THUMBS[index]
}

/**
 * 기본 아바타 이미지들 (GitHub 아바타 사용)
 */
export const SAMPLE_AVATARS = [
  'https://github.com/shadcn.png',
  'https://github.com/vercel.png',
  'https://github.com/nextjs.png',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&face',
  'https://images.unsplash.com/photo-1494790108755-2616b667675?w=150&h=150&fit=crop&face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&face'
]

/**
 * 랜덤한 아바타 이미지를 반환합니다.
 */
export function getRandomAvatar(): string {
  const randomIndex = Math.floor(Math.random() * SAMPLE_AVATARS.length)
  return SAMPLE_AVATARS[randomIndex]
}

/**
 * 시드를 기반으로 일관된 아바타 이미지를 반환합니다.
 */
export function getConsistentAvatar(seed: string | number): string {
  const seedString = typeof seed === 'string' ? seed : seed.toString()
  let hash = 0
  for (let i = 0; i < seedString.length; i++) {
    const char = seedString.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const index = Math.abs(hash) % SAMPLE_AVATARS.length
  return SAMPLE_AVATARS[index]
}