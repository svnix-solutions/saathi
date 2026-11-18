/**
 * Colour tokens. Source: web/design/saathi-design.html :root and the `.dk` rules.
 * `palette` is the brand palette (fixed); `light` / `dark` are the theme schemes read through `useTheme().c`.
 */
export const palette = {
  green: '#0b5d4b', // Saathi Green — buttons, headers
  greenD: '#073f33', // deep green — admin sidebar, job-request screen
  green2: '#0f6b57', // admin active nav
  mint: '#e3f2ec',
  yellow: '#ffc93c', // Quick Yellow — ONLY for speed: 15-min promise, timers, helper avatar
  ink: '#0f1f1c',
  mut: '#5b6b67', // Slate
  line: '#dbe5e1',
  bg: '#f3f7f5',
  white: '#ffffff',
  red: '#b3261e',
  amber: '#8a5a00',
  mapBg: '#dfeae5',
  chip: '#e9eeec',
} as const;

/**
 * One-off tints the components use that are not part of the brand palette.
 * Kept here so no component hard-codes a hex value.
 */
export const tint = {
  /** dark-green track on the green header (progress bars, ghostDark button border) */
  greenTrack: '#2d6a5b',
  /** pale red behind a danger status icon (light scheme) */
  redBg: '#fbe9e7',
  /** pale red behind a danger status icon (dark scheme) */
  redBgDark: '#3a1f1c',
  /** map roads in the dark scheme (light scheme uses white) */
  roadDark: '#24332f',
  /** thin ring around the phone bezel */
  bezelRing: '#33443f',
  /** dark photo thumbnail (photo check "before") */
  photoDark: '#2a2f2d',
  /** sheet backdrop */
  scrim: 'rgba(15,31,28,.45)',
} as const;

export type ColorScheme = {
  green: string; greenD: string; mint: string; yellow: string; ink: string; mut: string;
  line: string; bg: string; surface: string; card: string; red: string; accent: string;
  onGreen: string; selBg: string; selBorder: string; tabBg: string; chip: string; mapBg: string;
};

export const light: ColorScheme = {
  green: palette.green, greenD: palette.greenD, mint: palette.mint, yellow: palette.yellow,
  ink: palette.ink, mut: palette.mut, line: palette.line, bg: palette.bg, surface: palette.white,
  card: palette.white, red: palette.red, accent: palette.green, onGreen: '#ffffff',
  selBg: palette.mint, selBorder: palette.green, tabBg: palette.white, chip: palette.chip, mapBg: palette.mapBg,
};

/** Dark mode values from the design's `.dk` rules. */
export const dark: ColorScheme = {
  green: palette.green, greenD: palette.greenD, mint: '#1c3830', yellow: palette.yellow,
  ink: '#eef3f1', mut: '#a3b3ae', line: '#2a3a35', bg: '#0e1614', surface: '#0e1614',
  card: '#172320', red: '#ff8a80', accent: '#5fd6b6', onGreen: '#ffffff',
  selBg: '#1c3830', selBorder: '#5fd6b6', tabBg: '#0e1614', chip: '#22302c', mapBg: '#1a2724',
};
