import { Pin, Heart, MoreVertical, Trash2, Paperclip } from "lucide-react";
import { cn, stripHtml } from "../../../lib/utils";
import { useLanguage } from "../../../context/LanguageContext";

export interface NoteCardProps {
  title: string;
  preview: string;
  date: string;
  tags?: string[];
  imageUrl?: string | null;
  fileUrl?: string | null;
  isPinned?: boolean;
  isFavorite?: boolean;
  colorVariant?:
    | "default"
    | "lavender"
    | "mint"
    | "sky-blue"
    | "sage-green"
    | "warm-amber"
    | "soft-rose"
    | "coral"
    | "lilac"
    | "slate-gray";
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
  layout?: 'grid' | 'list';
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
  className,
  layout = 'grid',
}: NoteCardProps) {
  const { t } = useLanguage();
  const isPastel = colorVariant !== "default";
  const cleanPreview = stripHtml(preview);

  const colorBgClass = {
    "bg-white dark:bg-[#1E1E1E]": colorVariant === "default",
    "bg-[#E2D4FF]": colorVariant === "lavender",
    "bg-[#A3F7CF]": colorVariant === "mint",
    "bg-[#B4E4FF]": colorVariant === "sky-blue",
    "bg-[#CBE8BA]": colorVariant === "sage-green",
    "bg-[#FFEB85]": colorVariant === "warm-amber",
    "bg-[#FFC6D0]": colorVariant === "soft-rose",
    "bg-[#FFB5A7]": colorVariant === "coral",
    "bg-[#E8D1FF]": colorVariant === "lilac",
    "bg-[#DFE4EA]": colorVariant === "slate-gray",
  };

  if (layout === 'list') {
    return (
      <div
        onClick={onClick}
        className={cn(
          "group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000000] transition-all cursor-pointer overflow-hidden select-none",
          colorBgClass,
          className
        )}
      >
        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
          {imageUrl && (
            <img
              src={`http://localhost:5000${imageUrl}`}
              alt="cover"
              className="w-14 h-14 object-cover rounded-xl border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] shrink-0 hidden sm:block"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              {isFavorite && (
                <span title={t('toggleFavorite')} className="shrink-0">
                  <Heart className="w-4 h-4 text-black fill-[#FF7890] stroke-[2.2]" />
                </span>
              )}
              {isPinned && (
                <span title={t('togglePin')} className="shrink-0">
                  <Pin className="w-4 h-4 text-black fill-[#C4B5FD] stroke-[2.2]" />
                </span>
              )}
              <h3
                className={cn(
                  "text-base font-black truncate tracking-tight",
                  isPastel ? "text-gray-900" : "text-[#111111] dark:text-[#F3F4F6]"
                )}
              >
                {title || t('untitledNote')}
              </h3>
            </div>
            <p
              className={cn(
                "text-xs sm:text-sm font-semibold line-clamp-1",
                isPastel ? "text-gray-800" : "text-gray-600 dark:text-gray-300"
              )}
            >
              {cleanPreview || t('noContentPreview')}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/15">
          {tags.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-hidden">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-white border-2 border-black rounded-lg px-2 py-0.5 text-[11px] font-black text-black shadow-[1px_1px_0px_0px_#000]"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="bg-white border-2 border-black rounded-lg px-1.5 py-0.5 text-[10px] font-black text-black shadow-[1px_1px_0px_0px_#000]">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-2.5">
            {fileUrl && (
              <div
                className="flex items-center px-1.5 py-0.5 bg-white border-2 border-black rounded-md shadow-[1px_1px_0px_0px_#000] text-black text-[10px] font-black"
                title={t('hasAttachment')}
              >
                <Paperclip className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            )}
            <span className={cn(
              "text-xs font-black",
              isPastel ? "text-gray-800" : "text-gray-600 dark:text-gray-300"
            )}>
              {date}
            </span>
            {onDelete ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-1.5 rounded-lg border-2 border-transparent hover:border-black hover:bg-white text-black shadow-none hover:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer"
                title={t('deleteNote')}
              >
                <Trash2 className="w-4 h-4 stroke-[2.2]" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col min-h-[13rem] p-5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#000000] transition-all cursor-pointer overflow-hidden select-none",
        {
          "bg-white dark:bg-[#1E1E1E]": colorVariant === "default",
          "bg-[#E2D4FF]": colorVariant === "lavender",
          "bg-[#A3F7CF]": colorVariant === "mint",
          "bg-[#B4E4FF]": colorVariant === "sky-blue",
          "bg-[#CBE8BA]": colorVariant === "sage-green",
          "bg-[#FFEB85]": colorVariant === "warm-amber",
          "bg-[#FFC6D0]": colorVariant === "soft-rose",
          "bg-[#FFB5A7]": colorVariant === "coral",
          "bg-[#E8D1FF]": colorVariant === "lilac",
          "bg-[#DFE4EA]": colorVariant === "slate-gray",
        },
        className,
      )}
    >
      {/* Header: Tags & Badges */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap gap-1.5 overflow-hidden">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-white border-2 border-black rounded-lg px-2.5 py-0.5 text-xs font-black text-black shadow-[1.5px_1.5px_0px_0px_#000]"
            >
              {tag}
            </span>
          ))}
          {tags.length > 2 && (
            <span className="bg-white border-2 border-black rounded-lg px-2 py-0.5 text-xs font-black text-black shadow-[1.5px_1.5px_0px_0px_#000]">
              +{tags.length - 2}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1.5 flex-shrink-0">
          {isFavorite && (
            <span title={t('toggleFavorite')} className="p-0.5">
              <Heart className="w-4.5 h-4.5 text-black fill-[#FF7890] stroke-[2.2]" />
            </span>
          )}
          {isPinned && (
            <span title={t('togglePin')} className="p-0.5">
              <Pin className="w-4.5 h-4.5 text-black fill-[#C4B5FD] stroke-[2.2]" />
            </span>
          )}
          {onDelete ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 rounded-lg border-2 border-transparent hover:border-black hover:bg-white text-black shadow-none hover:shadow-[1px_1px_0px_0px_#000] opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              title={t('deleteNote')}
            >
              <Trash2 className="w-4 h-4 stroke-[2.2]" />
            </button>
          ) : (
            <button className="p-1 rounded-lg border-2 border-transparent hover:border-black hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-all">
              <MoreVertical className="w-4 h-4 stroke-[2.2]" />
            </button>
          )}
        </div>
      </div>

      {imageUrl && (
        <div className="mb-3">
          <img
            src={`http://localhost:5000${imageUrl}`}
            alt="cover"
            className="w-full h-36 object-cover rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000]"
          />
        </div>
      )}

      {/* Content */}
      <h3
        className={cn(
          "text-base font-black mb-1.5 line-clamp-1 tracking-tight",
          isPastel ? "text-gray-900" : "text-[#111111] dark:text-[#F3F4F6]",
        )}
      >
        {title || t('untitledNote')}
      </h3>
      <p
        className={cn(
          "text-sm font-semibold leading-relaxed line-clamp-3 flex-1",
          isPastel ? "text-gray-800" : "text-gray-600 dark:text-gray-300",
        )}
      >
        {cleanPreview || t('noContentPreview')}
      </p>

      {/* Footer */}
      <div
        className={cn(
          "mt-4 pt-3 border-t-2 flex justify-between items-center text-xs font-black",
          isPastel
            ? "border-black/20 text-gray-800"
            : "border-black/20 dark:border-white/20 text-gray-600 dark:text-gray-300",
        )}
      >
        <span>{date}</span>
        <div className="flex items-center gap-2">
          {fileUrl && (
            <div
              className="flex items-center gap-1 px-1.5 py-0.5 bg-white border-2 border-black rounded-md shadow-[1px_1px_0px_0px_#000] text-black text-[10px] font-black"
              title={t('hasAttachment')}
            >
              <Paperclip className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          )}
          <span className="w-2.5 h-2.5 rounded-full bg-black border border-black inline-block" />
        </div>
      </div>
    </div>
  );
}
