"use client"

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter, X } from 'lucide-react'

const categoryFilterVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        tabs: "space-y-4",
        buttons: "space-y-4",
        dropdown: "space-y-4",
      },
    },
    defaultVariants: {
      variant: "tabs",
    },
  }
)

interface Category {
  id: string
  label: string
  count?: number
  color?: string
}

interface CategoryFilterProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof categoryFilterVariants> {
  categories: Category[]
  selectedCategory?: string
  onCategoryChange?: (categoryId: string) => void
  showCounts?: boolean
  showClearButton?: boolean
  clearLabel?: string
  allLabel?: string
  placeholder?: string
}

const CategoryFilter = React.forwardRef<HTMLDivElement, CategoryFilterProps>(
  ({
    className,
    variant,
    categories,
    selectedCategory,
    onCategoryChange,
    showCounts = true,
    showClearButton = true,
    clearLabel = "Clear Filter",
    allLabel = "All Categories",
    placeholder = "Select a category",
    ...props
  }, ref) => {
    const handleCategorySelect = (categoryId: string) => {
      onCategoryChange?.(categoryId)
    }

    const handleClearFilter = () => {
      onCategoryChange?.("")
    }

    const allCategories = [
      { id: "", label: allLabel, count: categories.reduce((sum, cat) => sum + (cat.count || 0), 0) },
      ...categories
    ]

    if (variant === "tabs") {
      return (
        <div ref={ref} className={cn(categoryFilterVariants({ variant }), className)} {...props}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filter by category:</span>
            </div>
            {showClearButton && selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilter}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                {clearLabel}
              </Button>
            )}
          </div>
          
          <Tabs 
            value={selectedCategory || ""} 
            onValueChange={handleCategorySelect}
            className="w-full"
          >
            <TabsList className="h-auto p-1 grid-cols-none flex flex-wrap gap-1 bg-muted/50">
              {allCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm px-3 py-2 rounded-md"
                >
                  <span>{category.label}</span>
                  {showCounts && category.count !== undefined && (
                    <Badge 
                      variant="secondary" 
                      className="ml-2 h-5 px-2 text-xs"
                    >
                      {category.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )
    }

    if (variant === "buttons") {
      return (
        <div ref={ref} className={cn(categoryFilterVariants({ variant }), className)} {...props}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filter by category:</span>
            </div>
            {showClearButton && selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilter}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                {clearLabel}
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => {
              const isSelected = selectedCategory === category.id
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategorySelect(category.id)}
                  className="text-sm h-8"
                >
                  <span>{category.label}</span>
                  {showCounts && category.count !== undefined && (
                    <Badge 
                      variant={isSelected ? "secondary" : "outline"} 
                      className="ml-2 h-4 px-1.5 text-xs"
                    >
                      {category.count}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </div>
        </div>
      )
    }

    if (variant === "dropdown") {
      return (
        <div ref={ref} className={cn(categoryFilterVariants({ variant }), className)} {...props}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filter by category:</span>
            </div>
            {showClearButton && selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilter}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                {clearLabel}
              </Button>
            )}
          </div>
          
          <Select value={selectedCategory || ""} onValueChange={handleCategorySelect}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{category.label}</span>
                    {showCounts && category.count !== undefined && (
                      <Badge variant="secondary" className="ml-2 h-4 px-1.5 text-xs">
                        {category.count}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    }

    return null
  }
)

CategoryFilter.displayName = "CategoryFilter"

export { CategoryFilter, categoryFilterVariants }
export type { Category, CategoryFilterProps }