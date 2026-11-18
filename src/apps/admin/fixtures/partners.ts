/** Sample partners (prototype data only). Mutated through `fixtures/store.ts`. */
import type { PartnerStatus } from '../ui/StatusTag';

export type { PartnerStatus };
export type Partner = {
  id: string; name: string; face: string; area: string; status: PartnerStatus; rating?: number; jobs: number;
  docs: [boolean, boolean, boolean]; joined: string;
};

/** A fresh copy of the sample partners. */
export const initialPartners = (): Partner[] => [
  { id: 'sd', name: 'Sunita D.', face: 'sd', area: 'Block C', status: 'job', rating: 4.8, jobs: 19, docs: [true, true, true], joined: 'Oct 2026' },
  { id: 'rm', name: 'Rekha M.', face: 'rm', area: 'Sector 21', status: 'online', rating: 4.6, jobs: 22, docs: [true, true, true], joined: 'Sep 2026' },
  { id: 'kr', name: 'Kavita R.', face: 'kr', area: 'Sector 18', status: 'job', rating: 4.9, jobs: 17, docs: [true, true, true], joined: 'Sep 2026' },
  { id: 'ab', name: 'Anita B.', face: 'ab', area: 'Sector 21', status: 'offline', rating: 4.4, jobs: 11, docs: [true, true, true], joined: 'Oct 2026' },
  { id: 'pv', name: 'Pooja V.', face: 'pv', area: 'Block A', status: 'pending', jobs: 0, docs: [true, true, false], joined: 'Nov 2026' },
  { id: 'ls', name: 'Lata S.', face: 'ls', area: 'Block D', status: 'pending', jobs: 0, docs: [true, false, false], joined: 'Nov 2026' },
  { id: 'gk', name: 'Geeta K.', face: 'gk', area: 'Block C', status: 'suspended', rating: 3.1, jobs: 0, docs: [true, true, true], joined: 'Aug 2026' },
];
