import React from 'react';
import { Av } from '../../../ui';
import { roleLabel } from '../data';
import { useCare } from '../state';

/** Small avatar + name of a nurse or physio; `sub` adds the role under the name. */
export function StaffCell({ id, sub }: { id: string; sub?: boolean }) {
  const s = useCare((st) => st.staff.find((x) => x.id === id));
  if (!s) return <span className="m">Not assigned</span>;
  return (
    <span className="lft care-nowrap">
      <Av sm initials={s.initials} />
      <span><b>{s.name}</b>{sub && <div className="s m care-sub">{roleLabel[s.role]}</div>}</span>
    </span>
  );
}
