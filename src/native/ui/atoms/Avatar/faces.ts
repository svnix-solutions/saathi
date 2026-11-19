/** Faces (`.av.f-xx`): Unsplash photos in public/img/photos (credits in CREDITS.md there), cropped square on the face. Each named person in the sample data has one. */
export const faces = {
  sd: { src: 'photos/sd.jpg', x: 50, y: 50, s: 100 }, // Sunita D. — the hero helper
  rm: { src: 'photos/rm.jpg', x: 50, y: 50, s: 100 },
  kr: { src: 'photos/kr.jpg', x: 50, y: 50, s: 100 },
  gk: { src: 'photos/gk.jpg', x: 50, y: 50, s: 100 },
  mt: { src: 'photos/mt.jpg', x: 50, y: 50, s: 100 },
  ms: { src: 'photos/ms.jpg', x: 50, y: 50, s: 100 },
  ap: { src: 'photos/ap.jpg', x: 50, y: 50, s: 100 },
  rg: { src: 'photos/rg.jpg', x: 50, y: 50, s: 100 },
  fa: { src: 'photos/fa.jpg', x: 50, y: 50, s: 100 },
  pn: { src: 'photos/pn.jpg', x: 50, y: 50, s: 100 },
  st: { src: 'photos/st.jpg', x: 50, y: 50, s: 100 },
  rv: { src: 'photos/rv.jpg', x: 50, y: 50, s: 100 },
  ak: { src: 'photos/ak.jpg', x: 50, y: 50, s: 100 },
  kd: { src: 'photos/kd.jpg', x: 50, y: 50, s: 100 },
  pv: { src: 'photos/pv.jpg', x: 50, y: 50, s: 100 },
  ls: { src: 'photos/ls.jpg', x: 50, y: 50, s: 100 },
  ad: { src: 'photos/ad.jpg', x: 50, y: 50, s: 100 },
  ol: { src: 'photos/ol.jpg', x: 50, y: 50, s: 100 },
  ac: { src: 'photos/ac.jpg', x: 50, y: 50, s: 100 },
  au: { src: 'photos/au.jpg', x: 50, y: 50, s: 100 },
  s1: { src: 'photos/s1.jpg', x: 50, y: 50, s: 100 },
  s2: { src: 'photos/s2.jpg', x: 50, y: 50, s: 100 },
  mk: { src: 'photos/mk.jpg', x: 50, y: 50, s: 100 },
  nk: { src: 'photos/nk.jpg', x: 50, y: 50, s: 100 }, // Nitin K. — the sample customer
  ab: { src: 'photos/ab.jpg', x: 50, y: 50, s: 100 },
  hs: { src: 'photos/hs.jpg', x: 50, y: 50, s: 100 }, // Sikh man (Punjab screens)
  gp: { src: 'photos/gp.jpg', x: 50, y: 50, s: 100 }, // Punjabi woman with dupatta
} as const;
export type Face = keyof typeof faces;
export const faceIds = Object.keys(faces) as Face[];
