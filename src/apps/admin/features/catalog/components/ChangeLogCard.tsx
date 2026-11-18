import React from 'react';
import type { ChangeLogEntry } from '../data';
import '../catalog.css';

/** "Who changed what": the latest six changes by the team, newest first. */
export function ChangeLogCard({ log }: { log: ChangeLogEntry[] }) {
  return (
    <div className="card cat-fill">
      <div className="h2 cat-title-gap">Who changed what</div>
      <div className="cat-log s">
        {log.slice(0, 6).map((l, i) => <React.Fragment key={i}>{i > 0 && <div className="hr" />}<div><b>{l.who}</b> {l.what}<div className="m">{l.when}</div></div></React.Fragment>)}
      </div>
    </div>
  );
}

export default ChangeLogCard;
