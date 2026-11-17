import React from 'react';
import { NavProvider, Phone, ThemeProvider, useAppState, useNav, type ThemeState } from '@/native/ui';
import { partnerRoutes } from './routes';
import { initialPartnerState, type PartnerState } from './chrome';

export * from './chrome';

/** The whole partner app inside a phone frame. Hindi is the partners' starting language. */
export function PartnerApp({ initial = 'signin.phone', params, state, caption, sub, ...theme }: Partial<ThemeState> & {
  initial?: string; params?: Record<string, unknown>; state?: Partial<PartnerState>; caption?: string; sub?: string;
}) {
  return (
    <NavProvider routes={partnerRoutes} initial={{ name: initial, params }} initialState={{ ...initialPartnerState, ...state }}>
      <Phone caption={caption} sub={sub} {...theme}>
        <Outlet />
      </Phone>
    </NavProvider>
  );
}

function Outlet() {
  const nav = useNav();
  const [st] = useAppState<PartnerState>();
  const S = partnerRoutes[nav.route.name];
  // A language picked inside the app (sign-in or Help) applies to every screen, not only v1.
  return S ? <ThemeProvider locale={st.locale}><S params={nav.route.params ?? {}} /></ThemeProvider> : null;
}
