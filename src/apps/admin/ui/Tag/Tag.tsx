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
};

/** Pill-shaped status label (`.tag`). */
export const Tag = ({ tone = 'y', children, style }: TagProps) => (
  <span className={`tag ${tone === 'y' ? '' : tone}`} style={style}>{children}</span>
);
