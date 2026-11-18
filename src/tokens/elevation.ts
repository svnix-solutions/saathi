/** Box shadows used by the design (react-native-web `boxShadow` strings). */
export const elevation = {
  /** primary green button */
  buttonPrimary: '0 6px 12px -8px rgba(11,93,75,.5)',
  /** yellow button */
  buttonYellow: '0 6px 12px -8px rgba(255,201,60,.8)',
  /** bottom tab bar (shadow cast upwards) */
  tabBar: '0 -6px 16px -10px rgba(15,31,28,.18)',
  /** phone frame */
  phone: '0 34px 60px -28px rgba(7,63,51,.45), 0 0 0 1.5px #33443f',
} as const;
export type Elevation = keyof typeof elevation;
