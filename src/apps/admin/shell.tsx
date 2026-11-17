/**
 * Saathi Admin — React (DOM) shell: sprite icons, router, sidebar, top bar, modal and toast.
 *
 * Pages register in ./pages/*.tsx (one file per agent area) and are merged in ./routes.ts.
 * A page is a component that renders the content of `.main` (the top bar is added for you):
 *
 *   export function Dashboard() {
 *     const { go, toast } = useAdmin();
 *     return <>
 *       <PageHead title="Dashboard" sub="Monday 16 November · Zone: all" actions={<button className="btn o">Download</button>} />
 *       ...
 *     </>;
 *   }
 */
import React, { createContext, useContext, useMemo, useState } from 'react';
import './admin.css';

/* ---------------- icons (same 22 shapes as the apps) ---------------- */
export type IconName =
  | 'sparkle' | 'drop' | 'dish' | 'shirt' | 'clock' | 'home' | 'list' | 'user' | 'pin' | 'call' | 'check' | 'star'
  | 'wallet' | 'bolt' | 'back' | 'shield' | 'mic' | 'cam' | 'bell' | 'find' | 'key' | 'mark' | 'close' | 'chevron' | 'plus';

export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="sparkle" viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 16v4M17 18h4" /></symbol>
      <symbol id="drop" viewBox="0 0 24 24"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" /></symbol>
      <symbol id="dish" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></symbol>
      <symbol id="shirt" viewBox="0 0 24 24"><path d="M8 4l4 2 4-2 4 3-2 3-2-1v11H8V9l-2 1-2-3z" /></symbol>
      <symbol id="clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></symbol>
      <symbol id="home" viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" /></symbol>
      <symbol id="list" viewBox="0 0 24 24"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" /></symbol>
      <symbol id="user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 4.5-5 8-5s6.5 1 8 5" /></symbol>
      <symbol id="pin" viewBox="0 0 24 24"><path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></symbol>
      <symbol id="call" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z" /></symbol>
      <symbol id="check" viewBox="0 0 24 24"><path d="M5 12l5 5 9-10" /></symbol>
      <symbol id="star" viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z" /></symbol>
      <symbol id="wallet" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M16 12.5h2" /></symbol>
      <symbol id="bolt" viewBox="0 0 24 24"><path d="M13 2L5 13h6l-1 9 8-12h-6z" /></symbol>
      <symbol id="back" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></symbol>
      <symbol id="shield" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M12 8v5M12 16h.01" /></symbol>
      <symbol id="mic" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></symbol>
      <symbol id="cam" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="3" /><circle cx="12" cy="13.5" r="3.5" /><path d="M8 7l1.5-3h5L16 7" /></symbol>
      <symbol id="bell" viewBox="0 0 24 24"><path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21a2 2 0 0 0 4 0" /></symbol>
      <symbol id="find" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></symbol>
      <symbol id="key" viewBox="0 0 24 24"><circle cx="8" cy="15" r="4" /><path d="M11 12l8-8M16 7l3 3" /></symbol>
      <symbol id="close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></symbol>
      <symbol id="chevron" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></symbol>
      <symbol id="plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></symbol>
      <symbol id="mark" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#0b5d4b" /><path d="M41 21c-2-3-5.5-4.5-9.5-4.5-5.5 0-9.5 3-9.5 7.5 0 9.5 20 6 20 16 0 5-4.5 8-10.5 8-4.5 0-8.5-2-10.5-5.5" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M48 8l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z" fill="#ffc93c" /></symbol>
    </svg>
  );
}

/** `<I n="home" />` = the design's `<svg class="i"><use href="#home"/></svg>`. `f` = filled. */
export const I = ({ n, f, style, className = '' }: { n: IconName; f?: boolean; style?: React.CSSProperties; className?: string }) => (
  <svg className={`i ${f ? 'f' : ''} ${className}`} style={style} aria-hidden="true"><use href={`#${n}`} /></svg>
);
export const Mark = ({ size = 28 }: { size?: number }) => <svg width={size} height={size} aria-hidden="true"><use href="#mark" /></svg>;

/**
 * Avatar. `face` is one of the design's f-xx face ids (sd, nk, ms, ap, rg, fa, pn, st, rv, ak, kd, gk, mt, pv, ls,
 * ad, ol, ac, au, s1, s2, mk, ab, rm, kr). Without a face it shows initials on yellow.
 */
export const Av = ({ face, initials, sm, size, style }: { face?: string; initials?: string; sm?: boolean; size?: number; style?: React.CSSProperties }) => (
  <span className={`av ${sm ? 'sm' : ''} ${face ? 'f-' + face : ''}`} style={{ ...(size ? { width: size, height: size } : {}), ...style }}>{initials}</span>
);

export type TagTone = 'y' | 'g' | 'n' | 'x' | 'r';
export const Tag = ({ tone = 'y', children, style }: { tone?: TagTone; children: React.ReactNode; style?: React.CSSProperties }) => (
  <span className={`tag ${tone === 'y' ? '' : tone}`} style={style}>{children}</span>
);

export const Toggle = ({ on, onChange }: { on: boolean; onChange?: (v: boolean) => void }) => (
  <span role="switch" aria-checked={on} tabIndex={0} className={`tog ${on ? '' : 'off'} clk`} onClick={() => onChange?.(!on)}
    onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange?.(!on); } }}><span /></span>
);

export const Check = ({ on, onChange }: { on: boolean; onChange?: (v: boolean) => void }) => (
  <span role="checkbox" aria-checked={on} tabIndex={0} className={`cb ${on ? 'on' : ''} clk`} onClick={() => onChange?.(!on)}>{on && <I n="check" />}</span>
);

/** KPI card with optional sparkline points (0–1 values). */
export function Kpi({ label, value, sub, red, spark, onClick }: { label: string; value: React.ReactNode; sub?: string; red?: boolean; spark?: number[]; onClick?: () => void }) {
  const pts = spark?.map((v, i) => `${(i / (spark.length - 1)) * 64},${26 - v * 24}`).join(' ');
  return (
    <div className={`card kpi ${onClick ? 'clk' : ''}`} style={red ? { borderColor: 'var(--red)' } : undefined} onClick={onClick}>
      <div className={red ? '' : 'm'} style={red ? { color: 'var(--red)', fontWeight: 600 } : undefined}>{label}</div>
      <div className="stat">{value} {sub && <span className="m" style={{ fontSize: 13, fontWeight: 400 }}>{sub}</span>}</div>
      {pts && <svg className="spark" viewBox="0 0 64 26"><polyline points={pts} /></svg>}
    </div>
  );
}

/** Title row under the top bar. */
export const PageHead = ({ title, sub, actions, back }: { title: string; sub?: React.ReactNode; actions?: React.ReactNode; back?: () => void }) => (
  <div className="row">
    <div className="lft" style={{ gap: 10 }}>
      {back && <span className="ic clk" onClick={back} role="button" aria-label="Back"><I n="back" /></span>}
      <div><div className="h" style={{ fontSize: 22 }}>{title}</div>{sub && <div className="m">{sub}</div>}</div>
    </div>
    {actions && <div className="lft" style={{ gap: 8 }}>{actions}</div>}
  </div>
);

/** Filter tabs inside a card header ("All · Now · Scheduled · Problems"). */
export function Tabs<K extends string>({ items, value, onChange }: { items: { key: K; label: string }[]; value: K; onChange: (k: K) => void }) {
  return (
    <div className="lft s tabsel">
      {items.map((it) => it.key === value
        ? <span key={it.key} className="tag n">{it.label}</span>
        : <span key={it.key} className="m" onClick={() => onChange(it.key)}>{it.label}</span>)}
    </div>
  );
}

export const Pager = ({ text = 'Page 1 of 3 · 7 rows per page' }: { text?: string }) => (
  <div className="pg"><span>{text}</span><span><span>‹</span><b>1</b><span>2</span><span>3</span><span>›</span></span></div>
);

export const Bar = ({ pct, red }: { pct: number; red?: boolean }) => (
  <div style={{ height: 7, borderRadius: 4, background: 'var(--mint)' }}><div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: red ? 'var(--red)' : 'var(--green)' }} /></div>
);

export function Modal({ open, onClose, title, children, actions }: { open: boolean; onClose: () => void; title: string; children?: React.ReactNode; actions?: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" role="dialog" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="row"><div className="h" style={{ fontSize: 18 }}>{title}</div><span className="clk m" onClick={onClose} aria-label="Close"><I n="close" /></span></div>
        {children}
        {actions && <div className="lft" style={{ justifyContent: 'flex-end', gap: 8 }}>{actions}</div>}
      </div>
    </div>
  );
}

/* ---------------- navigation ---------------- */
export type Section =
  | 'dashboard' | 'bookings' | 'live' | 'safety' | 'automation'
  | 'partners' | 'customers' | 'ratings'
  | 'pricing' | 'payouts' | 'campaigns' | 'support' | 'team';

export const menu: { group: string; items: { key: Section; label: string; icon: IconName; home: string; badge?: number; badgeRed?: boolean }[] }[] = [
  { group: 'Operations', items: [
    { key: 'dashboard', label: 'Dashboard', icon: 'home', home: 'dashboard' },
    { key: 'bookings', label: 'Bookings', icon: 'list', home: 'bookings', badge: 2 },
    { key: 'live', label: 'Live map', icon: 'pin', home: 'live' },
    { key: 'safety', label: 'Safety', icon: 'shield', home: 'safety', badge: 1, badgeRed: true },
    { key: 'automation', label: 'Automation', icon: 'bolt', home: 'smart' },
  ] },
  { group: 'People', items: [
    { key: 'partners', label: 'Partners', icon: 'shield', home: 'partners' },
    { key: 'customers', label: 'Customers', icon: 'user', home: 'customers' },
    { key: 'ratings', label: 'Ratings', icon: 'star', home: 'ratings' },
  ] },
  { group: 'Business', items: [
    { key: 'pricing', label: 'Pricing & zones', icon: 'sparkle', home: 'services' },
    { key: 'payouts', label: 'Payouts', icon: 'wallet', home: 'payouts' },
    { key: 'campaigns', label: 'Campaigns', icon: 'bell', home: 'campaigns' },
    { key: 'support', label: 'Support', icon: 'call', home: 'support', badge: 5 },
    { key: 'team', label: 'Team', icon: 'key', home: 'team' },
  ] },
];

export type PageDef = {
  /** sidebar item highlighted while this page is open */
  section: Section;
  /** breadcrumb label in the top bar */
  title: string;
  component: React.ComponentType<{ params: Record<string, any> }>;
};
export type PageMap = Record<string, PageDef>;

export type Role = 'Owner' | 'Operations' | 'Support' | 'Finance' | 'Partner team';

type AdminCtx = {
  page: string;
  params: Record<string, any>;
  go: (page: string, params?: Record<string, any>) => void;
  back: () => void;
  toast: (msg: string) => void;
  /** Roles of the signed-in staff member (the "Role view" page signs in as Support). */
  roles: Role[];
  zones: string[];
  setSession: (s: { roles: Role[]; zones: string[]; name: string; face: string }) => void;
  signOut: () => void;
  has: (page: string) => boolean;
};
const Ctx = createContext<AdminCtx | null>(null);

export function useAdmin(): AdminCtx {
  const v = useContext(Ctx);
  if (v) return v;
  const noop = () => {};
  return { page: '', params: {}, go: noop, back: noop, toast: noop, roles: ['Owner'], zones: ['All zones'], setSession: noop, signOut: noop, has: () => false };
}

/** Which sidebar sections each role can open (Owner sees everything). */
export const roleSections: Record<Role, Section[] | 'all'> = {
  Owner: 'all',
  Operations: ['dashboard', 'bookings', 'live', 'safety', 'automation', 'partners', 'customers', 'ratings'],
  Support: ['dashboard', 'bookings', 'safety', 'customers', 'support'],
  Finance: ['dashboard', 'payouts', 'pricing'],
  'Partner team': ['dashboard', 'partners', 'ratings', 'live'],
};

export function AdminApp({ pages, initial = 'dashboard', initialParams = {}, session: initialSession, signedIn = true }: {
  pages: PageMap; initial?: string; initialParams?: Record<string, any>;
  session?: { roles: Role[]; zones: string[]; name: string; face: string }; signedIn?: boolean;
}) {
  const [hist, setHist] = useState<{ page: string; params: Record<string, any> }[]>([{ page: signedIn ? initial : 'login', params: initialParams }]);
  const [msg, setMsg] = useState<string | null>(null);
  const [session, setSession] = useState(initialSession ?? { roles: ['Owner'] as Role[], zones: ['All zones'], name: 'Admin', face: 'ad' });
  const cur = hist[hist.length - 1];
  const allowed = (s: Section) => session.roles.some((r) => roleSections[r] === 'all' || (roleSections[r] as Section[]).includes(s));

  const ctx = useMemo<AdminCtx>(() => ({
    page: cur.page, params: cur.params,
    go: (page, params = {}) => {
      if (!pages[page]) { setMsg(`“${page}” is not in this prototype yet`); setTimeout(() => setMsg(null), 1800); return; }
      setHist((h) => [...h, { page, params }]);
      document.querySelector('.sa .main')?.scrollTo(0, 0);
    },
    back: () => setHist((h) => (h.length > 1 ? h.slice(0, -1) : h)),
    toast: (m) => { setMsg(m); setTimeout(() => setMsg(null), 2000); },
    roles: session.roles, zones: session.zones,
    setSession,
    signOut: () => setHist([{ page: 'login', params: {} }]),
    has: (p) => !!pages[p],
  }), [cur, pages, session]);

  const def = pages[cur.page];
  const Page = def?.component;
  const fullScreen = cur.page === 'login';

  return (
    <Ctx.Provider value={ctx}>
      <div className="sa">
        <Sprite />
        {fullScreen && Page ? <Page params={cur.params} /> : (
          <div className="win app">
            <aside className="side">
              <div className="logo"><Mark />Saathi</div>
              {menu.map((g) => {
                const items = g.items.filter((it) => allowed(it.key));
                if (!items.length) return null;
                return (
                  <React.Fragment key={g.group}>
                    <div className="sg">{g.group}</div>
                    {items.map((it) => (
                      <div key={it.key} role="link" tabIndex={0} className={`nav ${def?.section === it.key ? 'on' : ''}`}
                        onClick={() => ctx.go(it.home)} onKeyDown={(e) => e.key === 'Enter' && ctx.go(it.home)}>
                        <I n={it.icon} /><span className="lbl">{it.label}</span>
                        {it.badge && <span className="nb" style={it.badgeRed ? { background: '#ffb4ab' } : undefined}>{it.badge}</span>}
                      </div>
                    ))}
                  </React.Fragment>
                );
              })}
              <div className="nav end clk" style={{ fontWeight: 400, background: '#0b5d4b' }} onClick={ctx.signOut} title="Sign out">
                <Av sm face={session.face} />
                <div style={{ lineHeight: 1.25 }}><b style={{ color: '#fff' }}>{session.name}</b><div style={{ fontSize: 10.5 }}>{session.roles.join(' + ')}</div></div>
              </div>
            </aside>
            <main className="main">
              <div className="tb">
                <div className="lft s m">Saathi<span>/</span><b style={{ color: 'var(--ink)' }}>{def?.title ?? cur.page}</b></div>
                <div className="lft" style={{ gap: 10 }}>
                  <div className="tbs"><I n="find" />Search bookings, people, areas</div>
                  <span className="tag n">{session.zones.join(', ')}</span>
                  <span className="bell clk" onClick={() => ctx.go('dashboard')}><I n="bell" /><i /></span>
                  <Av sm face={session.face} />
                </div>
              </div>
              {Page ? <Page key={cur.page + JSON.stringify(cur.params)} params={cur.params} /> : <div className="card">Page “{cur.page}” is not built yet.</div>}
            </main>
          </div>
        )}
        {msg && <div className="toast">{msg}</div>}
      </div>
    </Ctx.Provider>
  );
}
