import React from 'react';

/** Every symbol in `<Sprite>` (the same 22 shapes as the apps, plus `mark`). */
export type IconName =
  | 'sparkle' | 'drop' | 'dish' | 'shirt' | 'clock' | 'home' | 'list' | 'user' | 'pin' | 'call' | 'check' | 'star'
  | 'wallet' | 'bolt' | 'back' | 'shield' | 'mic' | 'cam' | 'bell' | 'find' | 'key' | 'mark' | 'close' | 'chevron' | 'plus';

/** All icon names, in sprite order (for stories and pickers). */
export const iconNames: IconName[] = [
  'sparkle', 'drop', 'dish', 'shirt', 'clock', 'home', 'list', 'user', 'pin', 'call', 'check', 'star',
  'wallet', 'bolt', 'back', 'shield', 'mic', 'cam', 'bell', 'find', 'key', 'close', 'chevron', 'plus',
];

export type IconProps = {
  /** Symbol to draw. */
  n: IconName;
  /** Filled instead of stroked (`svg.i.f`). */
  f?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

/**
 * Line icon: `<I n="home" />` renders the design's `<svg class="i"><use href="#home"/></svg>` (18 px, stroke =
 * currentColor). Needs `<Sprite>` on the page.
 */
export const I = ({ n, f, style, className = '' }: IconProps) => (
  <svg className={`i ${f ? 'f' : ''} ${className}`} style={style} aria-hidden="true"><use href={`#${n}`} /></svg>
);

/** Long name for `I`. */
export const Icon = I;
