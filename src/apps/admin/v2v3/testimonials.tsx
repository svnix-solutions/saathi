/** 84 Testimonials: nothing is shown until an admin approves it. */
import React, { useMemo, useState } from 'react';
import { Av, Check, Modal, Pager, Tabs, Tag, useAdmin, type TagTone } from '../shell';
import { Btn, Field, TogRow } from './ui';

type Status = 'To approve' | 'Live' | 'Draft' | 'Taken down' | 'Sent back';
type T = {
  id: number; face?: string; initials?: string; from: string; who: 'customer' | 'partner'; quote: string; full: string; stars: number | null;
  shows: string; consent: string; consentTone: TagTone; status: Status; meta: string;
  place: { app: boolean; web: boolean; profile: boolean };
};
const tone: Record<Status, TagTone> = { 'To approve': 'y', Live: 'g', Draft: 'x', 'Taken down': 'x', 'Sent back': 'x' };

const initial: T[] = [
  { id: 1, face: 'nk', from: 'Nitin, Block C', who: 'customer', quote: 'Kitchen slab was spotless…', full: 'Kitchen slab was spotless. Sunita is always on time.', stars: 5, shows: 'App, website', consent: 'Given today', consentTone: 'n', status: 'To approve', meta: '9 visits · review of 14 Nov · 5 stars', place: { app: true, web: true, profile: true } },
  { id: 2, face: 'fa', from: 'Farah, Sector 18', who: 'customer', quote: 'By 8:15 Sunita was mopping…', full: 'I booked at 8 and by 8:15 Sunita was mopping. Unreal.', stars: 5, shows: 'App, website', consent: 'Given 12 Nov', consentTone: 'n', status: 'Live', meta: '14 visits · review of 11 Nov · 5 stars', place: { app: true, web: true, profile: false } },
  { id: 3, face: 'pn', from: 'Priya, Sector 21', who: 'customer', quote: 'The same helper every day…', full: 'The same helper every day, and she knows how I like things.', stars: 4, shows: 'App', consent: 'Given 9 Nov', consentTone: 'n', status: 'Live', meta: '6 visits · review of 8 Nov · 4 stars', place: { app: true, web: false, profile: false } },
  { id: 4, face: 'rg', from: 'Rohan, Block D', who: 'customer', quote: 'Kitchen deep clean before guests…', full: 'Kitchen deep clean before guests arrived, done in 2 hours.', stars: 5, shows: 'Website', consent: 'Given 8 Nov', consentTone: 'n', status: 'Live', meta: '4 visits · review of 7 Nov · 5 stars', place: { app: false, web: true, profile: false } },
  { id: 5, face: 'kr', from: 'Kavita R., partner', who: 'partner', quote: 'I work mornings only and still…', full: 'I work mornings only and still earn enough for my children’s school.', stars: null, shows: 'Partner app', consent: 'Given 5 Nov', consentTone: 'n', status: 'Live', meta: 'Partner since Aug · 210 visits', place: { app: true, web: false, profile: false } },
  { id: 6, face: 'ms', from: 'Meera, Block A', who: 'customer', quote: 'Quick and polite, will book again…', full: 'Quick and polite, will book again next week.', stars: 5, shows: 'Not chosen', consent: 'Not asked yet', consentTone: 'r', status: 'Draft', meta: '3 visits · review of 15 Nov · 5 stars', place: { app: false, web: false, profile: false } },
  { id: 7, face: 'st', from: 'Sameer, Block C', who: 'customer', quote: 'Good service the first time…', full: 'Good service the first time I booked.', stars: 4, shows: 'Website', consent: 'Withdrawn', consentTone: 'x', status: 'Taken down', meta: '2 visits · review of 1 Oct · 4 stars', place: { app: false, web: false, profile: false } },
];

type Who = 'all' | 'customer' | 'partner';
type St = 'any' | 'waiting' | 'approved' | 'off';
const showsFrom = (p: T['place'], who: T['who']) => {
  const s = [p.app && (who === 'partner' ? 'Partner app' : 'App'), p.web && 'website', p.profile && 'profile'].filter(Boolean) as string[];
  return s.length ? s.join(', ').replace(/^w/, 'W') : 'Not chosen';
};

export function Testimonials() {
  const { toast } = useAdmin();
  const [list, setList] = useState(initial);
  const [who, setWho] = useState<Who>('all');
  const [st, setSt] = useState<St>('any');
  const [sel, setSel] = useState(1);
  const [checks, setChecks] = useState({ consent: true, clean: true, words: true });
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ from: '', quote: '', stars: '5' });

  const rows = useMemo(() => list.filter((t) => (who === 'all' || t.who === who) &&
    (st === 'any' || (st === 'waiting' && (t.status === 'To approve' || t.status === 'Draft')) || (st === 'approved' && t.status === 'Live') || (st === 'off' && (t.status === 'Taken down' || t.status === 'Sent back')))), [list, who, st]);
  const cur = list.find((t) => t.id === sel) ?? list[0];
  const live = list.filter((t) => t.status === 'Live').length;
  const waiting = list.filter((t) => t.status === 'To approve').length;
  const set = (id: number, p: Partial<T>) => setList((l) => l.map((t) => t.id === id ? { ...t, ...p } : t));
  const pick = (t: T) => { setSel(t.id); const ok = t.consentTone === 'n'; setChecks({ consent: ok, clean: true, words: true }); };
  const allChecked = checks.consent && checks.clean && checks.words;

  const approve = () => {
    if (cur.consentTone !== 'n') return toast('Ask for consent first. It cannot go live without it.');
    if (!allChecked) return toast('Tick all three checks before publishing');
    set(cur.id, { status: 'Live', shows: showsFrom(cur.place, cur.who) }); toast(`Published. ${cur.from.split(',')[0]}’s words are live.`);
  };
  const position = list.filter((t) => t.status === 'Live').findIndex((t) => t.id === cur.id);

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>Testimonials</div><div className="m">{live} live · {waiting} waiting for approval</div></div>
      <div className="lft s" style={{ gap: 12 }}>
        <Tabs value={who} onChange={setWho} items={[{ key: 'all', label: 'All' }, { key: 'customer', label: 'Customers' }, { key: 'partner', label: 'Partners' }]} />
        <Btn style={{ fontSize: 13 }} onClick={() => { setDraft({ from: '', quote: '', stars: '5' }); setAdding(true); }}>Add testimonial</Btn>
      </div></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ padding: '14px 8px 4px' }}>
        <div style={{ padding: '0 10px 8px' }}>
          <Tabs value={st} onChange={setSt} items={[{ key: 'any', label: 'Any status' }, { key: 'waiting', label: 'Waiting' }, { key: 'approved', label: 'Approved' }, { key: 'off', label: 'Taken down' }]} />
        </div>
        <table>
          <thead><tr><th>From</th><th>Quote</th><th>Stars</th><th>Shows on</th><th>Consent</th><th>Status</th></tr></thead>
          <tbody>{rows.map((t) => (
            <tr key={t.id} className={`clk ${t.id === cur.id ? 'on' : ''}`} onClick={() => pick(t)}>
              <td><span className="lft"><Av sm face={t.face} initials={t.initials} /><b>{t.from}</b></span></td><td>{t.quote}</td>
              <td className={t.stars ? '' : 'm'}>{t.stars ?? 'None'}</td><td className={t.shows === 'Not chosen' ? 'm' : ''}>{t.shows}</td>
              <td><Tag tone={t.consentTone}>{t.consent}</Tag></td><td><Tag tone={tone[t.status]}>{t.status}</Tag></td>
            </tr>))}
            {!rows.length && <tr><td colSpan={6} className="m">Nothing here.</td></tr>}
          </tbody>
        </table>
        <Pager text="Page 1 of 2 · 7 rows per page" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card">
          <div className="row"><div className="lft"><Av face={cur.face} initials={cur.initials} /><div><div className="h2" style={{ fontSize: 15 }}>{cur.from}</div><div className="s m">{cur.meta}</div></div></div><Tag tone={tone[cur.status]}>{cur.status}</Tag></div>
          <div className="bub" style={{ marginTop: 10, maxWidth: '100%', fontSize: 14 }}>“{cur.full}”</div>
          <div style={{ display: 'grid', gap: 7, marginTop: 10 }}>
            <div className="lft"><Check on={checks.consent} onChange={(v) => setChecks({ ...checks, consent: v })} />Customer agreed to share it</div>
            <div className="lft"><Check on={checks.clean} onChange={(v) => setChecks({ ...checks, clean: v })} />No phone number, address or abuse</div>
            <div className="lft"><Check on={checks.words} onChange={(v) => setChecks({ ...checks, words: v })} />Words unchanged from the review</div>
          </div>
          <div className="g2" style={{ marginTop: 12 }}>
            {cur.status === 'Live' ? <>
              <Btn o style={{ padding: 9 }} onClick={() => { set(cur.id, { status: 'Taken down' }); toast('Hidden from the app and website'); }}>Hide</Btn>
              <Btn style={{ padding: 10 }} onClick={() => toast('Already live')} disabled>Live now</Btn>
            </> : cur.status === 'Taken down' && cur.consentTone === 'x' ? <>
              <Btn o style={{ padding: 9 }} disabled>Show again</Btn>
              <div className="s m" style={{ alignSelf: 'center' }}>Withdrawn by the customer</div>
            </> : <>
              <Btn o style={{ padding: 9 }} onClick={() => { set(cur.id, { status: 'Sent back' }); toast('Sent back. Not shown to anyone.'); }}>Send back</Btn>
              <Btn style={{ padding: 10 }} disabled={!allChecked || cur.consentTone !== 'n'} onClick={approve}>Approve and publish</Btn>
            </>}
          </div>
          {cur.consentTone === 'r' && <div className="s" style={{ marginTop: 8 }}><span className="lnk" onClick={() => { set(cur.id, { consent: 'Asked just now', consentTone: 'y' }); toast(`Consent request sent to ${cur.from.split(',')[0]}`); }}>Ask for consent</span></div>}
        </div>
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div className="h2" style={{ fontSize: 15 }}>Where it will show</div>
          <TogRow label={cur.who === 'partner' ? 'Partner app home' : 'Customer app home'} on={cur.place.app} onChange={(v) => set(cur.id, { place: { ...cur.place, app: v } })} /><div className="hr" />
          <TogRow label="Website reviews section" on={cur.place.web} onChange={(v) => set(cur.id, { place: { ...cur.place, web: v } })} /><div className="hr" />
          <TogRow label="Sunita's profile" on={cur.place.profile} onChange={(v) => set(cur.id, { place: { ...cur.place, profile: v } })} /><div className="hr" />
          <div className="row"><span>Position on the website</span><b>{position >= 0 ? position + 1 : 2} of {Math.max(live, 6)}</b></div>
          <div className="s m end">A testimonial cannot go live without the person's consent. The customer can take it down at any time.</div>
        </div>
      </div>
    </div>

    <Modal open={adding} onClose={() => setAdding(false)} title="Add testimonial"
      actions={<><Btn o onClick={() => setAdding(false)}>Cancel</Btn><Btn onClick={() => {
        if (!draft.from.trim() || !draft.quote.trim()) return toast('Add who it is from and the words');
        const id = Math.max(...list.map((t) => t.id)) + 1; const q = draft.quote.trim();
        setList((l) => [{ id, initials: draft.from.trim().slice(0, 2).toUpperCase(), from: draft.from.trim(), who: /partner/i.test(draft.from) ? 'partner' : 'customer', quote: q.length > 30 ? q.slice(0, 30) + '…' : q, full: q,
          stars: parseInt(draft.stars, 10) || null, shows: 'Not chosen', consent: 'Not asked yet', consentTone: 'r', status: 'Draft', meta: 'Added by Admin · just now', place: { app: false, web: false, profile: false } }, ...l]);
        setSel(id); setChecks({ consent: false, clean: true, words: true }); setAdding(false); toast('Saved as a draft. Ask for consent next.');
      }}>Save draft</Btn></>}>
      <Field label="From"><input className="inp" placeholder="e.g. Aisha, Block A" value={draft.from} onChange={(e) => setDraft({ ...draft, from: e.target.value })} /></Field>
      <Field label="Their words"><textarea className="inp" rows={3} value={draft.quote} onChange={(e) => setDraft({ ...draft, quote: e.target.value })} /></Field>
      <Field label="Stars"><select className="inp" value={draft.stars} onChange={(e) => setDraft({ ...draft, stars: e.target.value })}>{['5', '4', '3', 'None'].map((s) => <option key={s}>{s}</option>)}</select></Field>
    </Modal>
  </>;
}
