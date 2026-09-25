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
        "pointer-events-auto flex w-full max-w-sm items-start gap-4 rounded-xl border border-border-soft bg-surface p-4 shadow-lg transition-all",
        className
      )}
      {...props}
    >
      <div className="shrink-0 pt-0.5">
        {icons[variant]}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-semibold text-primary">{title}</p>
        {description && (
          <p className="text-sm text-secondary leading-relaxed">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 rounded-md p-1 text-muted hover:bg-subtle hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
