/** Service characters (`.ch .c1`–`.c9`): flat 2D drawings from scripts/art/make-2d.mjs, each a whole 100×100 square. */
export const characters = {
  clean: { src: '2d/clean.svg', x: 50, y: 50 },
  deep: { src: '2d/deep.svg', x: 50, y: 50 },
  kitchen: { src: '2d/kitchen.svg', x: 50, y: 50 },
  laundry: { src: '2d/laundry.svg', x: 50, y: 50 },
  custom: { src: '2d/custom.svg', x: 50, y: 50 },
  hero: { src: '2d/hero.svg', x: 50, y: 50 },
  nurse: { src: '2d/nurse.svg', x: 50, y: 50 },
  repair: { src: '2d/repair.svg', x: 50, y: 50 },
  barber: { src: '2d/barber.svg', x: 50, y: 50 },
} as const;
export type Character = keyof typeof characters;
export const characterIds = Object.keys(characters) as Character[];
