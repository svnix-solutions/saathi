import React from 'react';
import { Tag } from '../../../ui';
import type { Grant } from '../data';

export type RoleTagsProps = {
  /** Role name → grant. A grant with `until` is a cover role and shows its end date. */
  roles: Record<string, Grant>;
};

/** A person's roles as tags: Owner green, Viewer grey, cover roles yellow with the end date, others mint. */
export function RoleTags({ roles }: RoleTagsProps) {
  return <>{Object.entries(roles).map(([r, g], i) => (
    <React.Fragment key={r}>{i > 0 && ' '}
      {g.until ? <Tag>{r} · till {g.until}</Tag>
        : <Tag tone={r === 'Owner' ? 'g' : r === 'Viewer' ? 'x' : 'n'}>{r}</Tag>}
    </React.Fragment>))}</>;
}
