import type React from 'react';

export type Route = { name: string; params?: Record<string, unknown> };
export type ScreenProps<P = Record<string, unknown>> = { params: P };
// Each screen declares its own params type, so the map accepts any of them.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RouteMap = Record<string, React.ComponentType<ScreenProps<any>>>;

export type NavValue = {
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
