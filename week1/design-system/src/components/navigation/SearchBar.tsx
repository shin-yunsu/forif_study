"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const searchBarVariants = cva(
  "relative w-full",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-sm", 
        lg: "text-base"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

interface SearchBarProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof searchBarVariants> {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  onSearch?: (query: string) => void
  onClear?: () => void
  showSearchButton?: boolean
  autoComplete?: string[]
  isLoading?: boolean
}

export function SearchBar({
  className,
  placeholder = "강의를 검색해보세요...",
  value = "",
  onValueChange,
  onSearch,
  onClear,
  size = 'md',
  showSearchButton = true,
  autoComplete = [],
  isLoading = false,
  ...props
}: SearchBarProps) {
  const [inputValue, setInputValue] = React.useState(value)
  const [open, setOpen] = React.useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>([])

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
    onValueChange?.(newValue)

    // 자동완성 필터링
    if (newValue.trim() && autoComplete.length > 0) {
      const filtered = autoComplete.filter(item =>
        item.toLowerCase().includes(newValue.toLowerCase())
      )
      setFilteredSuggestions(filtered)
      setOpen(filtered.length > 0)
    } else {
      setOpen(false)
    }
  }

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch?.(inputValue.trim())
      setOpen(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const handleClear = () => {
    setInputValue("")
    onValueChange?.("")
    onClear?.()
    setOpen(false)
  }

  const handleSuggestionSelect = (suggestion: string) => {
    setInputValue(suggestion)
    onValueChange?.(suggestion)
    onSearch?.(suggestion)
    setOpen(false)
  }

  React.useEffect(() => {
    setInputValue(value)
  }, [value])

  if (showSearchButton) {
    return (
      <div className={cn(searchBarVariants({ size }), className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="flex">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="pl-10 pr-10 rounded-r-none border-r-0"
                  disabled={isLoading}
                />
                {inputValue && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                    onClick={handleClear}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">검색어 삭제</span>
                  </Button>
                )}
              </div>
              <Button
                type="button"
                onClick={handleSearch}
                disabled={isLoading || !inputValue.trim()}
                className="rounded-l-none"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span className="sr-only">검색</span>
              </Button>
            </div>
          </PopoverTrigger>
          
          {filteredSuggestions.length > 0 && (
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
              <Command>
                <CommandList>
                  <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                  <CommandGroup>
                    {filteredSuggestions.map((suggestion, index) => (
                      <CommandItem
                        key={index}
                        value={suggestion}
                        onSelect={() => handleSuggestionSelect(suggestion)}
                      >
                        <Search className="mr-2 h-4 w-4" />
                        {suggestion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          )}
        </Popover>
      </div>
    )
  }

  // showSearchButton이 false인 경우
  return (
    <div className={cn(searchBarVariants({ size }), className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyPress}
              className="pl-10 pr-10"
              disabled={isLoading}
            />
            {inputValue && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">검색어 삭제</span>
              </Button>
            )}
          </div>
        </PopoverTrigger>
        
        {filteredSuggestions.length > 0 && (
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
            <Command>
              <CommandList>
                <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                <CommandGroup>
                  {filteredSuggestions.map((suggestion, index) => (
                    <CommandItem
                      key={index}
                      value={suggestion}
                      onSelect={() => handleSuggestionSelect(suggestion)}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      {suggestion}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </div>
  )
}