"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Rating } from '@/components/ui/rating'
import { Quote, Star } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role?: string
  company?: string
  avatar?: string
  content: string
  rating?: number
  featured?: boolean
  tags?: string[]
}

interface TestimonialMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
  title?: string
  description?: string
  showRatings?: boolean
  cardStyle?: "default" | "minimal" | "featured" | "quote"
  speed?: number
}

const TestimonialCard: React.FC<{
  testimonial: Testimonial
  style: "default" | "minimal" | "featured" | "quote"
  showRating: boolean
}> = ({ testimonial, style, showRating }) => {
  const cardVariants = {
    default: "bg-card border rounded-lg p-6",
    minimal: "bg-transparent border-none p-4",
    featured: "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 rounded-lg p-6",
    quote: "relative bg-card border rounded-lg p-6 before:content-[''] before:absolute before:top-0 before:left-6 before:w-8 before:h-1 before:bg-primary before:rounded-b-full",
  }

  return (
    <Card className={cn("relative h-full transition-all duration-200 hover:scale-[1.02] w-80 flex-shrink-0 mx-3", cardVariants[style])}>
      <CardContent className="p-0 space-y-4">
        {/* Quote Icon for quote style */}
        {style === "quote" && (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Quote className="h-4 w-4 text-primary" />
            </div>
          </div>
        )}

        {/* Rating */}
        {showRating && testimonial.rating && (
          <div className="flex justify-center">
            <Rating rating={testimonial.rating} readonly size="sm" />
          </div>
        )}

        {/* Content */}
        <blockquote className={cn(
          "text-muted-foreground leading-relaxed text-sm",
          style === "featured" && "text-foreground",
          style === "quote" && "text-center italic"
        )}>
          "{testimonial.content}"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center space-x-3 pt-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="font-semibold text-foreground">
              {testimonial.name}
              {testimonial.featured && (
                <Star className="inline h-3 w-3 ml-1 text-primary fill-current" />
              )}
            </div>
            {testimonial.role && (
              <div className="text-sm text-muted-foreground">
                {testimonial.role}
                {testimonial.company && ` at ${testimonial.company}`}
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {testimonial.tags && testimonial.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {testimonial.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const MarqueeRow: React.FC<{
  testimonials: Testimonial[]
  direction: 'left' | 'right'
  speed: number
  cardStyle: "default" | "minimal" | "featured" | "quote"
  showRatings: boolean
}> = ({ testimonials, direction, speed, cardStyle, showRatings }) => {
  return (
    <div className="flex overflow-hidden py-4">
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{
          width: `${testimonials.length * 352}px`, // 320px card + 32px margin
        }}
      >
        {/* First set of testimonials */}
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={`first-${testimonial.id}`}
            testimonial={testimonial}
            style={cardStyle}
            showRating={showRatings}
          />
        ))}
        {/* Duplicate set for seamless loop */}
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={`second-${testimonial.id}`}
            testimonial={testimonial}
            style={cardStyle}
            showRating={showRatings}
          />
        ))}
      </motion.div>
    </div>
  )
}

const TestimonialsMarquee = React.forwardRef<HTMLDivElement, TestimonialMarqueeProps>(
  ({
    className,
    testimonials,
    title,
    description,
    showRatings = true,
    cardStyle = "default",
    speed = 50,
    ...props
  }, ref) => {
    // Split testimonials into two groups
    const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2))
    const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2))

    return (
      <div ref={ref} className={cn("w-full space-y-8", className)} {...props}>
        {title && (
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="space-y-4">
          {/* First row - scrolling left */}
          <MarqueeRow
            testimonials={firstRow}
            direction="left"
            speed={speed}
            cardStyle={cardStyle}
            showRatings={showRatings}
          />
          
          {/* Second row - scrolling right */}
          <MarqueeRow
            testimonials={secondRow}
            direction="right"
            speed={speed}
            cardStyle={cardStyle}
            showRatings={showRatings}
          />
        </div>
      </div>
    )
  }
)

TestimonialsMarquee.displayName = "TestimonialsMarquee"

export { TestimonialsMarquee }
export type { TestimonialMarqueeProps, Testimonial }