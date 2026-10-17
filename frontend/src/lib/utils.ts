import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Strips HTML tags and decodes common HTML entities for safe, clean plain-text previews.
 */
export function stripHtml(input?: string | null): string {
  if (!input || typeof input !== 'string') return '';

  // Remove HTML tags
  const withoutTags = input.replace(/<[^>]*>?/gm, ' ');

  // Decode HTML entities if in browser environment
  try {
    if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
      const doc = new DOMParser().parseFromString(withoutTags, 'text/html');
      return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
    }
  } catch {
    // fallback to regex decoding below
  }

  return withoutTags
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
