import { useContext } from 'react';
import { StateCtx } from './context';

/** The prototype-wide app state kept by the NavProvider: `const [st, set] = useAppState<S>(); set({ x: 1 })`. */
export function useAppState<S extends Record<string, unknown>>(): [S, (patch: Partial<S> | ((s: S) => Partial<S>)) => void] {
  return useContext(StateCtx) as [S, (patch: Partial<S> | ((s: S) => Partial<S>)) => void];
}
