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
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { View } from 'react-native';

export type Route = { name: string; params?: Record<string, unknown> };
export type ScreenProps<P = Record<string, unknown>> = { params: P };
export type RouteMap = Record<string, React.ComponentType<ScreenProps<any>>>;

type NavValue = {
  route: Route;
  stack: Route[];
  push: (name: string, params?: Record<string, unknown>) => void;
  replace: (name: string, params?: Record<string, unknown>) => void;
  back: () => void;
  /** Clear history and go to a route (e.g. after sign-in, or switching tabs). */
  reset: (name: string, params?: Record<string, unknown>) => void;
  canGoBack: boolean;
  has: (name: string) => boolean;
  toast: (msg: string) => void;
  toastMsg: string | null;
};

const NavCtx = createContext<NavValue | null>(null);
const StateCtx = createContext<[any, (patch: any) => void]>([{}, () => {}]);

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

/** Renders the current route's screen. */
export function NavOutlet({ routes }: { routes: RouteMap }) {
  const nav = useNav();
  const Screen = routes[nav.route.name];
  return <View style={{ flex: 1 }}>{Screen ? <Screen params={nav.route.params ?? {}} /> : null}</View>;
}

/**
 * Safe outside a NavProvider: in single-screen stories the calls do nothing,
 * so every screen can be rendered on its own.
 */
export function useNav(): NavValue {
  const v = useContext(NavCtx);
  if (v) return v;
  const noop = () => {};
  return { route: { name: '' }, stack: [], push: noop, replace: noop, back: noop, reset: noop, canGoBack: false, has: () => false, toast: noop, toastMsg: null };
}

export function useAppState<S extends Record<string, unknown>>(): [S, (patch: Partial<S> | ((s: S) => Partial<S>)) => void] {
  return useContext(StateCtx) as [S, (patch: Partial<S> | ((s: S) => Partial<S>)) => void];
}
