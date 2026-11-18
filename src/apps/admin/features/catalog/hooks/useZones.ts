import { useState } from 'react';
import { useAdmin } from '../../../session';
import { initialChangeLog, initialOpeningChecks, initialZones, type Zone } from '../data';

/** Zones: open and pause them (with the Sector 34 opening checklist), tune one, add one, and the "who changed what" log. */
export function useZones() {
  const { toast } = useAdmin();
  const [zones, setZones] = useState(initialZones);
  const [log, setLog] = useState(initialChangeLog);
  const [checks, setChecks] = useState(initialOpeningChecks);
  /** Zone waiting for "Pause zone?" confirmation. */
  const [pause, setPause] = useState<Zone | null>(null);

  const record = (what: string) => setLog((l) => [{ who: 'Admin', what, when: 'Just now' }, ...l]);
  const patch = (name: string, p: Partial<Zone>) => setZones((zs) => zs.map((z) => z.name === name ? { ...z, ...p } : z));
  const liveCount = zones.filter((z) => z.live).length;
  const blockD = zones.find((z) => z.name === 'Block D');

  /** Live switch: pausing asks first; opening Sector 34 needs the checklist done. */
  const flip = (z: Zone) => {
    if (z.live) return setPause(z);
    if (z.name === 'Sector 34' && !(checks.trained && checks.hub)) return toast('Finish the opening checklist before Sector 34 goes live');
    patch(z.name, { live: true, ...(z.tone === 'x' ? { status: 'Healthy', tone: 'n', in15: 'New', hours: '6 am to 9 pm', busy: 'None' } : {}) });
    record(`opened zone ${z.name}`); toast(`${z.name} is live. Customers there can book now.`);
  };
  const confirmPause = () => {
    if (!pause) return;
    patch(pause.name, { live: false }); record(`paused zone ${pause.name}`); setPause(null);
    toast(`${pause.name} paused. Customers see “not available right now”.`);
  };
  /** Saves a tuned zone and logs what changed. */
  const saveTune = (edit: Zone) => {
    const old = zones.find((z) => z.name === edit.name)!;
    patch(edit.name, { radius: edit.radius, busy: edit.busy, hours: edit.hours, fee: edit.fee });
    const ch: string[] = [];
    if (old.radius !== edit.radius) ch.push(`search radius to ${edit.radius} km`);
    if (old.busy !== edit.busy) ch.push(`busy-hour price to ${edit.busy}`);
    if (old.hours !== edit.hours) ch.push(`hours to ${edit.hours}`);
    if (old.fee !== edit.fee) ch.push(`arrival fee to ₹${edit.fee}`);
    if (ch.length) record(`set ${edit.name} ${ch.join(', ')}`);
    toast(ch.length ? `${edit.name} saved` : 'Nothing changed');
  };
  /** Adds a switched-off zone; false when it has no name. */
  const addZone = (name: string) => {
    if (!name.trim()) { toast('Give the zone a name'); return false; }
    setZones((zs) => [...zs, { name: name.trim(), status: 'Not open', tone: 'x', partners: '0 of 8', in15: 'Not live', busy: 'Not set', hours: 'Not set', live: false, radius: 1.5, fee: 0 }]);
    record(`added zone ${name.trim()}`); toast(`${name.trim()} added. Draw the boundary next.`); return true;
  };
  /** Sends a team invite; false when the email does not look like one. */
  const invite = (email: string, role: string) => {
    if (!/.+@.+\..+/.test(email)) { toast('Enter a work email'); return false; }
    record(`invited ${email} as ${role}`); toast(`Invite sent to ${email}`); return true;
  };
  const showRealArrival = () => { record('set Block D to show real arrival time'); toast('Block D now shows “about 25 min” to customers'); };

  return { zones, log, checks, setChecks, liveCount, blockD, flip, pause, askPause: setPause, cancelPause: () => setPause(null), confirmPause, saveTune, addZone, invite, showRealArrival };
}
