/** Screen 84 · Testimonials: nothing is shown until an admin approves it. */
import React, { useMemo, useState } from 'react';
import { Av, Button, Check, Field, Modal, PageHead, Pager, TableCard, Tabs, Tag, TogRow } from '../../../ui';
import { useAdmin } from '../../../session';
import { initialTestimonials, starOptions, testimonialTone, type Testimonial } from '../data';
import { draftTestimonial, matchesStatus, showsFrom, type StatusFilter } from '../testimonialRules';
import '../quality.css';

type Who = 'all' | 'customer' | 'partner';

export function TestimonialsPage() {
  const { toast } = useAdmin();
  const [list, setList] = useState(initialTestimonials);
  const [who, setWho] = useState<Who>('all');
  const [st, setSt] = useState<StatusFilter>('any');
  const [sel, setSel] = useState(1);
  const [checks, setChecks] = useState({ consent: true, clean: true, words: true });
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ from: '', quote: '', stars: '5' });

  const rows = useMemo(() => list.filter((t) => (who === 'all' || t.who === who) && matchesStatus(st, t.status)), [list, who, st]);
  const cur = list.find((t) => t.id === sel) ?? list[0];
  const live = list.filter((t) => t.status === 'Live').length;
  const waiting = list.filter((t) => t.status === 'To approve').length;
  const set = (id: number, p: Partial<Testimonial>) => setList((l) => l.map((t) => t.id === id ? { ...t, ...p } : t));
  const pick = (t: Testimonial) => { setSel(t.id); const ok = t.consentTone === 'n'; setChecks({ consent: ok, clean: true, words: true }); };
  const allChecked = checks.consent && checks.clean && checks.words;

  const approve = () => {
    if (cur.consentTone !== 'n') return toast('Ask for consent first. It cannot go live without it.');
    if (!allChecked) return toast('Tick all three checks before publishing');
    set(cur.id, { status: 'Live', shows: showsFrom(cur.place, cur.who) }); toast(`Published. ${cur.from.split(',')[0]}’s words are live.`);
  };
  const saveDraft = () => {
    if (!draft.from.trim() || !draft.quote.trim()) return toast('Add who it is from and the words');
    const id = Math.max(...list.map((t) => t.id)) + 1;
    setList((l) => [draftTestimonial(id, draft.from, draft.quote, draft.stars), ...l]);
    setSel(id); setChecks({ consent: false, clean: true, words: true }); setAdding(false); toast('Saved as a draft. Ask for consent next.');
  };
  const position = list.filter((t) => t.status === 'Live').findIndex((t) => t.id === cur.id);

  return <>
    <PageHead title="Testimonials" sub={<>{live} live · {waiting} waiting for approval</>}
      actions={<div className="lft s qua-head-actions">
        <Tabs value={who} onChange={setWho} items={[{ key: 'all', label: 'All' }, { key: 'customer', label: 'Customers' }, { key: 'partner', label: 'Partners' }]} />
        <Button style={{ fontSize: 13 }} onClick={() => { setDraft({ from: '', quote: '', stars: '5' }); setAdding(true); }}>Add testimonial</Button>
      </div>} />
    <div className="qua-body qua-body-testimonials">
      <TableCard footer={<Pager text="Page 1 of 2 · 7 rows per page" />} head={
        <div className="qua-head">
          <Tabs value={st} onChange={setSt} items={[{ key: 'any', label: 'Any status' }, { key: 'waiting', label: 'Waiting' }, { key: 'approved', label: 'Approved' }, { key: 'off', label: 'Taken down' }]} />
        </div>}>
        <table>
          <thead><tr><th>From</th><th>Quote</th><th>Stars</th><th>Shows on</th><th>Consent</th><th>Status</th></tr></thead>
          <tbody>{rows.map((t) => (
            <tr key={t.id} className={`clk ${t.id === cur.id ? 'on' : ''}`} onClick={() => pick(t)}>
              <td><span className="lft"><Av sm face={t.face} initials={t.initials} /><b>{t.from}</b></span></td><td>{t.quote}</td>
              <td className={t.stars ? '' : 'm'}>{t.stars ?? 'None'}</td><td className={t.shows === 'Not chosen' ? 'm' : ''}>{t.shows}</td>
              <td><Tag tone={t.consentTone}>{t.consent}</Tag></td><td><Tag tone={testimonialTone[t.status]}>{t.status}</Tag></td>
            </tr>))}
            {!rows.length && <tr><td colSpan={6} className="m">Nothing here.</td></tr>}
          </tbody>
        </table>
      </TableCard>
      <div className="qua-side">
        <div className="card">
          <div className="row"><div className="lft"><Av face={cur.face} initials={cur.initials} /><div><div className="h2 qua-title">{cur.from}</div><div className="s m">{cur.meta}</div></div></div><Tag tone={testimonialTone[cur.status]}>{cur.status}</Tag></div>
          <div className="bub qua-quote">“{cur.full}”</div>
          <div className="qua-checks">
            <div className="lft"><Check on={checks.consent} onChange={(v) => setChecks({ ...checks, consent: v })} />Customer agreed to share it</div>
            <div className="lft"><Check on={checks.clean} onChange={(v) => setChecks({ ...checks, clean: v })} />No phone number, address or abuse</div>
            <div className="lft"><Check on={checks.words} onChange={(v) => setChecks({ ...checks, words: v })} />Words unchanged from the review</div>
          </div>
          <div className="g2 qua-actions">
            {cur.status === 'Live' ? <>
              <Button variant="outline" style={{ padding: 9 }} onClick={() => { set(cur.id, { status: 'Taken down' }); toast('Hidden from the app and website'); }}>Hide</Button>
              <Button style={{ padding: 10 }} onClick={() => toast('Already live')} disabled>Live now</Button>
            </> : cur.status === 'Taken down' && cur.consentTone === 'x' ? <>
              <Button variant="outline" style={{ padding: 9 }} disabled>Show again</Button>
              <div className="s m qua-center">Withdrawn by the customer</div>
            </> : <>
              <Button variant="outline" style={{ padding: 9 }} onClick={() => { set(cur.id, { status: 'Sent back' }); toast('Sent back. Not shown to anyone.'); }}>Send back</Button>
              <Button style={{ padding: 10 }} disabled={!allChecked || cur.consentTone !== 'n'} onClick={approve}>Approve and publish</Button>
            </>}
          </div>
          {cur.consentTone === 'r' && <div className="s qua-foot"><span className="lnk" onClick={() => { set(cur.id, { consent: 'Asked just now', consentTone: 'y' }); toast(`Consent request sent to ${cur.from.split(',')[0]}`); }}>Ask for consent</span></div>}
        </div>
        <div className="card qua-panel qua-fill">
          <div className="h2 qua-title">Where it will show</div>
          <TogRow label={cur.who === 'partner' ? 'Partner app home' : 'Customer app home'} on={cur.place.app} onChange={(v) => set(cur.id, { place: { ...cur.place, app: v } })} /><div className="hr" />
          <TogRow label="Website reviews section" on={cur.place.web} onChange={(v) => set(cur.id, { place: { ...cur.place, web: v } })} /><div className="hr" />
          <TogRow label="Sunita's profile" on={cur.place.profile} onChange={(v) => set(cur.id, { place: { ...cur.place, profile: v } })} /><div className="hr" />
          <div className="row"><span>Position on the website</span><b>{position >= 0 ? position + 1 : 2} of {Math.max(live, 6)}</b></div>
          <div className="s m end">A testimonial cannot go live without the person&apos;s consent. The customer can take it down at any time.</div>
        </div>
      </div>
    </div>

    <Modal open={adding} onClose={() => setAdding(false)} title="Add testimonial"
      actions={<><Button variant="outline" onClick={() => setAdding(false)}>Cancel</Button><Button onClick={saveDraft}>Save draft</Button></>}>
      <Field label="From"><input className="inp" placeholder="e.g. Aisha, Block A" value={draft.from} onChange={(e) => setDraft({ ...draft, from: e.target.value })} /></Field>
      <Field label="Their words"><textarea className="inp" rows={3} value={draft.quote} onChange={(e) => setDraft({ ...draft, quote: e.target.value })} /></Field>
      <Field label="Stars"><select className="inp" value={draft.stars} onChange={(e) => setDraft({ ...draft, stars: e.target.value })}>{starOptions.map((s) => <option key={s}>{s}</option>)}</select></Field>
    </Modal>
  </>;
}

export default TestimonialsPage;
