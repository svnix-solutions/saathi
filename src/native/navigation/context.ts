import { createContext } from 'react';
import type { NavValue } from './types';

export const NavCtx = createContext<NavValue | null>(null);
export type AppState = Record<string, unknown>;
/** A partial state, or a function of the current state that returns one. */
export type StatePatch = AppState | ((s: AppState) => AppState);
export const StateCtx = createContext<[AppState, (patch: StatePatch) => void]>([{}, () => {}]);
