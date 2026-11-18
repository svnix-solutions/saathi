import { useContext } from 'react';
import { NavCtx } from './context';
import type { NavValue } from './types';

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

/**
 * A back action that falls back to `fallback` (reset) when the screen was opened on its own
 * and there is no history. Was `useBack` in customer/v2b/kit.
 */
export function useBack(fallback = 'home') {
  const nav = useNav();
  return () => (nav.canGoBack ? nav.back() : nav.reset(fallback));
}
