/** Faces (`.av.f-xx`). Each named person in the sample data has one. */
export const faces = {
  sd: { src: 'hero.png', x: 49, y: 7, s: 600 }, // Sunita D. — the hero helper
  rm: { src: 'clean.png', x: 59, y: 10, s: 550 },
  kr: { src: 'custom.png', x: 47, y: 11, s: 450 },
  gk: { src: 'face-gk.png', x: 45, y: 15, s: 230 },
  mt: { src: 'face-mt.png', x: 50, y: 7, s: 330 },
  ms: { src: 'cust-ms.png', x: 50, y: 62, s: 170 },
  ap: { src: 'cust-ap.png', x: 50, y: 34, s: 260 },
  rg: { src: 'cust-rg.png', x: 50, y: 36, s: 240 },
  fa: { src: 'cust-fa.png', x: 50, y: 41, s: 240 },
  pn: { src: 'cust-pn.png', x: 50, y: 35, s: 220 },
  st: { src: 'cust-st.png', x: 50, y: 17, s: 300 },
  rv: { src: 'cust-rv.png', x: 46, y: 24, s: 290 },
  ak: { src: 'cust-ak.png', x: 43, y: 18, s: 290 },
  kd: { src: 'cust-kd.png', x: 50, y: 13, s: 520 },
  pv: { src: 'face-pv.png', x: 28, y: 24, s: 300 },
  ls: { src: 'face-ls.png', x: 84, y: 22, s: 290 },
  ad: { src: 'staff-ad.png', x: 50, y: 18, s: 190 },
  ol: { src: 'staff-ol.png', x: 50, y: -4, s: 267 },
  ac: { src: 'staff-ac.png', x: 50, y: 16, s: 190 },
  au: { src: 'staff-au.png', x: 50, y: 14, s: 190 },
  s1: { src: 'staff-s1.png', x: 50, y: 16, s: 260 },
  s2: { src: 'staff-s2.png', x: 5, y: 48, s: 181 },
  mk: { src: 'staff-mk.png', x: 54, y: 1, s: 253 },
  nk: { src: 'cust-nk.png', x: 50, y: 30, s: 260 }, // Nitin K. — the sample customer
  ab: { src: 'face-ab.png', x: 45, y: 15, s: 350 },
} as const;
export type Face = keyof typeof faces;
export const faceIds = Object.keys(faces) as Face[];
