"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Button } from "./button"

interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  showPasswordStrength?: boolean
}

function PasswordInput({
  className,
  showPasswordStrength = false,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [password, setPassword] = React.useState("")

  // 패스워드 강도 계산
  const getPasswordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (/[a-z]/.test(pwd)) strength++
    if (/[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++
    return strength
  }

  const getStrengthLabel = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return "약함"
      case 2:
        return "보통"
      case 3:
        return "좋음"
      case 4:
      case 5:
        return "강함"
      default:
        return ""
    }
  }

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return "bg-destructive"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-blue-500"
      case 4:
      case 5:
        return "bg-green-500"
      default:
        return "bg-muted"
    }
  }

  const strength = getPasswordStrength(password)

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          props.onChange?.(e)
        }}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
        disabled={props.disabled}
      >
        {showPassword ? (
          <EyeOffIcon className="h-4 w-4" />
        ) : (
          <EyeIcon className="h-4 w-4" />
        )}
        <span className="sr-only">
          {showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
        </span>
      </Button>
      
      {showPasswordStrength && password && (
        <div className="mt-2 space-y-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={cn(
                  "h-1 w-full rounded-full bg-muted",
                  strength >= level && getStrengthColor(strength)
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            강도: {getStrengthLabel(strength)}
          </p>
        </div>
      )}
    </div>
  )
}

export { PasswordInput }