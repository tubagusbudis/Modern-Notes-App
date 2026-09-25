import * as React from "react"
import { cn } from "../../lib/utils"

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function Dialog({ isOpen, onClose, title, children, className, ...props }: DialogProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-all"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className={cn(
            "bg-surface border border-border-soft shadow-xl rounded-2xl w-full max-w-md p-6 pointer-events-auto transform transition-all scale-100 opacity-100",
            className
          )}
          {...props}
        >
          {title && (
            <h2 className="text-xl font-bold text-primary mb-4">{title}</h2>
          )}
          {children}
        </div>
      </div>
    </>
  )
}
