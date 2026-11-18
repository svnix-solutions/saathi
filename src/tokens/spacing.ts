/**
 * Spacing scale (px). Covers every gap / padding / margin the screens use
 * (grep of src/apps: 2 3 4 5 6 7 8 9 10 11 12 14 16 18 20 24).
 */
export const spacing = {
  0: 0, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 14: 14, 16: 16, 18: 18, 20: 20, 24: 24,
} as const;
export type Spacing = keyof typeof spacing;

/** Semantic spacing. `scrX`, `scrTop`, `gap` are the original keys. */
export const space = {
  /** screen side padding */
  scrX: 16,
  /** screen top padding */
  scrTop: 20,
  /** screen bottom padding */
  scrBottom: 14,
  /** default gap between blocks on a screen */
  gap: 11,
  /** default gap inside a row */
  row: 8,
  /** card padding (vertical / horizontal) */
  cardY: 11,
  cardX: 12,
  /** gap between phones on a design page */
  phones: 40,
} as const;
