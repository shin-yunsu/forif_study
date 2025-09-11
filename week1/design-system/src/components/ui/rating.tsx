import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps extends React.ComponentProps<"div"> {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  reviewCount?: number
  readonly?: boolean
  onRatingChange?: (rating: number) => void
}

const starSizes = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5"
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({
    className,
    rating,
    maxRating = 5,
    size = "md",
    showValue = true,
    reviewCount,
    readonly = true,
    onRatingChange,
    ...props
  }, ref) => {
    const [hoverRating, setHoverRating] = React.useState<number | null>(null)
    
    const handleStarClick = (value: number) => {
      if (!readonly && onRatingChange) {
        onRatingChange(value)
      }
    }

    const handleStarHover = (value: number) => {
      if (!readonly) {
        setHoverRating(value)
      }
    }

    const handleMouseLeave = () => {
      if (!readonly) {
        setHoverRating(null)
      }
    }

    const displayRating = hoverRating ?? rating
    
    return (
      <div 
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="flex items-center gap-0.5">
          {Array.from({ length: maxRating }, (_, index) => {
            const starValue = index + 1
            const isFilled = starValue <= displayRating
            const isPartiallyFilled = starValue > displayRating && starValue - displayRating < 1
            
            return (
              <button
                key={index}
                type="button"
                className={cn(
                  "relative transition-colors",
                  !readonly && "hover:scale-110",
                  readonly && "cursor-default"
                )}
                onClick={() => handleStarClick(starValue)}
                onMouseEnter={() => handleStarHover(starValue)}
                disabled={readonly}
              >
                <Star 
                  className={cn(
                    starSizes[size],
                    isFilled 
                      ? "fill-primary text-primary" 
                      : "fill-transparent text-muted-foreground"
                  )}
                />
                {isPartiallyFilled && (
                  <Star
                    className={cn(
                      starSizes[size],
                      "absolute top-0 left-0 fill-primary text-primary"
                    )}
                    style={{
                      clipPath: `inset(0 ${100 - (displayRating - index) * 100}% 0 0)`
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
        
        {showValue && (
          <div className="flex items-center gap-1 text-sm">
            <span className="font-medium">{rating.toFixed(1)}</span>
            {reviewCount !== undefined && (
              <span className="text-muted-foreground">
                ({reviewCount.toLocaleString()})
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Rating.displayName = "Rating"

export { Rating, type RatingProps }