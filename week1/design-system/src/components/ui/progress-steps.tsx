"use client"

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Check, ChevronRight, Circle, ShoppingCart, CreditCard, CheckCircle, Truck } from 'lucide-react'

const progressStepsVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "space-y-4",
        horizontal: "flex items-center justify-between",
        breadcrumb: "flex items-center space-x-2",
        timeline: "space-y-6",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "horizontal",
      size: "md",
    },
  }
)

const stepItemVariants = cva(
  "transition-all duration-300",
  {
    variants: {
      state: {
        completed: "opacity-100",
        current: "opacity-100",
        pending: "opacity-60",
      },
      variant: {
        default: "flex items-center gap-3 p-4 rounded-lg border",
        horizontal: "flex flex-col items-center text-center min-w-0 flex-1",
        breadcrumb: "flex items-center",
        timeline: "flex items-start gap-4 p-4",
      },
    },
    defaultVariants: {
      state: "pending",
      variant: "horizontal",
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

interface ProgressStep {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  completedAt?: Date
  estimatedTime?: string
}

interface ProgressStepsProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressStepsVariants> {
  steps: ProgressStep[]
  currentStep: number
  completedSteps?: number[]
  showConnectors?: boolean
  showEstimatedTime?: boolean
  onStepClick?: (stepIndex: number) => void
  clickableSteps?: boolean
}

const defaultIcons = {
  cart: <ShoppingCart className="h-4 w-4" />,
  payment: <CreditCard className="h-4 w-4" />,
  confirmation: <CheckCircle className="h-4 w-4" />,
  shipping: <Truck className="h-4 w-4" />,
}

const StepIcon: React.FC<{
  step: ProgressStep
  stepIndex: number
  currentStep: number
  completedSteps: number[]
  variant: "default" | "horizontal" | "breadcrumb" | "timeline"
}> = ({ step, stepIndex, currentStep, completedSteps, variant }) => {
  const isCompleted = completedSteps.includes(stepIndex)
  const isCurrent = currentStep === stepIndex
  const iconSize = variant === "breadcrumb" ? "h-4 w-4" : "h-5 w-5"
  
  if (isCompleted) {
    return (
      <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
        <Check className={iconSize} />
      </div>
    )
  }
  
  if (isCurrent) {
    return (
      <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
        {step.icon || <Circle className={cn(iconSize, "fill-current")} />}
      </div>
    )
  }
  
  return (
    <div className="flex-shrink-0 w-10 h-10 bg-muted border-2 border-muted-foreground/20 text-muted-foreground rounded-full flex items-center justify-center">
      {step.icon || <Circle className={iconSize} />}
    </div>
  )
}

const ProgressSteps = React.forwardRef<HTMLDivElement, ProgressStepsProps>(
  ({
    className,
    variant,
    size,
    steps,
    currentStep,
    completedSteps = [],
    showConnectors = true,
    showEstimatedTime = false,
    onStepClick,
    clickableSteps = false,
    ...props
  }, ref) => {
    const handleStepClick = (stepIndex: number) => {
      if (clickableSteps && onStepClick) {
        onStepClick(stepIndex)
      }
    }

    if (variant === "breadcrumb") {
      return (
        <div ref={ref} className={cn(progressStepsVariants({ variant, size }), className)} {...props}>
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index)
            const isCurrent = currentStep === index
            
            return (
              <React.Fragment key={step.id}>
                <div
                  className={cn(
                    "flex items-center gap-2",
                    clickableSteps && "cursor-pointer hover:opacity-80",
                    isCompleted && "text-green-600 dark:text-green-400",
                    isCurrent && "text-primary font-medium",
                    !isCompleted && !isCurrent && "text-muted-foreground"
                  )}
                  onClick={() => handleStepClick(index)}
                >
                  <StepIcon 
                    step={step}
                    stepIndex={index} 
                    currentStep={currentStep} 
                    completedSteps={completedSteps}
                    variant={variant}
                  />
                  <span className={cn(
                    size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"
                  )}>
                    {step.title}
                  </span>
                </div>
                
                {showConnectors && index < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
                )}
              </React.Fragment>
            )
          })}
        </div>
      )
    }

    if (variant === "horizontal") {
      return (
        <div ref={ref} className={cn("w-full space-y-4", className)} {...props}>
          <div className="flex items-start justify-between relative">
            {/* Connector Line */}
            {showConnectors && (
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ 
                    width: `${(Math.max(0, Math.min(currentStep, completedSteps.length)) / Math.max(1, steps.length - 1)) * 100}%` 
                  }}
                />
              </div>
            )}
            
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
                    step={step}
                    stepIndex={index} 
                    currentStep={currentStep} 
                    completedSteps={completedSteps}
                    variant={variant}
                  />
                  
                  <div className="mt-2 min-w-0">
                    <div className={cn(
                      "font-medium text-center",
                      size === "sm" ? "text-sm" : size === "lg" ? "text-base" : "text-sm"
                    )}>
                      {step.title}
                    </div>
                    {step.description && (
                      <div className={cn(
                        "text-muted-foreground mt-1 text-center line-clamp-2",
                        size === "sm" ? "text-xs" : "text-sm"
                      )}>
                        {step.description}
                      </div>
                    )}
                    {showEstimatedTime && step.estimatedTime && !isCompleted && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {step.estimatedTime}
                      </Badge>
                    )}
                    {isCompleted && step.completedAt && (
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Completed {step.completedAt.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    if (variant === "timeline") {
      return (
        <div ref={ref} className={cn(progressStepsVariants({ variant, size }), className)} {...props}>
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index)
            const isCurrent = currentStep === index
            const state = isCompleted ? "completed" : isCurrent ? "current" : "pending"
            
            return (
              <div key={step.id} className="relative">
                {/* Connector Line */}
                {showConnectors && index < steps.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-muted -translate-x-0.5" />
                )}
                
                <div
                  className={cn(
                    stepItemVariants({ state, variant }),
                    clickableSteps && "cursor-pointer hover:opacity-80"
                  )}
                  onClick={() => handleStepClick(index)}
                >
                  <StepIcon 
                    step={step}
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
                      {showEstimatedTime && step.estimatedTime && !isCompleted && (
                        <Badge variant="outline" className="text-xs">
                          {step.estimatedTime}
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
                    {isCompleted && step.completedAt && (
                      <div className="text-xs text-green-600 dark:text-green-400 mt-2">
                        Completed on {step.completedAt.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    // Default variant
    return (
      <div ref={ref} className={cn(progressStepsVariants({ variant, size }), className)} {...props}>
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
                step={step}
                stepIndex={index} 
                currentStep={currentStep} 
                completedSteps={completedSteps}
                variant={variant}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className={cn(
                    "font-medium",
                    size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"
                  )}>
                    {step.title}
                  </h3>
                  {showEstimatedTime && step.estimatedTime && !isCompleted && (
                    <Badge variant="outline" className="text-xs">
                      {step.estimatedTime}
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
                {isCompleted && step.completedAt && (
                  <div className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Completed on {step.completedAt.toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)

ProgressSteps.displayName = "ProgressSteps"

export { ProgressSteps, progressStepsVariants }
export type { ProgressStep, ProgressStepsProps }