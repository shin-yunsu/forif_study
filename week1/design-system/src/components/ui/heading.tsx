import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva(
  "font-semibold tracking-tight",
  {
    variants: {
      size: {
        h1: "text-4xl md:text-5xl lg:text-6xl",
        h2: "text-3xl md:text-4xl lg:text-5xl",
        h3: "text-2xl md:text-3xl lg:text-4xl",
        h4: "text-xl md:text-2xl lg:text-3xl",
        h5: "text-lg md:text-xl lg:text-2xl",
        h6: "text-base md:text-lg lg:text-xl"
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold"
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        destructive: "text-destructive"
      }
    },
    defaultVariants: {
      size: "h1",
      weight: "semibold",
      color: "default"
    }
  }
)

interface HeadingProps extends React.ComponentProps<"h1">, VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, weight, color, as, ...props }, ref) => {
    const Component = as || (size === "h1" ? "h1" : size === "h2" ? "h2" : size === "h3" ? "h3" : size === "h4" ? "h4" : size === "h5" ? "h5" : "h6")
    
    return React.createElement(
      Component,
      {
        ref,
        className: cn(headingVariants({ size, weight, color }), className),
        ...props
      }
    )
  }
)

Heading.displayName = "Heading"

export { Heading, type HeadingProps }