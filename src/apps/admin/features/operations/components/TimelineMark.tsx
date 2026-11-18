import React from 'react';
import { I } from '../../../ui';
import type { StepKind } from '../data';

/** Box in front of a "What happened" line: green tick (done), red outline (failed), yellow (still waiting). */
export function TimelineMark({ kind }: { kind: StepKind }) {
  if (kind === 'ok') return <span className="cb on"><I n="check" /></span>;
  return <span className={`cb ${kind === 'bad' ? 'ops-mark-bad' : 'ops-mark-wait'}`} />;
}
