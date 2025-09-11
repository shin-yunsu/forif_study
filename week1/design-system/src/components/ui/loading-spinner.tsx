import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  overlay?: boolean
}

const spinnerSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6", 
  lg: "w-8 h-8",
  xl: "w-12 h-12"
}

const LoadingSpinner = ({ size = "md", className, overlay = false }: LoadingSpinnerProps) => {
  const spinner = (
    <Loader2 
      className={cn(
        "animate-spin",
        spinnerSizes[size],
        className
      )}
    />
  )

  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

interface SkeletonProps extends React.ComponentProps<"div"> {
  className?: string
}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

const SkeletonText = ({ lines = 3, className }: { lines?: number; className?: string }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full"
          )} 
        />
      ))}
    </div>
  )
}

const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-32 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

export { 
  LoadingSpinner, 
  Skeleton, 
  SkeletonText, 
  SkeletonCard,
  type LoadingSpinnerProps,
  type SkeletonProps 
}