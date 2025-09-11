"use client"

import * as React from "react"
import NextImage, { ImageProps as NextImageProps } from "next/image"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const imageVariants = cva(
  "object-cover transition-opacity duration-300",
  {
    variants: {
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      objectFit: {
        cover: "object-cover",
        contain: "object-contain",
        fill: "object-fill",
        none: "object-none",
        "scale-down": "object-scale-down",
      },
    },
    defaultVariants: {
      rounded: "md",
      objectFit: "cover",
    },
  }
)

interface ImageProps
  extends Omit<NextImageProps, "className">,
    VariantProps<typeof imageVariants> {
  className?: string
  fallbackSrc?: string
  onError?: () => void
  loading?: "lazy" | "eager"
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ 
    className,
    rounded,
    objectFit,
    src,
    alt,
    fallbackSrc = "/placeholder.png",
    onError,
    loading = "lazy",
    ...props
  }, ref) => {
    const [imgSrc, setImgSrc] = React.useState(src)
    const [isLoaded, setIsLoaded] = React.useState(false)

    const handleError = () => {
      if (fallbackSrc && imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc)
      }
      onError?.()
    }

    const handleLoad = () => {
      setIsLoaded(true)
    }

    React.useEffect(() => {
      setImgSrc(src)
      setIsLoaded(false)
    }, [src])

    return (
      <div className="relative overflow-hidden">
        <NextImage
          ref={ref}
          className={cn(
            imageVariants({ rounded, objectFit }),
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          src={imgSrc}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          loading={loading}
          {...props}
        />
        {!isLoaded && (
          <div className={cn(
            "absolute inset-0 bg-muted animate-pulse flex items-center justify-center",
            imageVariants({ rounded })
          )}>
            <div className="text-muted-foreground text-sm">Loading...</div>
          </div>
        )}
      </div>
    )
  }
)

Image.displayName = "Image"

export { Image, type ImageProps }