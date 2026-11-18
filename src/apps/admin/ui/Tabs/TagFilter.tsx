import React from 'react';

export type TagFilterItem<K extends string> = {
  key: K;
  label: string;
  /** Unselected chip drawn as a red tag (e.g. "Needs a partner 2"). */
  red?: boolean;
};

export type TagFilterProps<K extends string> = {
  items: TagFilterItem<K>[];
  value: K;
  onChange: (k: K) => void;
};

/**
 * Row of tag-style filter chips ("All 86 · Needs a partner 2 · …"). The selected chip is mint with a green outline.
 * Renders a fragment: put it inside your own `.lft` row.
 */
export function TagFilter<K extends string>({ items, value, onChange }: TagFilterProps<K>) {
  return (
    <>
      {items.map((it) => (
        <span key={it.key} className={`tag clk ${it.key === value ? 'n' : it.red ? 'r' : 'x'}`}
          style={it.key === value ? { outline: '1.5px solid var(--green)' } : undefined} onClick={() => onChange(it.key)}>{it.label}</span>
      ))}
    </>
  );
}
