import React from 'react';

/** The Saathi logo mark (green rounded square, white S, yellow sparkle). Needs `<Sprite>` on the page. */
export const Mark = ({ size = 28 }: { /** Width and height in px. */ size?: number }) => (
  <svg width={size} height={size} aria-hidden="true"><use href="#mark" /></svg>
);
