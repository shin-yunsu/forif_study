import * as React from "react"
import NextLink from "next/link"
import { ExternalLink } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const linkVariants = cva(
  "inline-flex items-center gap-1 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80",
        muted: "text-muted-foreground hover:text-foreground",
        destructive: "text-destructive hover:text-destructive/80"
      },
      size: {
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "base"
    }
  }
)

interface LinkProps extends React.ComponentProps<typeof NextLink>, VariantProps<typeof linkVariants> {
  external?: boolean
  showExternalIcon?: boolean
}

const Link = React.forwardRef<React.ElementRef<typeof NextLink>, LinkProps>(
  ({ className, variant, size, external = false, showExternalIcon = true, children, href, ...props }, ref) => {
    const isExternal = external || (typeof href === "string" && (href.startsWith("http") || href.startsWith("mailto:")))
    
    if (isExternal) {
      return (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href as string}
          className={cn(linkVariants({ variant, size }), className)}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
          {showExternalIcon && <ExternalLink className="w-3 h-3 ml-1" />}
        </a>
      )
    }

    return (
      <NextLink
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = "Link"

export { Link, type LinkProps }