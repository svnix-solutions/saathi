import React from 'react';

export type AdminLayoutProps = {
  /** Usually `<Sidebar>`. */
  sidebar: React.ReactNode;
  /** Usually `<TopBar>`. */
  topBar: React.ReactNode;
  /** The page content. */
  children: React.ReactNode;
};

/** Full-window frame: sidebar on the left, scrolling `.main` with the top bar and the page on the right. */
export const AdminLayout = ({ sidebar, topBar, children }: AdminLayoutProps) => (
  <div className="win app">
    {sidebar}
    <main className="main">
      {topBar}
      {children}
    </main>
  </div>
);
