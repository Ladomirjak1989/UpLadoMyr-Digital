'use client';

import React from 'react';

export default function TagInput({
  value,
  onChange,
  placeholder = 'Add a tag and press Enter',
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = React.useState('');

  const addTag = (t: string) => {
    const tag = t.trim();
    if (!tag) return;
    if (!value.includes(tag)) onChange([...value, tag]);
    setDraft('');
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 text-slate-900 text-sm px-3 py-1 border border-slate-200"
          >
            {t}
            <button
              type="button"
              onClick={() => onChange(value.filter((x) => x !== t))}
              className="text-slate-500 hover:text-slate-700"
              aria-label={`Remove tag ${t}`}
              title="Remove"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addTag(draft);
          } else if (e.key === ',' && draft.trim()) {
            e.preventDefault();
            addTag(draft.replace(',', ''));
          }
        }}
        placeholder={placeholder}
        className="w-full rounded-xl border border-amber-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <p className="mt-1 text-xs text-slate-500">Separate tags with Enter or comma.</p>
    </div>
  );
}
