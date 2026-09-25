import { Pin, Heart, MoreVertical, Trash2, Paperclip } from "lucide-react"
import { Badge } from "../../../components/ui/Badge"
import { cn } from "../../../lib/utils"

export interface NoteCardProps {
  title: string;
  preview: string;
  date: string;
  tags?: string[];
  imageUrl?: string | null;
  fileUrl?: string | null;
  isPinned?: boolean;
  isFavorite?: boolean;
  colorVariant?: "default" | "lavender" | "mint" | "sky-blue" | "sage-green" | "warm-amber" | "soft-rose" | "coral" | "lilac" | "slate-gray";
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function NoteCard({
  title,
  preview,
  date,
  tags = [],
  imageUrl,
  fileUrl,
  isPinned,
  isFavorite,
  colorVariant = "default",
  onClick,
  onDelete,
  className
}: NoteCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group relative flex flex-col min-h-[12rem] p-4 rounded-2xl border transition-all cursor-pointer overflow-hidden",
        {
          "bg-surface border-border-soft hover:shadow-md hover:border-accent/30": colorVariant === "default",
          "bg-[#EAE4FA] border-transparent hover:shadow-md": colorVariant === "lavender",
          "bg-[#E0F4E8] border-transparent hover:shadow-md": colorVariant === "mint",
          "bg-[#E3F2FD] border-transparent hover:shadow-md": colorVariant === "sky-blue",
          "bg-[#E4ECE5] border-transparent hover:shadow-md": colorVariant === "sage-green",
          "bg-[#FFF3E0] border-transparent hover:shadow-md": colorVariant === "warm-amber",
          "bg-[#FCE4EC] border-transparent hover:shadow-md": colorVariant === "soft-rose",
          "bg-[#FFEBEE] border-transparent hover:shadow-md": colorVariant === "coral",
          "bg-[#F3E5F5] border-transparent hover:shadow-md": colorVariant === "lilac",
          "bg-[#ECEFF1] border-transparent hover:shadow-md": colorVariant === "slate-gray",
        },
        className
      )}
    >
      {/* Header: Tags & Badges */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap gap-1.5 overflow-hidden">
          {tags.slice(0, 2).map(tag => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className={colorVariant === "default" 
                ? "bg-black/5 dark:bg-white/10 text-primary border-transparent" 
                : "bg-black/5 text-gray-700 border-transparent"}
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
             <Badge 
               variant="secondary" 
               className={colorVariant === "default" 
                 ? "bg-black/5 dark:bg-white/10 text-primary border-transparent" 
                 : "bg-black/5 text-gray-700 border-transparent"}
             >
               +{tags.length - 2}
             </Badge>
          )}
        </div>
        <div className="flex items-center space-x-1 flex-shrink-0 text-muted">
          {isFavorite && <Heart className="w-4 h-4 text-danger fill-danger" />}
          {isPinned && <Pin className="w-4 h-4 text-accent fill-accent" />}
          {onDelete ? (
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(); }} 
              className="p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-danger/10 text-secondary hover:text-danger"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-black/5 text-secondary">
              <MoreVertical className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {imageUrl && (
        <div className="mb-3">
          <img src={`http://localhost:5000${imageUrl}`} alt="cover" className="w-full h-32 object-cover rounded-xl" />
        </div>
      )}

      {/* Content */}
      <h3 className={cn(
        "text-base font-semibold mb-1 line-clamp-1",
        colorVariant === "default" ? "text-primary" : "text-gray-900"
      )}>
        {title}
      </h3>
      <p className={cn(
        "text-sm leading-relaxed line-clamp-3 flex-1",
        colorVariant === "default" ? "text-secondary" : "text-gray-700"
      )}>
        {preview}
      </p>

      {/* Footer */}
      <div className={cn(
        "mt-4 pt-3 border-t text-xs flex justify-between items-center",
        colorVariant === "default" ? "border-border-soft/50 text-muted" : "border-black/5 text-gray-500"
      )}>
        <span>{date}</span>
        {fileUrl && (
          <div className="flex items-center" title="Has attachment">
            <Paperclip className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  )
}
