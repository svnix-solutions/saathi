/**
 * Saathi Admin (React DOM): router + session + layout around the page table.
 *
 * A page is a component that renders the content of `.main` (the top bar is added for you):
 *
 *   export function DashboardPage() {
 *     const { go, toast } = useAdmin();
 *     return <>
 *       <PageHead title="Dashboard" sub="Monday 16 November · Zone: all" actions={<Button variant="outline">Download</Button>} />
 *       ...
 *     </>;
 *   }
 */
import React, { useMemo, useState } from 'react';
import { Sprite, Toast } from './ui';
import { AdminLayout, Sidebar, TopBar } from './layout';
import { useAdminRouter, type PageMap, type PageParams } from './navigation';
import { AdminContext, defaultSession, rolesCanOpen, type AdminCtx, type Session } from './session';

export type AdminAppProps = {
  pages: PageMap;
  /** First page after sign-in. */
  initial?: string;
  initialParams?: PageParams;
  /** Signed-in person (default: Admin, Owner, all zones). */
  session?: Session;
  /** `false` starts on the full-screen `login` page. */
  signedIn?: boolean;
};

/** The clickable admin panel. */
export function AdminApp({ pages, initial = 'dashboard', initialParams = {}, session: initialSession, signedIn = true }: AdminAppProps) {
  const [msg, setMsg] = useState<string | null>(null);
  const [session, setSession] = useState<Session>(initialSession ?? { ...defaultSession, roles: [...defaultSession.roles], zones: [...defaultSession.zones] });
  const router = useAdminRouter(pages, { page: signedIn ? initial : 'login', params: initialParams }, (page) => {
    setMsg(`“${page}” is not in this prototype yet`); setTimeout(() => setMsg(null), 1800);
  });
  const cur = router.current;

  const ctx = useMemo<AdminCtx>(() => ({
    page: cur.page, params: cur.params,
    go: router.go,
    back: router.back,
    toast: (m) => { setMsg(m); setTimeout(() => setMsg(null), 2000); },
    roles: session.roles, zones: session.zones,
    setSession,
    signOut: () => router.reset('login'),
    has: router.has,
    canOpen: (s) => rolesCanOpen(session.roles, s),
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [cur, pages, session]);

  const def = pages[cur.page];
  const Page = def?.component;
  const fullScreen = cur.page === 'login';

  return (
    <AdminContext.Provider value={ctx}>
      <div className="sa">
        <Sprite />
        {fullScreen && Page ? <Page params={cur.params} /> : (
          <AdminLayout
            sidebar={<Sidebar section={def?.section} page={cur.page} name={session.name} face={session.face} roles={session.roles}
              canOpen={ctx.canOpen} has={ctx.has} go={ctx.go} signOut={ctx.signOut} />}
            topBar={<TopBar title={def?.title ?? cur.page} zones={session.zones} face={session.face} onBell={() => ctx.go('dashboard')} />}>
            {Page ? <Page key={cur.page + JSON.stringify(cur.params)} params={cur.params} /> : <div className="card">Page “{cur.page}” is not built yet.</div>}
          </AdminLayout>
        )}
        <Toast msg={msg} />
      </div>
    </AdminContext.Provider>
  );
}
