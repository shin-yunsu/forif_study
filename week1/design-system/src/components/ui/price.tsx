import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const priceVariants = cva(
  "font-semibold",
  {
    variants: {
      size: {
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl"
      },
      color: {
        default: "text-foreground",
        primary: "text-primary",
        success: "text-green-600",
        destructive: "text-destructive"
      }
    },
    defaultVariants: {
      size: "base",
      color: "default"
    }
  }
)

interface PriceProps extends React.ComponentProps<"span">, VariantProps<typeof priceVariants> {
  amount: number
  currency?: string
  originalAmount?: number
  locale?: string
  showDiscount?: boolean
}

const formatPrice = (amount: number, currency: string = "KRW", locale: string = "ko-KR") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const Price = React.forwardRef<HTMLSpanElement, PriceProps>(
  ({ 
    className, 
    size, 
    color, 
    amount, 
    originalAmount, 
    currency = "KRW", 
    locale = "ko-KR",
    showDiscount = true,
    ...props 
  }, ref) => {
    const hasDiscount = originalAmount && originalAmount > amount
    const discountPercentage = hasDiscount ? Math.round((1 - amount / originalAmount) * 100) : 0

    return (
      <span className="inline-flex items-center gap-2">
        <span 
          ref={ref}
          className={cn(priceVariants({ size, color }), className)}
          {...props}
        >
          {formatPrice(amount, currency, locale)}
        </span>
        
        {hasDiscount && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalAmount, currency, locale)}
            </span>
            {showDiscount && (
              <span className="text-sm font-medium text-destructive bg-destructive/10 px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
          </div>
        )}
      </span>
    )
  }
)

Price.displayName = "Price"

export { Price, type PriceProps }