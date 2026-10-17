import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "pastel" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border-2 border-black px-2.5 py-0.5 text-xs font-black shadow-[1.5px_1.5px_0px_0px_#000000] transition-all",
        {
          "bg-[#FF7890] text-black": variant === "default",
          "bg-white text-black dark:bg-[#1E1E1E] dark:text-white": variant === "secondary",
          "bg-[#FFE066] text-black": variant === "warning",
          "bg-[#C4B5FD] text-black": variant === "pastel",
          "bg-[#A3F7CF] text-black": variant === "success",
          "border-black bg-transparent text-black dark:text-white": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
