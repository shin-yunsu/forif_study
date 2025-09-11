"use client"

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Rating } from '@/components/ui/rating'
import { Quote, Star } from 'lucide-react'

const testimonialsVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "space-y-8",
        grid: "grid gap-6",
        carousel: "relative overflow-hidden",
      },
      columns: {
        1: "grid-cols-1",
        2: "md:grid-cols-2",
        3: "md:grid-cols-2 lg:grid-cols-3",
        4: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      },
    },
    defaultVariants: {
      variant: "grid",
      columns: 3,
    },
  }
)

const testimonialCardVariants = cva(
  "relative h-full transition-all duration-200 hover:scale-[1.02]",
  {
    variants: {
      style: {
        default: "bg-card border rounded-lg p-6",
        minimal: "bg-transparent border-none p-4",
        featured: "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 rounded-lg p-6",
        quote: "relative bg-card border rounded-lg p-6 before:content-[''] before:absolute before:top-0 before:left-6 before:w-8 before:h-1 before:bg-primary before:rounded-b-full",
      },
    },
    defaultVariants: {
      style: "default",
    },
  }
)

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

interface TestimonialsProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof testimonialsVariants> {
  testimonials: Testimonial[]
  title?: string
  description?: string
  showRatings?: boolean
  cardStyle?: "default" | "minimal" | "featured" | "quote"
  autoplay?: boolean
  interval?: number
}

const TestimonialCard: React.FC<{
  testimonial: Testimonial
  style: "default" | "minimal" | "featured" | "quote"
  showRating: boolean
}> = ({ testimonial, style, showRating }) => {
  return (
    <Card className={cn(testimonialCardVariants({ style }))}>
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
          "text-muted-foreground leading-relaxed",
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
            {testimonial.tags.map((tag, index) => (
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

const Testimonials = React.forwardRef<HTMLDivElement, TestimonialsProps>(
  ({
    className,
    variant,
    columns,
    testimonials,
    title,
    description,
    showRatings = true,
    cardStyle = "default",
    autoplay = false,
    interval = 5000,
    ...props
  }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)

    React.useEffect(() => {
      if (autoplay && variant === "carousel" && testimonials.length > 1) {
        const timer = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }, interval)
        return () => clearInterval(timer)
      }
    }, [autoplay, variant, testimonials.length, interval])

    if (variant === "carousel") {
      return (
        <div ref={ref} className={cn("w-full space-y-6", className)} {...props}>
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

          <div className="relative overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard
                    testimonial={testimonial}
                    style={cardStyle}
                    showRating={showRatings}
                  />
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-200",
                    index === currentIndex 
                      ? "bg-primary" 
                      : "bg-primary/20 hover:bg-primary/40"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )
    }

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

        <div className={cn(testimonialsVariants({ variant, columns }))}>
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              style={cardStyle}
              showRating={showRatings}
            />
          ))}
        </div>
      </div>
    )
  }
)

Testimonials.displayName = "Testimonials"

export { Testimonials, testimonialsVariants }
export type { Testimonial, TestimonialsProps }