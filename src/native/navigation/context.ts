import { createContext } from 'react';
import type { NavValue } from './types';

export const NavCtx = createContext<NavValue | null>(null);
export const StateCtx = createContext<[any, (patch: any) => void]>([{}, () => {}]);
