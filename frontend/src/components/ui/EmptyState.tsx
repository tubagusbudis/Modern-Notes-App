import { ReactNode } from "react";
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
    <div className={cn("flex flex-col items-center justify-center text-center p-8 h-64 border border-dashed border-border-soft rounded-2xl bg-surface/50", className)}>
      {icon && (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-subtle text-muted mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-primary mb-1">{title}</h3>
      <p className="text-secondary text-sm max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
