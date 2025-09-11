import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.ComponentProps<"section"> {
  variant?: "default" | "muted" | "accent"
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  fullWidth?: boolean
}

const sectionVariants = {
  default: "bg-background",
  muted: "bg-muted/50",
  accent: "bg-accent/5"
}

const sectionPadding = {
  none: "py-0",
  sm: "py-8",
  md: "py-12",
  lg: "py-16", 
  xl: "py-24"
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", padding = "lg", fullWidth = false, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          sectionVariants[variant],
          sectionPadding[padding],
          !fullWidth && "relative",
          className
        )}
        {...props}
      />
    )
  }
)

Section.displayName = "Section"

export { Section, type SectionProps }