import React from 'react';

/**
 * Tag colours from the design:
 * `y` yellow (default, "needs a look"), `g` solid green (good / active), `n` mint (neutral info),
 * `x` grey (done / off), `r` red outline (problem).
 */
export type TagTone = 'y' | 'g' | 'n' | 'x' | 'r';

export const tagTones: TagTone[] = ['y', 'g', 'n', 'x', 'r'];

export type TagProps = {
  tone?: TagTone;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  title?: string;
  /** Makes the tag a button (pointer cursor, keyboard Enter/Space). Receives the event for `stopPropagation()`. */
  onClick?: (e: React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>) => void;
};

/** Pill-shaped status label (`.tag`). With `onClick` it becomes a clickable chip. */
export const Tag = ({ tone = 'y', children, style, className, title, onClick }: TagProps) => (
  <span className={['tag', tone === 'y' ? '' : tone, onClick ? 'clk' : '', className ?? ''].filter(Boolean).join(' ')} style={style} title={title}
    {...(onClick ? { role: 'button', tabIndex: 0, onClick, onKeyDown: (e: React.KeyboardEvent<HTMLSpanElement>) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } } } : {})}>
    {children}
  </span>
);
