import { cn } from "../../lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-2xl border-2 border-black/20 bg-black/5 dark:bg-white/5", className)}
      {...props}
    />
  )
}

export { Skeleton }
