/**
 * A tiny stack navigator for the prototype. It has no native dependencies, so the
 * screens run in Storybook (react-native-web) and can later be moved onto
 * React Navigation with the same route names.
 *
 *   <NavProvider routes={customerRoutes} initial="home" initialState={{...}}>
 *     <NavOutlet />
 *   </NavProvider>
 *
 *   const nav = useNav();  nav.push('chores', { service: 'general' }); nav.back(); nav.reset('home');
 *   const [state, set] = useAppState<CustomerState>();  set({ minutes: 60 });
 */
import React, { useCallback, useMemo, useState } from 'react';
import { NavCtx, StateCtx } from './context';
import { NavOutlet } from './NavOutlet';
import type { NavValue, Route, RouteMap } from './types';

export function NavProvider({ routes, initial, initialState = {}, children, onRouteChange }: {
  routes: RouteMap; initial: string | Route; initialState?: Record<string, unknown>;
  children?: React.ReactNode; onRouteChange?: (r: Route) => void;
}) {
  const first = typeof initial === 'string' ? { name: initial } : initial;
  const [stack, setStack] = useState<Route[]>([first]);
  const [state, setState] = useState<Record<string, unknown>>(initialState);
  const [toastMsg, setToast] = useState<string | null>(null);

  const go = useCallback((next: Route[]) => { setStack(next); onRouteChange?.(next[next.length - 1]); }, [onRouteChange]);
  const warnMissing = (name: string) => { if (!routes[name]) { setToast(`“${name}” is not in this prototype yet`); setTimeout(() => setToast(null), 1800); return true; } return false; };

  const value = useMemo<NavValue>(() => ({
    route: stack[stack.length - 1],
    stack,
    push: (name, params) => { if (!warnMissing(name)) go([...stack, { name, params }]); },
    replace: (name, params) => { if (!warnMissing(name)) go([...stack.slice(0, -1), { name, params }]); },
    back: () => { if (stack.length > 1) go(stack.slice(0, -1)); },
    reset: (name, params) => { if (!warnMissing(name)) go([{ name, params }]); },
    canGoBack: stack.length > 1,
    has: (name) => !!routes[name],
    toast: (msg) => { setToast(msg); setTimeout(() => setToast(null), 1800); },
    toastMsg,
  }), [stack, routes, go, toastMsg]);

  const st = useMemo<[any, (p: any) => void]>(() => [state, (patch) => setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }))], [state]);

  return (
    <NavCtx.Provider value={value}>
      <StateCtx.Provider value={st}>
        {children ?? <NavOutlet routes={routes} />}
      </StateCtx.Provider>
    </NavCtx.Provider>
  );
}
