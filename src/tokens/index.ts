/**
 * Saathi design tokens — shared by the React Native apps (customer, partner)
 * and the React web admin panel. Source: docs/design/kleankart-design.html :root.
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

export const font = {
  family: '"Avenir Next", "Helvetica Neue", Arial, sans-serif',
  size: { s: 11, body: 12, h2: 13, btn: 13, h: 19, hl: 22, stat: 28 },
} as const;

export const radius = { card: 14, btn: 13, pill: 11, ic: 10, phone: 38, tag: 20 } as const;
export const space = { scrX: 16, scrTop: 20, gap: 11 } as const;
