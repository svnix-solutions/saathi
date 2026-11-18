import React from 'react';

/**
 * The icon sprite: one hidden `<svg>` with a `<symbol>` per icon (the same 22 shapes as the apps, plus the Saathi
 * mark). Render it once inside `.sa`; `<Icon>` and `<Mark>` reference its symbols with `<use href="#name">`.
 */
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
