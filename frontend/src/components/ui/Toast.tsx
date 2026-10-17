import * as React from "react"
import { cn } from "../../lib/utils"
import { Check, Info, AlertTriangle, XCircle, X } from "lucide-react"

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "error" | "warning";
  title: string;
  description?: string;
  onClose?: () => void;
}

export function Toast({ variant = "default", title, description, onClose, className, ...props }: ToastProps) {
  const icons = {
    default: <Info className="w-5 h-5 text-accent" />,
    success: <Check className="w-5 h-5 text-success" />,
    error: <XCircle className="w-5 h-5 text-danger" />,
    warning: <AlertTriangle className="w-5 h-5 text-warning" />,
  }

  return (
    <div
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3.5 rounded-2xl border-2 border-black bg-white dark:bg-[#1E1E1E] p-4 shadow-[4px_4px_0px_0px_#000000] transition-all",
        className
      )}
      {...props}
    >
      <div className="shrink-0 pt-0.5">
        {icons[variant]}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-black text-black dark:text-white">{title}</p>
        {description && (
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 rounded-lg p-1 text-black dark:text-white border-2 border-transparent hover:border-black hover:bg-black/5 transition-all cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>
      )}
    </div>
  )
}
