/** Faces (`.av.f-xx`): flat 2D drawings from scripts/art/make-2d.mjs. Each named person in the sample data has one. */
export const faces = {
  sd: { src: '2d/sd.svg', x: 50, y: 30, s: 135 }, // Sunita D. — the hero helper
  rm: { src: '2d/rm.svg', x: 50, y: 30, s: 135 },
  kr: { src: '2d/kr.svg', x: 50, y: 30, s: 135 },
  gk: { src: '2d/gk.svg', x: 50, y: 30, s: 135 },
  mt: { src: '2d/mt.svg', x: 50, y: 30, s: 135 },
  ms: { src: '2d/ms.svg', x: 50, y: 30, s: 135 },
  ap: { src: '2d/ap.svg', x: 50, y: 30, s: 135 },
  rg: { src: '2d/rg.svg', x: 50, y: 30, s: 135 },
  fa: { src: '2d/fa.svg', x: 50, y: 30, s: 135 },
  pn: { src: '2d/pn.svg', x: 50, y: 30, s: 135 },
  st: { src: '2d/st.svg', x: 50, y: 30, s: 135 },
  rv: { src: '2d/rv.svg', x: 50, y: 30, s: 135 },
  ak: { src: '2d/ak.svg', x: 50, y: 30, s: 135 },
  kd: { src: '2d/kd.svg', x: 50, y: 30, s: 135 },
  pv: { src: '2d/pv.svg', x: 50, y: 30, s: 135 },
  ls: { src: '2d/ls.svg', x: 50, y: 30, s: 135 },
  ad: { src: '2d/ad.svg', x: 50, y: 30, s: 135 },
  ol: { src: '2d/ol.svg', x: 50, y: 30, s: 135 },
  ac: { src: '2d/ac.svg', x: 50, y: 30, s: 135 },
  au: { src: '2d/au.svg', x: 50, y: 30, s: 135 },
  s1: { src: '2d/s1.svg', x: 50, y: 30, s: 135 },
  s2: { src: '2d/s2.svg', x: 50, y: 30, s: 135 },
  mk: { src: '2d/mk.svg', x: 50, y: 30, s: 135 },
  nk: { src: '2d/nk.svg', x: 50, y: 30, s: 135 }, // Nitin K. — the sample customer
  ab: { src: '2d/ab.svg', x: 50, y: 30, s: 135 },
  hs: { src: '2d/hs.svg', x: 50, y: 30, s: 135 }, // Sikh man (Punjab screens)
  gp: { src: '2d/gp.svg', x: 50, y: 30, s: 135 }, // Punjabi woman with dupatta
} as const;
export type Face = keyof typeof faces;
export const faceIds = Object.keys(faces) as Face[];
