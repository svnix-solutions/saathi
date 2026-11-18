import React from 'react';

/** Face ids drawn by the stylesheet (`.f-xx`): customers, partners and staff from the design. */
export type AvatarFace =
  | 'sd' | 'nk' | 'ms' | 'ap' | 'rg' | 'fa' | 'pn' | 'st' | 'rv' | 'ak' | 'kd' | 'gk' | 'mt' | 'pv' | 'ls'
  | 'ad' | 'ol' | 'ac' | 'au' | 's1' | 's2' | 'mk' | 'ab' | 'rm' | 'kr';

export const avatarFaces: AvatarFace[] = [
  'sd', 'nk', 'ms', 'ap', 'rg', 'fa', 'pn', 'st', 'rv', 'ak', 'kd', 'gk', 'mt', 'pv', 'ls',
  'ad', 'ol', 'ac', 'au', 's1', 's2', 'mk', 'ab', 'rm', 'kr',
];

export type AvatarProps = {
  /** One of the design's face ids (see `AvatarFace`). Without a face the avatar shows `initials` on yellow. */
  face?: AvatarFace | (string & {});
  /** Shown when there is no face. */
  initials?: string;
  /** Small (26 px) instead of 40 px. */
  sm?: boolean;
  /** Explicit width and height in px (overrides `sm`). */
  size?: number;
  style?: React.CSSProperties;
};

/** Round person avatar (`.av`). */
export const Av = ({ face, initials, sm, size, style }: AvatarProps) => (
  <span className={`av ${sm ? 'sm' : ''} ${face ? 'f-' + face : ''}`} style={{ ...(size ? { width: size, height: size } : {}), ...style }}>{initials}</span>
);

/** Long name for `Av`. */
export const Avatar = Av;
