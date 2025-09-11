"use client"

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const logoVariants = cva(
  "flex items-center transition-opacity hover:opacity-80",
  {
    variants: {
      size: {
        sm: "space-x-1.5",
        md: "space-x-2", 
        lg: "space-x-3"
      },
      variant: {
        default: "text-foreground",
        white: "text-white",
        dark: "text-gray-900"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
)

const logoIconVariants = cva(
  "relative flex items-center justify-center rounded-lg bg-primary",
  {
    variants: {
      size: {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

const logoTextVariants = cva(
  "font-display tracking-tight",
  {
    variants: {
      size: {
        sm: "text-lg font-bold",
        md: "text-xl font-bold", 
        lg: "text-2xl font-bold"
      },
      variant: {
        default: "text-foreground",
        white: "text-white",
        dark: "text-gray-900"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
)

interface LogoProps 
  extends React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof logoVariants> {
  hideText?: boolean
  href?: string
}

export function Logo({ 
  className, 
  size,
  variant,
  hideText = false,
  href = '/',
  ...props 
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(logoVariants({ size, variant }), className)}
      {...props}
    >
      {/* Logo Icon/Symbol */}
      <div className={cn(logoIconVariants({ size }))}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-3/4 h-3/4 text-primary-foreground"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            fill="currentColor"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {!hideText && (
        <span className={cn(logoTextVariants({ size, variant }))}>
          <span className="text-primary">forif</span>
        </span>
      )}
    </Link>
  )
}

export default Logo