/** Screen 88 · Partner sign-ups. */
import React, { useState } from 'react';
import { Button, Check, I, Modal, PageHead, Tabs, Tag, TextLink } from '../../../ui';
import { useAdmin } from '../../../session';
import { initialSignups, sendBackReasons, signupCheckLabels, type Signup, type SignupStatus } from '../data';
import { certsOf, workOf } from '../signupRules';
import { SignupItem } from '../components/SignupItem';
import '../partners.css';

type Tab = 'check' | 'filling' | 'sent' | 'approved';

export function SignupsPage() {
  const { toast, go } = useAdmin();
  const [list, setList] = useState(initialSignups);
  const [tab, setTab] = useState<Tab>('check');
  const [selId, setSelId] = useState('sunita');
  const [why, setWhy] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [reject, setReject] = useState(false);
  const [approvedWeek, setApprovedWeek] = useState(6);
  const sel = list.find((s) => s.id === selId);

  const count = (st: SignupStatus) => list.filter((s) => s.status === st).length;
  const update = (id: string, patch: Partial<Signup>) => setList((l) => l.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const nextAfter = (id: string) => list.find((s) => s.status === 'check' && s.id !== id)?.id ?? id;
  const pick = (id: string) => { setSelId(id); setWhy([]); };
  const item = (s: Signup) => <SignupItem key={s.id} signup={s} selected={s.id === selId} onPick={pick} />;

  const approve = () => {
    if (!sel) return;
    if (sel.status !== 'check') { toast(sel.status === 'filling' ? `${sel.name} has not finished signing up` : `${sel.name} is not waiting for a check`); return; }
    if (!sel.checks.slice(0, 3).every(Boolean)) { toast('Tick the first three checks before approving'); return; }
    update(sel.id, { status: 'approved', note: 'Approved today' }); setApprovedWeek((n) => n + 1);
    toast(`${sel.name} approved · SMS sent, Home is open for her`); pick(nextAfter(sel.id));
  };
  const askAgain = () => {
    if (!sel) return;
    if (!why.length) { toast('Pick what is wrong first, under “If something is wrong”'); return; }
    update(sel.id, { status: 'sent', note: 'Asked: ' + why.join(', ').toLowerCase(), reason: why.join(', ') });
    toast(`SMS sent to ${sel.name}: ${why.join(', ').toLowerCase()}`); pick(nextAfter(sel.id));
  };

  const certs = sel ? certsOf(sel) : [];

  return <>
    <PageHead title="Partner sign-ups" sub={<>{count('check')} to check · {count('filling')} still filling in · usual time to approve: 1 working day</>}
      actions={<Tabs value={tab} onChange={setTab} items={[
        { key: 'check', label: `To check ${count('check')}` }, { key: 'filling', label: `Filling in ${count('filling')}` },
        { key: 'sent', label: `Sent back ${count('sent')}` }, { key: 'approved', label: `Approved this week ${approvedWeek}` }]} />} />
    <div className="prt-body prt-body-signups">
      <div className="card prt-panel">
        {tab === 'check' && <>
          <div className="h2 prt-title">Waiting for a check</div>
          {list.filter((s) => s.status === 'check').map(item)}
          {!count('check') && <div className="s m">All caught up.</div>}
          <div className="h2 prt-title prt-title-top">Still filling in</div>
          {list.filter((s) => s.status === 'filling').map(item)}
        </>}
        {tab === 'filling' && <><div className="h2 prt-title">Still filling in</div>{list.filter((s) => s.status === 'filling').map(item)}</>}
        {tab === 'sent' && <><div className="h2 prt-title">Sent back</div>{list.filter((s) => s.status === 'sent' || s.status === 'rejected').map(item)}</>}
        {tab === 'approved' && <><div className="h2 prt-title">Approved</div>
          {list.filter((s) => s.status === 'approved').map(item)}
          <div className="s m">{approvedWeek - count('approved')} more earlier this week. <TextLink onClick={() => go('partners')}>See all partners</TextLink></div></>}
        <div className="s m end">Oldest first. Partners cannot see Home or take jobs until approved.</div>
      </div>

      {sel ? <div className="card prt-panel-loose">
        <div className="row"><div><div className="h2 prt-name">{sel.name}</div><div className="s m">{sel.phone} · {sel.email} · {sel.zone} · {sel.lang}</div><div className="s"><b>Work:</b> {workOf(sel)}</div></div><Tag tone="n">Mobile verified</Tag></div>
        <div className="hr" />
        <div className="prt-photos">
          {['Aadhaar front', 'Aadhaar back', 'PAN card', ...certs.map((c) => c.name)].map((d) => {
            const missing = (d === 'Aadhaar back' && sel.id === 'asha') || (d === 'PAN card' && sel.id === 'meena');
            return (
              <div key={d} className={`s clk prt-doc-tile ${missing ? 'prt-doc-missing' : ''}`} onClick={() => missing ? toast(`${d} not uploaded yet`) : setPhoto(d)}
                style={{ height: certs.length ? 72 : 92 }}>
                <div><I n="cam" /><div>{d}</div>{missing && <div>Not uploaded</div>}</div>
              </div>);
          })}
        </div>
        <div className="prt-pair">
          <div className="card prt-compact"><div className="s m">Aadhaar</div><b className="prt-digits">XXXX XXXX {sel.aadhaar}</b><div className="s m">Name on card: {sel.name}</div></div>
          <div className="card prt-compact"><div className="s m">PAN</div><b className="prt-digits">{sel.pan}</b><div className="s m">Name on card: {sel.name}</div></div>
          {certs.map((c) => (
            <div key={c.id} className="card prt-compact"><div className="s m">{c.name}{!c.required && ' · optional'}</div>
              <b className={c.asksNumber ? 'prt-digits' : undefined}>{c.asksNumber ? (c.id === 'nursing_registration' ? 'DNC-2019-04417' : 'WM-DL-88213') : 'Uploaded'}</b>
              <div className="s m">{c.asksExpiry ? 'Valid till Mar 2028' : c.help}</div></div>))}
        </div>
        <div className="h2">Checks</div>
        <div className="s prt-checks">
          {signupCheckLabels.map((c, i) => (
            <div key={c} className="lft clk" onClick={() => update(sel.id, { checks: sel.checks.map((v, j) => (j === i ? !v : v)) })}>
              <Check on={sel.checks[i]} />{c}
            </div>))}
        </div>
        {sel.status === 'sent' && <div className="card s prt-compact prt-callout"><b>Sent back:</b> {sel.reason}. Waiting for the new photo.</div>}
        {sel.status === 'approved' && <div className="card sel s prt-compact"><b>Approved.</b> {sel.name} can now see Home and take jobs.</div>}
        <div className="g2 end"><Button variant="outline" size="lg" style={{ padding: 9 }} onClick={askAgain}>Ask for a photo again</Button><Button size="lg" style={{ padding: 10, opacity: sel.status === 'check' ? 1 : .55 }} onClick={approve}>Approve partner</Button></div>
        <div className="s m">Approving sends an SMS and opens Home for the partner. Only the last 4 Aadhaar digits are kept.</div>
      </div> : <div className="card m">Pick a sign-up on the left.</div>}

      {sel && <div className="prt-side">
        <div className="card">
          <div className="h2 prt-title prt-title-gap">References</div>
          <div className="prt-list-9">
            {sel.refs.map((r, i) => (
              <React.Fragment key={r.name}>{i > 0 && <div className="hr" />}
                <div className="row"><div><b>{r.name}</b><div className="s m">{r.phone} · {r.rel}</div></div>{r.ok ? <Tag tone="n">Code confirmed</Tag> : <Tag>Waiting for code</Tag>}</div>
              </React.Fragment>))}
          </div>
          <Button variant="outline" size="lg" style={{ padding: 8, marginTop: 10, width: '100%' }} onClick={() => toast(`Calling ${sel.refs[0].name} on ${sel.refs[0].phone}…`)}>Call a reference</Button>
        </div>
        <div className="card prt-panel prt-fill">
          <div className="h2 prt-title">If something is wrong</div>
          <div className="lft prt-chips">
            {sendBackReasons.map((r) => {
              const on = why.includes(r);
              return <span key={r} className={`pill s clk ${on ? 'sel' : ''} prt-reason`}
                onClick={() => setWhy((w) => (on ? w.filter((x) => x !== r) : [...w, r]))}>{r}</span>;
            })}
          </div>
          <div className="s m">The partner gets an SMS with the reason and uploads only that photo again.</div>
          <Button variant="danger-outline" size="lg" className="end" style={{ padding: 9 }} onClick={() => setReject(true)}>Reject application</Button>
        </div>
      </div>}
    </div>

    <Modal open={!!photo} onClose={() => setPhoto(null)} title={`${photo} · ${sel?.name}`} actions={<><Button variant="outline" size="sm" onClick={() => { setPhoto(null); setWhy((w) => (w.includes('Photo not clear') ? w : [...w, 'Photo not clear'])); }}>Not clear</Button><Button size="sm" onClick={() => setPhoto(null)}>Looks fine</Button></>}>
      <div className="s prt-preview prt-preview-photo">
        <div><I n="cam" className="prt-preview-icon-lg" /><div className="prt-preview-caption">{photo}</div><div className="m">{photo === 'PAN card' ? sel?.pan : photo?.startsWith('Aadhaar') ? `XXXX XXXX ${sel?.aadhaar}` : 'Certificate'} · {sel?.name}</div></div>
      </div>
      <div className="s m">Check the photo is sharp, all four corners show, and the name matches the details. A certificate must also show the course or council.</div>
    </Modal>
    <Modal open={reject} onClose={() => setReject(false)} title={`Reject ${sel?.name}?`}
      actions={<><Button variant="outline" size="sm" onClick={() => setReject(false)}>Keep</Button><Button variant="danger" size="sm" onClick={() => {
        if (sel) { update(sel.id, { status: 'rejected', note: 'Rejected' }); toast(`${sel.name} rejected · SMS sent`); pick(nextAfter(sel.id)); }
        setReject(false);
      }}>Reject application</Button></>}>
      <div className="s">She will not be able to sign up again with the same Aadhaar for 90 days. Use “Ask for a photo again” if only a photo is wrong.</div>
    </Modal>
  </>;
}

export default SignupsPage;
