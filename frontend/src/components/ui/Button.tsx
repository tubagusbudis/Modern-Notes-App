import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "danger" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = "button"
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-extrabold transition-all cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#FF7890] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000000] hover:bg-[#FF617D] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none":
              variant === "default",
            "bg-white dark:bg-[#1E1E1E] border-2 border-black text-black dark:text-white shadow-[2px_2px_0px_0px_#000000] hover:bg-black/5 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none":
              variant === "outline",
            "hover:bg-black/5 text-gray-800 dark:text-gray-200 border-2 border-transparent hover:border-black rounded-lg transition-colors":
              variant === "ghost",
            "bg-[#FF6B6B] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000000] hover:bg-[#FF5252] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none":
              variant === "danger",
            "bg-[#C4B5FD] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000000] hover:bg-[#B5A1FC] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none":
              variant === "secondary",
            "h-10 px-4 py-2": size === "default",
            "h-8 rounded-lg px-3 text-xs": size === "sm",
            "h-12 rounded-2xl px-8 text-base": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
