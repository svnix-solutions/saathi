/** Service characters (`.ch .c1`–`.c9`). Pos/size match the design CSS. */
export const characters = {
  clean: { src: 'clean.png', x: 65, y: 13 },
  deep: { src: 'deep.png', x: 50, y: 9 },
  kitchen: { src: 'kitchen.png', x: 46, y: 3 },
  laundry: { src: 'laundry.png', x: 38, y: 4 },
  custom: { src: 'custom.png', x: 46, y: 15 },
  hero: { src: 'hero.png', x: 52, y: 4 },
  nurse: { src: 'nurse.png', x: 50, y: 8 },
  repair: { src: 'repair.png', x: 57, y: 4 },
  barber: { src: 'barber.png', x: 50, y: 8 },
} as const;
export type Character = keyof typeof characters;
export const characterIds = Object.keys(characters) as Character[];
