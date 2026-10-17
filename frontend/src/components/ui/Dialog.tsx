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
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-all"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className={cn(
            "bg-white dark:bg-[#1E1E1E] border-3 sm:border-4 border-black shadow-[6px_6px_0px_0px_#000000] rounded-3xl w-full max-w-md p-6 pointer-events-auto transform transition-all scale-100 opacity-100",
            className
          )}
          {...props}
        >
          {title && (
            <h2 className="text-xl font-black text-black dark:text-white mb-4 tracking-tight">{title}</h2>
          )}
          {children}
        </div>
      </div>
    </>
  )
}
