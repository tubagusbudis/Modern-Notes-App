import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "pastel" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
        {
          "border-transparent bg-accent text-white hover:bg-accent/80": variant === "default",
          "border-transparent bg-subtle text-secondary hover:bg-subtle/80": variant === "secondary",
          "border-border-soft text-primary": variant === "outline",
          "border-transparent bg-accent-soft text-accent": variant === "pastel",
          "border-transparent bg-success/20 text-success": variant === "success",
          "border-transparent bg-warning/20 text-warning": variant === "warning",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
