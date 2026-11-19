/** Service characters (`.ch .c1`–`.c9`): a square Unsplash photo per service (public/img/photos, credits in CREDITS.md there). */
export const characters = {
  clean: { src: 'photos/clean.jpg', x: 50, y: 50 },
  deep: { src: 'photos/deep.jpg', x: 50, y: 50 },
  kitchen: { src: 'photos/kitchen.jpg', x: 50, y: 50 },
  laundry: { src: 'photos/laundry.jpg', x: 50, y: 50 },
  custom: { src: 'photos/custom.jpg', x: 50, y: 50 },
  hero: { src: 'photos/hero.jpg', x: 50, y: 50 },
  nurse: { src: 'photos/nurse.jpg', x: 50, y: 50 },
  repair: { src: 'photos/repair.jpg', x: 50, y: 50 },
  barber: { src: 'photos/barber.jpg', x: 50, y: 50 },
} as const;
export type Character = keyof typeof characters;
export const characterIds = Object.keys(characters) as Character[];
