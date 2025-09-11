"use client"

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Image } from '@/components/ui/image'

const authBackgroundVariants = cva(
  "relative min-h-screen flex items-center justify-center overflow-hidden",
  {
    variants: {
      variant: {
        gradient: "bg-gradient-to-br from-primary/10 via-background to-secondary/10",
        image: "bg-cover bg-center bg-no-repeat",
        pattern: "bg-background",
        minimal: "bg-background",
        hero: "bg-gradient-to-r from-primary to-primary/80",
      },
      overlay: {
        none: "",
        light: "before:absolute before:inset-0 before:bg-background/60 before:backdrop-blur-sm before:z-10",
        medium: "before:absolute before:inset-0 before:bg-background/80 before:backdrop-blur-sm before:z-10",
        dark: "before:absolute before:inset-0 before:bg-background/90 before:backdrop-blur-sm before:z-10",
        primary: "before:absolute before:inset-0 before:bg-primary/20 before:backdrop-blur-sm before:z-10",
      },
    },
    defaultVariants: {
      variant: "gradient",
      overlay: "none",
    },
  }
)

interface AuthBackgroundProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authBackgroundVariants> {
  backgroundImage?: string
  children: React.ReactNode
  showPattern?: boolean
  patternOpacity?: number
  decorative?: boolean
  showStats?: boolean
  stats?: Array<{ value: string; label: string }>
}

const AuthBackground = React.forwardRef<HTMLDivElement, AuthBackgroundProps>(
  ({
    className,
    variant,
    overlay,
    backgroundImage,
    children,
    showPattern = true,
    patternOpacity = 0.1,
    decorative,
    showStats,
    stats,
    style,
    ...props
  }, ref) => {
    const backgroundStyle = React.useMemo(() => {
      const baseStyle = { ...style }
      
      if (variant === "image" && backgroundImage) {
        baseStyle.backgroundImage = `url(${backgroundImage})`
      }
      
      return baseStyle
    }, [style, variant, backgroundImage])

    // DOM에 전달하면 안되는 props들을 제거
    const {
      decorative: _decorative,
      showStats: _showStats,
      stats: _stats,
      ...domProps
    } = props

    return (
      <div
        ref={ref}
        className={cn(authBackgroundVariants({ variant, overlay }), className)}
        style={backgroundStyle}
        {...domProps}
      >
        {/* Background Image Component (alternative to CSS background) */}
        {variant === "image" && backgroundImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Pattern Overlay */}
        {showPattern && variant !== "minimal" && (
          <div 
            className="absolute inset-0 z-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor ${patternOpacity * 100}%, transparent 0)`,
              backgroundSize: '24px 24px',
              opacity: patternOpacity,
            }}
          />
        )}

        {/* Decorative Elements */}
        {variant !== "minimal" && (
          <>
            {/* Top left gradient orb */}
            <div 
              className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '4s' }}
            />
            
            {/* Bottom right gradient orb */}
            <div 
              className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '6s', animationDelay: '2s' }}
            />
            
            {/* Additional decorative elements for gradient variant */}
            {variant === "gradient" && (
              <>
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-bounce" 
                     style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-bounce" 
                     style={{ animationDuration: '10s', animationDelay: '3s' }} />
              </>
            )}

            {/* Geometric shapes for pattern variant */}
            {variant === "pattern" && (
              <>
                <div className="absolute top-10 left-10 w-2 h-2 bg-primary/20 rotate-45 animate-spin" 
                     style={{ animationDuration: '20s' }} />
                <div className="absolute top-20 right-20 w-3 h-3 bg-secondary/20 rounded-full animate-ping" 
                     style={{ animationDuration: '3s' }} />
                <div className="absolute bottom-20 left-20 w-4 h-4 bg-accent/20 rotate-45" />
                <div className="absolute bottom-10 right-10 w-2 h-8 bg-primary/10 rounded-full" />
              </>
            )}
          </>
        )}

        {/* Content Container */}
        <div className="relative z-20 w-full mx-auto p-4 sm:p-6">
          {children}
        </div>

      </div>
    )
  }
)

AuthBackground.displayName = "AuthBackground"

export { AuthBackground, authBackgroundVariants }
export type { AuthBackgroundProps }