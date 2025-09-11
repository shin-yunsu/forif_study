import * as React from "react"
import { cn } from "@/lib/utils"

interface GridProps extends React.ComponentProps<"div"> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: "none" | "sm" | "md" | "lg" | "xl"
  responsive?: boolean
}

interface GridItemProps extends React.ComponentProps<"div"> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  order?: number
}

const gridCols = {
  1: "grid-cols-1",
  2: "grid-cols-2", 
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12"
}

const gridGaps = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4", 
  lg: "gap-6",
  xl: "gap-8"
}

const gridSpan = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3", 
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  12: "col-span-12"
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 3, gap = "md", responsive = true, ...props }, ref) => {
    const responsiveClasses = responsive
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : gridCols[cols]

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          responsive ? responsiveClasses : gridCols[cols],
          gridGaps[gap],
          className
        )}
        {...props}
      />
    )
  }
)

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span = 1, order, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          gridSpan[span],
          order && `order-${order}`,
          className
        )}
        {...props}
      />
    )
  }
)

Grid.displayName = "Grid"
GridItem.displayName = "GridItem"

export { Grid, GridItem, type GridProps, type GridItemProps }