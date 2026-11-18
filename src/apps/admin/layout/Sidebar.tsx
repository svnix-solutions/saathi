import React from 'react';
import { Av, I, Mark } from '../ui';
import { menu as defaultMenu, type MenuGroup } from '../navigation/menu';
import type { Section } from '../navigation/types';

export type SidebarProps = {
  /** Section of the open page (its item is highlighted and its sub-pages are listed). */
  section?: Section;
  /** Open page name (highlights a sub-page). */
  page: string;
  /** Signed-in person shown at the bottom. */
  name: string;
  face: string;
  roles: string[];
  /** Hide items the signed-in roles cannot open. */
  canOpen: (s: Section) => boolean;
  /** Hide sub-pages that are not in this prototype. */
  has: (page: string) => boolean;
  go: (page: string) => void;
  signOut: () => void;
  menu?: MenuGroup[];
};

/** Dark green sidebar: logo, grouped menu filtered by role, signed-in person (click to sign out). */
export function Sidebar({ section, page, name, face, roles, canOpen, has, go, signOut, menu = defaultMenu }: SidebarProps) {
  return (
    <aside className="side">
      <div className="logo"><Mark />Saathi</div>
      {menu.map((g) => {
        const items = g.items.filter((it) => canOpen(it.key));
        if (!items.length) return null;
        return (
          <React.Fragment key={g.group}>
            <div className="sg">{g.group}</div>
            {items.map((it) => (
              <div key={it.key} role="link" tabIndex={0} className={`nav ${section === it.key ? 'on' : ''}`}
                onClick={() => go(it.home)} onKeyDown={(e) => e.key === 'Enter' && go(it.home)}>
                <I n={it.icon} /><span className="lbl">{it.label}</span>
                {it.badge && <span className="nb" style={it.badgeRed ? { background: '#ffb4ab' } : undefined}>{it.badge}</span>}
              </div>
            )).flatMap((el, i) => {
              const it = items[i];
              if (section !== it.key || !it.subs) return [el];
              return [el, ...it.subs.filter((sp) => has(sp.page)).map((sp) => (
                <div key={sp.page} role="link" tabIndex={0} className={`nav sub ${page === sp.page ? 'on' : ''}`}
                  onClick={() => go(sp.page)} onKeyDown={(e) => e.key === 'Enter' && go(sp.page)}>
                  <span className="lbl">{sp.label}</span>
                </div>
              ))];
            })}
          </React.Fragment>
        );
      })}
      <div className="nav end clk" style={{ fontWeight: 400, background: '#0b5d4b' }} onClick={signOut} title="Sign out">
        <Av sm face={face} />
        <div style={{ lineHeight: 1.25 }}><b style={{ color: '#fff' }}>{name}</b><div style={{ fontSize: 10.5 }}>{roles.join(' + ')}</div></div>
      </div>
    </aside>
  );
}
