/** 77 Zones and team access: open/pause zones, tune radius and fees. */
import React, { useState } from 'react';
import { Button, Modal, PageHead } from '../../../ui';
import { useAdmin } from '../../../session';
import type { Zone } from '../data';
import { useZones } from '../hooks/useZones';
import { ZonesTable } from '../components/ZonesTable';
import { BlockDNotice } from '../components/BlockDNotice';
import { OpeningChecklist } from '../components/OpeningChecklist';
import { TeamAccessCard } from '../components/TeamAccessCard';
import { ChangeLogCard } from '../components/ChangeLogCard';
import { TuneZoneModal } from '../components/TuneZoneModal';
import { AddZoneModal } from '../components/AddZoneModal';
import { InviteMemberModal } from '../components/InviteMemberModal';
import '../catalog.css';

export function ZonesPage() {
  const { go } = useAdmin();
  const zn = useZones();
  const [edit, setEdit] = useState<Zone | null>(null);
  const [adding, setAdding] = useState(false);
  const [inviting, setInviting] = useState(false);
  const notLive = zn.zones.length - zn.liveCount;

  return <>
    <PageHead title="Zones and team" sub={<>{zn.liveCount} zones live · {notLive} {notLive === 1 ? 'opening soon' : 'paused or opening'}</>}
      actions={<><Button variant="outline" onClick={() => setInviting(true)}>Invite team member</Button><Button onClick={() => setAdding(true)}>Add zone</Button></>} />
    <div className="cat-zones-grid">
      <ZonesTable zones={zn.zones} onTune={setEdit} onFlip={zn.flip}>
        {zn.blockD?.live && <BlockDNotice onShowRealArrival={zn.showRealArrival} onPause={() => zn.askPause(zn.blockD!)} />}
        <OpeningChecklist checks={zn.checks} onChange={zn.setChecks} />
      </ZonesTable>
      <div className="cat-stack">
        <TeamAccessCard onManage={() => go('team')} />
        <ChangeLogCard log={zn.log} />
      </div>
    </div>

    <TuneZoneModal zone={edit} onChange={setEdit} onClose={() => setEdit(null)} onSave={(z) => { zn.saveTune(z); setEdit(null); }} />
    {zn.pause && (
      <Modal open onClose={zn.cancelPause} title={`Pause ${zn.pause.name}?`}
        actions={<><Button variant="outline" onClick={zn.cancelPause}>Keep live</Button><Button variant="danger" onClick={zn.confirmPause}>Pause zone</Button></>}>
        <div className="m">New bookings stop in {zn.pause.name}. Visits already booked still go ahead. {zn.pause.partners} partners will be told.</div>
      </Modal>
    )}
    <AddZoneModal open={adding} onClose={() => setAdding(false)} onAdd={zn.addZone} />
    <InviteMemberModal open={inviting} onClose={() => setInviting(false)} onInvite={zn.invite} />
  </>;
}

export default ZonesPage;
