import React from 'react';

export type TabItem<K extends string> = { key: K; label: string };

export type TabsProps<K extends string> = {
  items: TabItem<K>[];
  /** Key of the selected tab (drawn as a mint tag). */
  value: K;
  onChange: (k: K) => void;
};

/** Filter tabs inside a card header ("All · Now · Scheduled · Problems"). */
export function Tabs<K extends string>({ items, value, onChange }: TabsProps<K>) {
  return (
    <div className="lft s tabsel">
      {items.map((it) => it.key === value
        ? <span key={it.key} className="tag n">{it.label}</span>
        : <span key={it.key} className="m" onClick={() => onChange(it.key)}>{it.label}</span>)}
    </div>
  );
}
