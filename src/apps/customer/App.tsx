import React from 'react';
import { NavProvider, Phone, ThemeProvider, useAppState, useNav, type ThemeState } from '@/native/ui';
import { customerRoutes } from './routes';
import { initialCustomerState, type CustomerState } from './chrome';

export * from './chrome';

/** The whole customer app inside a phone frame, starting at `initial`. */
export function CustomerApp({ initial = 'signin.phone', params, state, caption, sub, ...theme }: Partial<ThemeState> & {
  initial?: string; params?: Record<string, unknown>; state?: Partial<CustomerState>; caption?: string; sub?: string;
}) {
  return (
    <NavProvider routes={customerRoutes} initial={{ name: initial, params }} initialState={{ ...initialCustomerState, ...state }}>
      <Phone caption={caption} sub={sub} {...theme}>
        <Outlet />
      </Phone>
    </NavProvider>
  );
}

function Outlet() {
  const nav = useNav();
  const [st] = useAppState<CustomerState>();
  const S = customerRoutes[nav.route.name];
  // A language picked inside the app (sign-up or Language screen) applies to every screen.
  return S ? <ThemeProvider locale={st.language}><S params={nav.route.params ?? {}} /></ThemeProvider> : null;
}
