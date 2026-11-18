import React from 'react';

/**
 * `primary` solid green (`btn`) · `outline` white with green border (`btn o`) · `accent` yellow (`btn y`) ·
 * `danger` solid red (`btn r`) · `danger-outline` white with red text and border.
 */
export type ButtonVariant = 'primary' | 'outline' | 'accent' | 'danger' | 'danger-outline';

/**
 * Padding presets. Each one reproduces a pattern the design already uses, so pages can switch without a pixel moving:
 * - `lg`: the design's default `.btn` (13 px padding), no inline style.
 * - `md`: page and modal actions: `9px 16px` outlined, `10px 16px` solid.
 * - `compact`: `6px 12px` outlined, `7px 12px` solid, 12 px text.
 * - `xs`: `6px 12px`, 12 px text for every variant.
 * - `sm`: the design class `btn sm` (as in `className="btn o sm"`), no inline style.
 */
export type ButtonSize = 'xs' | 'sm' | 'compact' | 'md' | 'lg';

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Greys the button out (`.dis`) and ignores clicks. */
  disabled?: boolean;
  /** Receives the click event, e.g. to `stopPropagation()` inside a clickable row. */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** `submit` inside a form; defaults to `button`. */
  type?: 'button' | 'submit';
  children: React.ReactNode;
  /** Extra classes (e.g. `end` to push it to the bottom of a flex column). */
  className?: string;
  /** Merged last, after the size and variant styles. */
  style?: React.CSSProperties;
  title?: string;
};

const variantClass: Record<ButtonVariant, string> = { primary: '', outline: 'o', accent: 'y', danger: 'r', 'danger-outline': 'o' };

function sizeStyle(size: ButtonSize, outlined: boolean): React.CSSProperties | undefined {
  switch (size) {
    case 'xs': return { padding: '6px 12px', fontSize: 12 };
    case 'compact': return { padding: outlined ? '6px 12px' : '7px 12px', fontSize: 12 };
    case 'md': return { padding: outlined ? '9px 16px' : '10px 16px' };
    default: return undefined;
  }
}

/** Admin button: a real `<button>` drawn with the design's `.btn` classes. */
export function Button({ variant = 'primary', size = 'md', disabled, onClick, children, className, style, title, type = 'button' }: ButtonProps) {
  const outlined = variant === 'outline' || variant === 'danger-outline';
  const red: React.CSSProperties | undefined = variant === 'danger-outline' ? { color: 'var(--red)', borderColor: 'var(--red)' } : undefined;
  const base = sizeStyle(size, outlined);
  const merged = base || red || style ? { ...base, ...red, ...style } : undefined;
  const cls = ['btn', variantClass[variant], size === 'sm' ? 'sm' : '', disabled ? 'dis' : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} style={merged} title={title}
      onClick={(e) => { if (disabled) { e.preventDefault(); return; } onClick?.(e); }} aria-disabled={disabled || undefined}>{children}</button>
  );
}
