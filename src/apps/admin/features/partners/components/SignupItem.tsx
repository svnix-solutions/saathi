import React from 'react';
import { Tag } from '../../../ui';
import { signupSteps, type Signup } from '../data';

export type SignupItemProps = {
  signup: Signup;
  /** Drawn with the green "selected" border. */
  selected: boolean;
  onPick: (id: string) => void;
};

/** One sign-up in the left-hand queue: name, wait or progress tag, zone and note. */
export function SignupItem({ signup: s, selected, onPick }: SignupItemProps) {
  const dim = s.status !== 'check';
  return (
    <div className={`card clk ${selected ? 'sel' : ''} prt-compact`} style={dim && !selected ? { opacity: .7 } : undefined} onClick={() => onPick(s.id)}>
      <div className="row"><b>{s.name}</b>
        {s.status === 'check' ? <Tag tone={s.late ? 'r' : 'y'}>{s.wait}</Tag>
          : s.status === 'filling' ? <Tag tone="x">{signupSteps[s.id] ?? 'Filling in'}</Tag>
            : s.status === 'approved' ? <Tag tone="g">Approved</Tag>
              : s.status === 'rejected' ? <Tag tone="r">Rejected</Tag> : <Tag>Sent back</Tag>}
      </div>
      <div className="s m">{s.zone} · {s.note}</div>
    </div>
  );
}
