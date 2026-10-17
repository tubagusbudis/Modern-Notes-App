import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 min-h-[16rem] border-2 border-dashed border-black rounded-3xl bg-white dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_#000000]", className)}>
      {icon && (
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#FFE066] border-2 border-black text-black shadow-[2px_2px_0px_0px_#000000] mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-black text-black dark:text-white mb-1.5 tracking-tight">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 font-medium text-sm max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
