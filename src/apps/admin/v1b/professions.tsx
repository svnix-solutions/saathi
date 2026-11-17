/** 98 (design page 51) Professions, skills and documents */
import React, { useState } from 'react';
import { Check, Modal, Toggle, useAdmin } from '../shell';
import {
  professions as profs0, specializations as specs0, skills as skills0, requirements as reqs0, documentTypes,
  docType, requiredDocs, type DocId, type ProfessionId, type Requirement,
} from '../../../data/professions';

type Chip = { id: string; profession: ProfessionId; name: string };
type Prof = (typeof profs0)[number];
const pillStyle: React.CSSProperties = { padding: '5px 10px', display: 'inline-flex', gap: 6, alignItems: 'center' };
const link: React.CSSProperties = { color: 'var(--green)', fontWeight: 700 };
const selStyle: React.CSSProperties = { fontSize: 12.5, padding: '7px 10px', width: 'auto' };

export function Professions(_: { params: Record<string, any> }) {
  const { toast } = useAdmin();
  const [profs, setProfs] = useState<Prof[]>(profs0);
  const [specs, setSpecs] = useState<Chip[]>(specs0);
  const [skills, setSkills] = useState<Chip[]>(skills0);
  const [reqs, setReqs] = useState<Requirement[]>(reqs0);
  const [selId, setSelId] = useState<ProfessionId>('nurse');
  const [adding, setAdding] = useState<{ kind: 'spec' | 'skill'; text: string } | null>(null);
  const [rule, setRule] = useState<{ doc: DocId | ''; prof: ProfessionId | ''; spec: string; required: boolean }>({ doc: '', prof: 'nurse', spec: '', required: true });
  const [docsOpen, setDocsOpen] = useState(false);
  const [newProf, setNewProf] = useState<string | null>(null);

  const sel = profs.find((p) => p.id === selId) ?? profs[0];
  const specsOf = (p: ProfessionId) => specs.filter((s) => s.profession === p);
  const skillsOf = (p: ProfessionId) => skills.filter((s) => s.profession === p);
  const docsOf = (p: ProfessionId) => requiredDocs(p, specsOf(p).map((s) => s.id), reqs);
  const specName = (id: string) => specs.find((s) => s.id === id)?.name ?? id;
  const profName = (id: ProfessionId) => profs.find((p) => p.id === id)?.name ?? id;
  const askedOf = (r: Requirement) => r.specialization ? `Because of ${specName(r.specialization)}`
    : r.profession ? `Every ${profName(r.profession).toLowerCase()}` : 'Everyone';
  const sameRule = (a: Requirement, b: Requirement) => a.doc === b.doc && a.profession === b.profession && a.specialization === b.specialization;

  const pick = (id: ProfessionId) => { setSelId(id); setAdding(null); setRule((r) => ({ ...r, prof: id, spec: '' })); };

  const addChip = () => {
    if (!adding) return;
    const name = adding.text.trim();
    const [list, set] = adding.kind === 'spec' ? [specs, setSpecs] : [skills, setSkills];
    if (!name) { setAdding(null); return; }
    if (list.some((c) => c.profession === sel.id && c.name.toLowerCase() === name.toLowerCase())) { toast(`${sel.name} already has ${name}`); return; }
    set([...list, { id: `${sel.id}_${Date.now()}`, profession: sel.id, name }]);
    toast(`${name} added to ${sel.name}`); setAdding({ ...adding, text: '' });
  };
  const removeChip = (kind: 'spec' | 'skill', c: Chip) => {
    if (kind === 'spec') { setSpecs((l) => l.filter((x) => x.id !== c.id)); setReqs((l) => l.filter((r) => r.specialization !== c.id)); }
    else setSkills((l) => l.filter((x) => x.id !== c.id));
    toast(`${c.name} removed from ${sel.name}`);
  };

  const addRule = () => {
    if (!rule.doc) { toast('Pick a document first'); return; }
    const r: Requirement = rule.spec ? { doc: rule.doc, specialization: rule.spec, required: rule.required }
      : rule.prof ? { doc: rule.doc, profession: rule.prof, required: rule.required } : { doc: rule.doc, required: rule.required };
    if (reqs.some((x) => sameRule(x, r))) { toast(`${docType(r.doc).name} is already asked of ${askedOf(r).toLowerCase()}`); return; }
    setReqs((l) => [...l, r]); setRule({ ...rule, doc: '' });
    toast(`${docType(r.doc).name} · ${askedOf(r)} · ${r.required ? 'Required' : 'Optional'}`);
  };

  const chips = (kind: 'spec' | 'skill', items: Chip[]) => (
    <div className="lft" style={{ flexWrap: 'wrap', gap: 6 }}>
      {items.map((c) => (
        <span key={c.id} className="pill s" style={pillStyle}>{c.name}
          <span className="clk m" role="button" aria-label={`Remove ${c.name}`} onClick={() => removeChip(kind, c)}>×</span></span>))}
      {adding?.kind === kind
        ? <input className="inp" autoFocus style={{ fontSize: 12.5, padding: '5px 9px', width: 160 }} placeholder="Name, then Enter"
            value={adding.text} onChange={(e) => setAdding({ kind, text: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') addChip(); if (e.key === 'Escape') setAdding(null); }} onBlur={() => !adding.text.trim() && setAdding(null)} />
        : <span className="s clk" style={link} onClick={() => setAdding({ kind, text: '' })}>+ Add</span>}
    </div>);

  const elsewhere = reqs.filter((r) => r.specialization && specs.find((s) => s.id === r.specialization)?.profession !== sel.id)
    .map((r) => { const s = specs.find((x) => x.id === r.specialization); return `${s?.name}${s ? ` (${profName(s.profession)})` : ''} needs ${docType(r.doc).name.toLowerCase()}`; });

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>Professions and documents</div><div className="m">{profs.length} professions · a partner holds one at a time</div></div>
      <div className="lft"><button className="btn o" style={{ padding: '9px 16px' }} onClick={() => setDocsOpen(true)}>Document types</button><button className="btn" style={{ padding: '10px 16px' }} onClick={() => setNewProf('')}>Add profession</button></div></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ padding: '14px 8px 4px' }}>
        <table><tbody>
          <tr><th>Profession</th><th>Special.</th><th>Skills</th><th>Docs</th><th>Partners</th><th>Live</th></tr>
          {profs.map((p) => (
            <tr key={p.id} className="clk" style={p.id === sel.id ? { background: 'var(--mint)' } : undefined} onClick={() => pick(p.id)}>
              <td><b>{p.name}</b></td><td>{specsOf(p.id).length}</td><td>{skillsOf(p.id).length}</td><td>{docsOf(p.id).length}</td><td>{p.partners}</td>
              <td onClick={(e) => e.stopPropagation()}><Toggle on={p.live} onChange={(v) => { setProfs((l) => l.map((x) => (x.id === p.id ? { ...x, live: v } : x))); toast(v ? `${p.name} is open for sign-up` : `${p.name} is hidden from sign-up`); }} /></td>
            </tr>))}
        </tbody></table>
        <div className="card s" style={{ margin: '12px 10px', background: 'var(--yellow)', border: 0 }}><b>Changing a partner's profession</b> is done from their profile, after their old specialisations and skills are removed. The database refuses it otherwise.</div>
      </div>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <div className="row"><span className="h2" style={{ fontSize: 15 }}>{sel.name}</span>
          {sel.live ? <span className="tag g">Live · {sel.partners} partners</span> : <span className="tag x">Hidden · {sel.partners} partners</span>}</div>
        <div className="h2">Specialisations</div>{chips('spec', specsOf(sel.id))}
        <div className="h2">Skills</div>{chips('skill', skillsOf(sel.id))}
        <div className="h2">Documents asked at sign-up</div>
        <table><tbody>
          <tr><th>Document</th><th>Asked of</th><th>Rule</th><th></th></tr>
          {docsOf(sel.id).map((r) => {
            const d = docType(r.doc);
            const sub = d.asksExpiry ? (d.asksNumber ? 'Number and expiry' : 'Expiry') : null;
            return (
              <tr key={`${r.doc}-${r.profession ?? ''}-${r.specialization ?? ''}`}>
                <td><b>{d.name}</b>{sub && <div className="s m">{sub}</div>}</td><td>{askedOf(r)}</td>
                <td>{r.required ? <span className="tag n">Required</span> : <span className="tag x">Optional</span>}</td>
                <td className="m clk" onClick={() => { setReqs((l) => l.map((x) => (sameRule(x, r) ? { ...x, required: !x.required } : x))); toast(`${d.name} is now ${r.required ? 'optional' : 'required'} · ${askedOf(r).toLowerCase()}`); }}>Edit</td>
              </tr>);
          })}
        </tbody></table>
        <div className="lft s" style={{ gap: 8, flexWrap: 'wrap' }}>
          <select className="inp" style={selStyle} aria-label="Document" value={rule.doc} onChange={(e) => setRule({ ...rule, doc: e.target.value as DocId })}>
            <option value="">Document</option>{documentTypes.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select>
          <select className="inp" style={selStyle} aria-label="Profession" value={rule.prof} onChange={(e) => setRule({ ...rule, prof: e.target.value as ProfessionId | '', spec: '' })}>
            <option value="">Everyone</option>{profs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
          <select className="inp" style={selStyle} aria-label="Specialisation" value={rule.spec} disabled={!rule.prof} onChange={(e) => setRule({ ...rule, spec: e.target.value })}>
            <option value="">Any specialisation</option>{rule.prof && specsOf(rule.prof).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
          <span className="lft"><Check on={rule.required} onChange={(v) => setRule({ ...rule, required: v })} />Required</span>
          <button className="btn" style={{ padding: '8px 14px' }} onClick={addRule}>Add rule</button>
        </div>
        <div className="s m">A new rule also shows on the Documents screen of {sel.name.toLowerCase()}s already working.{elsewhere.length > 0 && ` Elsewhere: ${elsewhere.join('; ')}.`}</div>
      </div>
    </div>

    <Modal open={docsOpen} onClose={() => setDocsOpen(false)} title="Document types" actions={<button className="btn sm" onClick={() => setDocsOpen(false)}>Done</button>}>
      <table><tbody>
        <tr><th>Document</th><th>Asks for</th><th>Rules</th></tr>
        {documentTypes.map((d) => (
          <tr key={d.id}><td><b>{d.name}</b><div className="s m">{d.help}</div></td>
            <td className="s">{[d.hasBack && 'Back side', d.asksNumber && 'Number', d.asksExpiry && 'Expiry'].filter(Boolean).join(', ') || 'Photo only'}</td>
            <td>{reqs.filter((r) => r.doc === d.id).length}</td></tr>))}
      </tbody></table>
    </Modal>
    <Modal open={newProf !== null} onClose={() => setNewProf(null)} title="Add profession"
      actions={<><button className="btn o sm" onClick={() => setNewProf(null)}>Cancel</button><button className="btn sm" onClick={() => {
        const name = (newProf ?? '').trim();
        if (!name) { toast('Name the profession'); return; }
        if (profs.some((p) => p.name.toLowerCase() === name.toLowerCase())) { toast(`${name} is already a profession`); return; }
        const id = name.toLowerCase().replace(/\W+/g, '_') as ProfessionId;
        setProfs((l) => [...l, { ...profs0[0], id, name, nameHi: name, sub: '', subHi: '', partners: 0, live: false }]);
        pick(id); setNewProf(null); toast(`${name} added · hidden from sign-up until you switch it on`);
      }}>Add profession</button></>}>
      <input className="inp" placeholder="Profession name, e.g. Cook" autoFocus value={newProf ?? ''} onChange={(e) => setNewProf(e.target.value)} />
      <div className="s m">New professions start hidden. Add specialisations, skills and document rules, then switch Live on.</div>
    </Modal>
  </>;
}
