"use client"

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Check, Circle, ChevronRight } from 'lucide-react'

const stepProgressVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "space-y-4",
        horizontal: "flex items-center justify-between",
        compact: "space-y-2",
        numbered: "space-y-4",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const stepItemVariants = cva(
  "transition-all duration-200",
  {
    variants: {
      state: {
        completed: "opacity-100",
        current: "opacity-100",
        pending: "opacity-60",
      },
      variant: {
        default: "flex items-center gap-3 p-3 rounded-lg border",
        horizontal: "flex flex-col items-center text-center min-w-0 flex-1",
        compact: "flex items-center gap-2 py-2",
        numbered: "flex items-start gap-3 p-3 rounded-lg",
      },
    },
    defaultVariants: {
      state: "pending",
      variant: "default",
    },
    compoundVariants: [
      {
        state: "completed",
        variant: "default",
        className: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20",
      },
      {
        state: "current",
        variant: "default",
        className: "border-primary bg-primary/5 dark:bg-primary/10",
      },
      {
        state: "pending",
        variant: "default",
        className: "border-border bg-muted/30",
      },
    ],
  }
)

interface Step {
  id: string
  title: string
  description?: string
  optional?: boolean
}

interface StepProgressProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>,
    VariantProps<typeof stepProgressVariants> {
  steps: Step[]
  currentStep: number
  completedSteps?: number[]
  showProgressBar?: boolean
  onStepClick?: (stepIndex: number) => void
  clickableSteps?: boolean
}

const StepIcon: React.FC<{
  stepIndex: number
  currentStep: number
  completedSteps: number[]
  variant: "default" | "horizontal" | "compact" | "numbered"
}> = ({ stepIndex, currentStep, completedSteps, variant }) => {
  const isCompleted = completedSteps.includes(stepIndex)
  const isCurrent = currentStep === stepIndex
  const isPending = stepIndex > currentStep && !isCompleted

  const iconSize = variant === "compact" ? "h-4 w-4" : "h-5 w-5"
  
  if (isCompleted) {
    return (
      <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
        <Check className={iconSize} />
      </div>
    )
  }
  
  if (isCurrent) {
    return (
      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
        {variant === "numbered" ? stepIndex + 1 : <Circle className={cn(iconSize, "fill-current")} />}
      </div>
    )
  }
  
  return (
    <div className="flex-shrink-0 w-8 h-8 bg-muted border-2 border-muted-foreground/20 text-muted-foreground rounded-full flex items-center justify-center font-medium text-sm">
      {variant === "numbered" ? stepIndex + 1 : <Circle className={iconSize} />}
    </div>
  )
}

const StepProgress = React.forwardRef<HTMLDivElement, StepProgressProps>(
  ({
    className,
    variant,
    size,
    steps,
    currentStep,
    completedSteps = [],
    showProgressBar = true,
    onStepClick,
    clickableSteps = false,
    ...props
  }, ref) => {
    // clickableSteps prop을 props에서 제거하여 DOM에 전달되지 않도록 함
    const { clickableSteps: _, ...domProps } = props as any;
    const progress = React.useMemo(() => {
      const totalSteps = steps.length
      const completedCount = completedSteps.length + (currentStep > completedSteps.length ? 1 : 0)
      return (completedCount / totalSteps) * 100
    }, [steps.length, currentStep, completedSteps.length])

    const handleStepClick = (stepIndex: number) => {
      if (clickableSteps && onStepClick) {
        onStepClick(stepIndex)
      }
    }

    if (variant === "horizontal") {
      return (
        <div ref={ref} className={cn("w-full space-y-4", className)} {...domProps}>
          {/* Progress Bar */}
          {showProgressBar && (
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          
          {/* Steps */}
          <div className="flex items-start justify-between relative">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index)
              const isCurrent = currentStep === index
              const state = isCompleted ? "completed" : isCurrent ? "current" : "pending"
              
              return (
                <React.Fragment key={step.id}>
                  <div
                    className={cn(
                      stepItemVariants({ state, variant }),
                      clickableSteps && "cursor-pointer hover:opacity-80"
                    )}
                    onClick={() => handleStepClick(index)}
                  >
                    <StepIcon 
                      stepIndex={index} 
                      currentStep={currentStep} 
                      completedSteps={completedSteps}
                      variant={variant}
                    />
                    <div className="mt-2 min-w-0">
                      <div className={cn(
                        "font-medium truncate",
                        size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
                      )}>
                        {step.title}
                        {step.optional && (
                          <Badge variant="outline" className="ml-1 text-xs">
                            Optional
                          </Badge>
                        )}
                      </div>
                      {step.description && (
                        <div className={cn(
                          "text-muted-foreground mt-1 line-clamp-2",
                          size === "sm" ? "text-xs" : "text-sm"
                        )}>
                          {step.description}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 flex items-center justify-center px-2">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn(stepProgressVariants({ variant, size }), className)} {...domProps}>
        {/* Progress Bar */}
        {showProgressBar && variant !== "compact" && (
          <div className="w-full bg-muted rounded-full h-2 mb-6">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        {/* Steps List */}
        <div className={cn(stepProgressVariants({ variant }))}>
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index)
            const isCurrent = currentStep === index
            const state = isCompleted ? "completed" : isCurrent ? "current" : "pending"
            
            return (
              <div
                key={step.id}
                className={cn(
                  stepItemVariants({ state, variant }),
                  clickableSteps && "cursor-pointer hover:opacity-80"
                )}
                onClick={() => handleStepClick(index)}
              >
                <StepIcon 
                  stepIndex={index} 
                  currentStep={currentStep} 
                  completedSteps={completedSteps}
                  variant={variant}
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={cn(
                      "font-medium",
                      size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"
                    )}>
                      {step.title}
                    </h3>
                    {step.optional && (
                      <Badge variant="outline" className="text-xs">
                        Optional
                      </Badge>
                    )}
                  </div>
                  {step.description && (
                    <p className={cn(
                      "text-muted-foreground mt-1",
                      size === "sm" ? "text-xs" : "text-sm"
                    )}>
                      {step.description}
                    </p>
                  )}
                </div>

                {/* Step Number for numbered variant */}
                {variant === "numbered" && (
                  <div className="text-xs text-muted-foreground">
                    {index + 1} / {steps.length}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Compact Progress Bar */}
        {showProgressBar && variant === "compact" && (
          <div className="w-full bg-muted rounded-full h-1 mt-4">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    )
  }
)

StepProgress.displayName = "StepProgress"

export { StepProgress, stepProgressVariants }
export type { Step, StepProgressProps }