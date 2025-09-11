"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

interface FormFieldProps {
  label?: string
  required?: boolean
  error?: string
  description?: string
  className?: string
  children: React.ReactNode
}

function FormField({
  label,
  required = false,
  error,
  description,
  className,
  children
}: FormFieldProps) {
  const fieldId = React.useId()
  
  return (
    <div className={cn("grid gap-2", className)}>
      {label && (
        <Label htmlFor={fieldId} className={cn(error && "text-destructive")}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      
      <div className="relative">
        {React.cloneElement(children as React.ReactElement, {
          id: fieldId,
          "aria-invalid": !!error,
          "aria-describedby": error ? `${fieldId}-error` : description ? `${fieldId}-description` : undefined,
        })}
      </div>

      {description && !error && (
        <p
          id={`${fieldId}-description`}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      )}

      {error && (
        <p
          id={`${fieldId}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export { FormField }