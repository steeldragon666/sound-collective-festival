import type { ReactNode } from 'react';

/**
 * Wraps case-insensitive occurrences of `query` in a coral <mark>.
 * Returns the plain string when there is no active query.
 */
export function highlightText(text: string, query: string): ReactNode {
  const q = query.trim();
  if (!q) return text;

  const lower = text.toLowerCase();
  const needle = q.toLowerCase();
  const parts: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  while (cursor <= text.length) {
    const idx = lower.indexOf(needle, cursor);
    if (idx === -1) {
      parts.push(text.slice(cursor));
      break;
    }
    if (idx > cursor) parts.push(text.slice(cursor, idx));
    parts.push(
      <mark key={key++} className="rounded-sm bg-coral px-0.5 text-cream">
        {text.slice(idx, idx + needle.length)}
      </mark>,
    );
    cursor = idx + needle.length;
  }
  return parts;
}
