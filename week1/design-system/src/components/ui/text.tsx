import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textVariants = cva(
  "text-foreground",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl"
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold"
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        destructive: "text-destructive",
        success: "text-green-600",
        warning: "text-yellow-600"
      },
      leading: {
        tight: "leading-tight",
        normal: "leading-normal",
        relaxed: "leading-relaxed",
        loose: "leading-loose"
      }
    },
    defaultVariants: {
      size: "base",
      weight: "normal",
      color: "default",
      leading: "normal"
    }
  }
)

interface TextProps extends React.ComponentProps<"p">, VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "strong" | "em" | "small"
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, color, leading, as = "p", ...props }, ref) => {
    return React.createElement(
      as,
      {
        ref,
        className: cn(textVariants({ size, weight, color, leading }), className),
        ...props
      }
    )
  }
)

Text.displayName = "Text"

export { Text, type TextProps }