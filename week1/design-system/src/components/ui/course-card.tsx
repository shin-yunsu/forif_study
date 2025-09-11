import * as React from "react"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "./card"
import { Badge } from "./badge"
import { Button } from "./button"
import { GlowingEffect } from "./glowing-effect"

interface CourseCardProps extends React.ComponentProps<typeof Card> {
  title: string
  instructor: string
  thumbnail?: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  level?: "beginner" | "intermediate" | "advanced"
  category?: string
  isFavorite?: boolean
  onFavoriteToggle?: () => void
  onAddToCart?: () => void
}

const CourseCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  CourseCardProps
>(({
  className,
  title,
  instructor,
  thumbnail,
  price,
  originalPrice,
  rating,
  reviewCount,
  level,
  category,
  isFavorite = false,
  onFavoriteToggle,
  onAddToCart,
  ...props
}, ref) => {
  return (
    <div className="relative">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
        movementDuration={1.5}
      />
      <Card ref={ref} className={cn("overflow-hidden group hover:shadow-lg transition-shadow p-0", className)} {...props}>
        <div className="relative aspect-video overflow-hidden rounded-t-xl">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No Image</span>
          </div>
        )}
        
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 w-8 h-8 p-0 bg-background/80 hover:bg-background"
          onClick={onFavoriteToggle}
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-current text-destructive")} />
        </Button>
      </div>
      
      <CardContent className="p-4 pt-4">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{instructor}</p>
        
        {/* 태그들 */}
        <div className="flex items-center gap-2 mb-2">
          {level && (
            <Badge 
              variant={level === "beginner" ? "secondary" : level === "intermediate" ? "default" : "destructive"}
              className="text-xs"
            >
              {level === "beginner" ? "초급" : level === "intermediate" ? "중급" : "고급"}
            </Badge>
          )}
          {category && (
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          )}
        </div>
        
        {/* 별점 */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">({reviewCount.toLocaleString()})</span>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 pb-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">₩{price.toLocaleString()}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                ₩{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <Button size="sm" onClick={onAddToCart}>
            <ShoppingCart className="w-4 h-4 mr-1" />
            장바구니
          </Button>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
})

CourseCard.displayName = "CourseCard"

export { CourseCard, type CourseCardProps }