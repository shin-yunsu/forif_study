import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface SidebarProps extends React.ComponentProps<"aside"> {
  collapsible?: boolean
  defaultCollapsed?: boolean
  position?: "left" | "right"
  width?: "sm" | "md" | "lg"
  onCollapsedChange?: (collapsed: boolean) => void
}

const sidebarWidths = {
  sm: "w-64",
  md: "w-72",
  lg: "w-80"
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ 
    className, 
    collapsible = false,
    defaultCollapsed = false,
    position = "left",
    width = "md",
    children,
    onCollapsedChange,
    ...props 
  }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
    
    const handleToggle = () => {
      const newCollapsed = !isCollapsed
      setIsCollapsed(newCollapsed)
      onCollapsedChange?.(newCollapsed)
    }

    return (
      <aside
        ref={ref}
        className={cn(
          "relative flex-shrink-0 border-r bg-card transition-all duration-200",
          isCollapsed ? "w-12" : sidebarWidths[width],
          className
        )}
        {...props}
      >
        {collapsible && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 -right-3 z-10 w-6 h-6 p-0 bg-background border shadow-sm hover:bg-accent"
            onClick={handleToggle}
          >
            {position === "left" ? (
              isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />
            ) : (
              isCollapsed ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />
            )}
          </Button>
        )}
        
        <div className={cn(
          "h-full overflow-hidden transition-all duration-200",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}>
          {children}
        </div>
      </aside>
    )
  }
)

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-6 border-b", className)}
    {...props}
  />
))

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto p-4", className)}
    {...props}
  />
))

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-4 border-t", className)}
    {...props}
  />
))

Sidebar.displayName = "Sidebar"
SidebarHeader.displayName = "SidebarHeader"
SidebarContent.displayName = "SidebarContent"
SidebarFooter.displayName = "SidebarFooter"

export { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  type SidebarProps 
}