/** Corner radii (px). The first six keys are the original `radius` token. */
export const radius = {
  card: 14, btn: 13, pill: 11, ic: 10, phone: 38, tag: 20,
  /** inputs, OTP boxes, toast */
  input: 12,
  /** checkbox */
  check: 6,
  /** bottom sheet top corners */
  sheet: 22,
  /** chat bubble */
  bubble: 14,
  /** green header bottom corners */
  topBar: 20,
  /** character tile */
  tile: 13,
  /** bar chart bars */
  bar: 5,
} as const;
export type Radius = keyof typeof radius;
