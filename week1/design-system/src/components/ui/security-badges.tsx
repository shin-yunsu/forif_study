"use client"

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Shield, ShieldCheck, Lock, CreditCard, Award, Verified, Globe, Key } from 'lucide-react'

const securityBadgesVariants = cva(
  "flex flex-wrap gap-2 items-center",
  {
    variants: {
      variant: {
        default: "justify-start",
        center: "justify-center",
        end: "justify-end",
      },
      size: {
        sm: "gap-1",
        md: "gap-2",
        lg: "gap-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-default",
  {
    variants: {
      type: {
        ssl: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        pci: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
        encryption: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
        verified: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
        secure: "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400",
        certified: "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
        compliance: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
        payment: "bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-1",
        lg: "text-base px-3 py-1.5",
      },
    },
    defaultVariants: {
      type: "secure",
      size: "md",
    },
  }
)

interface SecurityBadge {
  type: 'ssl' | 'pci' | 'encryption' | 'verified' | 'secure' | 'certified' | 'compliance' | 'payment'
  label: string
  description?: string
  certificationBody?: string
  validUntil?: Date
  link?: string
}

interface SecurityBadgesProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof securityBadgesVariants> {
  badges?: SecurityBadge[]
  badgeSize?: "sm" | "md" | "lg"
  showTooltips?: boolean
  title?: string
  description?: string
}

const SecurityIcon: React.FC<{
  type: SecurityBadge['type']
  size?: "sm" | "md" | "lg"
}> = ({ type, size = "md" }) => {
  const iconSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"
  
  switch (type) {
    case 'ssl':
      return <Lock className={iconSize} />
    case 'pci':
      return <CreditCard className={iconSize} />
    case 'encryption':
      return <Key className={iconSize} />
    case 'verified':
      return <Verified className={iconSize} />
    case 'secure':
      return <Shield className={iconSize} />
    case 'certified':
      return <Award className={iconSize} />
    case 'compliance':
      return <ShieldCheck className={iconSize} />
    case 'payment':
      return <CreditCard className={iconSize} />
    default:
      return <Shield className={iconSize} />
  }
}

const defaultBadges: SecurityBadge[] = [
  {
    type: 'ssl',
    label: 'SSL Secured',
    description: '256-bit SSL encryption protects your data in transit',
    certificationBody: 'Let\'s Encrypt',
  },
  {
    type: 'pci',
    label: 'PCI DSS',
    description: 'Payment Card Industry Data Security Standard compliant',
    certificationBody: 'PCI Security Standards Council',
  },
  {
    type: 'encryption',
    label: 'AES-256',
    description: 'Advanced Encryption Standard with 256-bit keys',
  },
  {
    type: 'verified',
    label: 'Verified',
    description: 'Identity and security practices have been verified',
    certificationBody: 'Third-party verification',
  }
]

const SecurityBadges = React.forwardRef<HTMLDivElement, SecurityBadgesProps>(
  ({
    className,
    variant,
    size,
    badges = defaultBadges,
    badgeSize = "md",
    showTooltips = true,
    title = "Security & Compliance",
    description = "Your data is protected by industry-standard security measures",
    ...props
  }, ref) => {
    const BadgeComponent: React.FC<{ badge: SecurityBadge }> = ({ badge }) => {
      const badgeContent = (
        <div className={cn(badgeVariants({ type: badge.type, size: badgeSize }))}>
          <SecurityIcon type={badge.type} size={badgeSize} />
          <span>{badge.label}</span>
        </div>
      )

      if (showTooltips && badge.description) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {badge.link ? (
                  <a 
                    href={badge.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    {badgeContent}
                  </a>
                ) : (
                  badgeContent
                )}
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium">{badge.label}</p>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                  {badge.certificationBody && (
                    <p className="text-xs text-muted-foreground">
                      Certified by: {badge.certificationBody}
                    </p>
                  )}
                  {badge.validUntil && (
                    <p className="text-xs text-muted-foreground">
                      Valid until: {badge.validUntil.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }

      return badge.link ? (
        <a 
          href={badge.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          {badgeContent}
        </a>
      ) : (
        badgeContent
      )
    }

    if (badges.length === 0) {
      return null
    }

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className={cn(
                "font-medium text-foreground",
                badgeSize === "sm" ? "text-sm" : badgeSize === "lg" ? "text-lg" : "text-base"
              )}>
                {title}
              </h3>
            )}
            {description && (
              <p className={cn(
                "text-muted-foreground",
                badgeSize === "sm" ? "text-xs" : "text-sm"
              )}>
                {description}
              </p>
            )}
          </div>
        )}
        
        <div className={cn(securityBadgesVariants({ variant, size }))}>
          {badges.map((badge, index) => (
            <BadgeComponent key={`${badge.type}-${index}`} badge={badge} />
          ))}
        </div>
      </div>
    )
  }
)

SecurityBadges.displayName = "SecurityBadges"

export { SecurityBadges, securityBadgesVariants }
export type { SecurityBadge, SecurityBadgesProps }