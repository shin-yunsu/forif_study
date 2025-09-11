"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import * as LucideIcons from "lucide-react"

const iconVariants = cva(
  "shrink-0",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4", 
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
        "2xl": "h-10 w-10",
      },
      color: {
        default: "text-current",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        destructive: "text-destructive",
        success: "text-green-600",
        warning: "text-yellow-600",
        info: "text-blue-600",
      }
    },
    defaultVariants: {
      size: "md",
      color: "default",
    },
  }
)

type LucideIconName = keyof typeof LucideIcons

interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "color">,
    VariantProps<typeof iconVariants> {
  name: LucideIconName
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size, color, name, ...props }, ref) => {
    const LucideIcon = LucideIcons[name] as React.ComponentType<React.SVGProps<SVGSVGElement>>
    
    if (!LucideIcon) {
      console.warn(`Icon "${name}" not found in lucide-react`)
      return null
    }

    return (
      <LucideIcon
        ref={ref}
        className={cn(iconVariants({ size, color }), className)}
        {...props}
      />
    )
  }
)

Icon.displayName = "Icon"

export { Icon, iconVariants, type IconProps, type LucideIconName }