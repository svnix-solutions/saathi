/** Screen 98 (design page 51) · Professions, skills and documents. */
import React, { useState } from 'react';
import { Button, CardHead, Check, Modal, PageHead, Table, TableCard, Tag, TextLink, Toggle, type TableColumn } from '../../../ui';
import { useAdmin } from '../../../session';
import {
  professions as profs0, specializations as specs0, skills as skills0, requirements as reqs0, documentTypes,
  docType, requiredDocs, type DocId, type DocType, type ProfessionId, type Requirement,
} from '@/data/professions';
import '../partners.css';

type Chip = { id: string; profession: ProfessionId; name: string };
type Prof = (typeof profs0)[number];
type ChipKind = 'spec' | 'skill';

const sameRule = (a: Requirement, b: Requirement) => a.doc === b.doc && a.profession === b.profession && a.specialization === b.specialization;
const asksFor = (d: DocType) => [d.hasBack && 'Back side', d.asksNumber && 'Number', d.asksExpiry && 'Expiry'].filter(Boolean).join(', ') || 'Photo only';

export function ProfessionsPage() {
  const { toast } = useAdmin();
  const [profs, setProfs] = useState<Prof[]>(profs0);
  const [specs, setSpecs] = useState<Chip[]>(specs0);
  const [skills, setSkills] = useState<Chip[]>(skills0);
  const [reqs, setReqs] = useState<Requirement[]>(reqs0);
  const [selId, setSelId] = useState<ProfessionId>('nurse');
  const [adding, setAdding] = useState<{ kind: ChipKind; text: string } | null>(null);
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
  const removeChip = (kind: ChipKind, c: Chip) => {
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
  const flipRequired = (r: Requirement) => {
    setReqs((l) => l.map((x) => (sameRule(x, r) ? { ...x, required: !x.required } : x)));
    toast(`${docType(r.doc).name} is now ${r.required ? 'optional' : 'required'} · ${askedOf(r).toLowerCase()}`);
  };
  const addProfession = () => {
    const name = (newProf ?? '').trim();
    if (!name) { toast('Name the profession'); return; }
    if (profs.some((p) => p.name.toLowerCase() === name.toLowerCase())) { toast(`${name} is already a profession`); return; }
    const id = name.toLowerCase().replace(/\W+/g, '_') as ProfessionId;
    setProfs((l) => [...l, { ...profs0[0], id, name, nameHi: name, sub: '', subHi: '', partners: 0, live: false }]);
    pick(id); setNewProf(null); toast(`${name} added · hidden from sign-up until you switch it on`);
  };

  const chips = (kind: ChipKind, items: Chip[]) => (
    <div className="lft prt-chips">
      {items.map((c) => (
        <span key={c.id} className="pill s prt-chip">{c.name}
          <span className="clk m" role="button" aria-label={`Remove ${c.name}`} onClick={() => removeChip(kind, c)}>×</span></span>))}
      {adding?.kind === kind
        ? <input className="inp prt-chip-input" autoFocus placeholder="Name, then Enter"
            value={adding.text} onChange={(e) => setAdding({ kind, text: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') addChip(); if (e.key === 'Escape') setAdding(null); }} onBlur={() => !adding.text.trim() && setAdding(null)} />
        : <TextLink onClick={() => setAdding({ kind, text: '' })}>+ Add</TextLink>}
    </div>);

  const elsewhere = reqs.filter((r) => r.specialization && specs.find((s) => s.id === r.specialization)?.profession !== sel.id)
    .map((r) => { const s = specs.find((x) => x.id === r.specialization); return `${s?.name}${s ? ` (${profName(s.profession)})` : ''} needs ${docType(r.doc).name.toLowerCase()}`; });

  const profColumns: TableColumn<Prof>[] = [
    { key: 'name', label: 'Profession', render: (p) => <b>{p.name}</b> },
    { key: 'specs', label: 'Special.', render: (p) => specsOf(p.id).length },
    { key: 'skills', label: 'Skills', render: (p) => skillsOf(p.id).length },
    { key: 'docs', label: 'Docs', render: (p) => docsOf(p.id).length },
    { key: 'partners', label: 'Partners', render: (p) => p.partners },
    {
      key: 'live', label: 'Live', cell: () => ({ onClick: (e) => e.stopPropagation() }),
      render: (p) => <Toggle on={p.live} onChange={(v) => { setProfs((l) => l.map((x) => (x.id === p.id ? { ...x, live: v } : x))); toast(v ? `${p.name} is open for sign-up` : `${p.name} is hidden from sign-up`); }} />,
    },
  ];
  const ruleColumns: TableColumn<Requirement>[] = [
    {
      key: 'doc', label: 'Document', render: (r) => {
        const d = docType(r.doc);
        const sub = d.asksExpiry ? (d.asksNumber ? 'Number and expiry' : 'Expiry') : null;
        return <><b>{d.name}</b>{sub && <div className="s m">{sub}</div>}</>;
      },
    },
    { key: 'asked', label: 'Asked of', render: askedOf },
    { key: 'rule', label: 'Rule', render: (r) => (r.required ? <Tag tone="n">Required</Tag> : <Tag tone="x">Optional</Tag>) },
    { key: 'edit', label: '', cell: (r) => ({ className: 'm clk', onClick: () => flipRequired(r) }), render: () => 'Edit' },
  ];
  const docTypeColumns: TableColumn<DocType>[] = [
    { key: 'doc', label: 'Document', render: (d) => <><b>{d.name}</b><div className="s m">{d.help}</div></> },
    { key: 'asks', label: 'Asks for', cell: () => ({ className: 's' }), render: asksFor },
    { key: 'rules', label: 'Rules', render: (d) => reqs.filter((r) => r.doc === d.id).length },
  ];

  return <>
    <PageHead title="Professions and documents" sub={<>{profs.length} professions · a partner holds one at a time</>}
      actions={<><Button variant="outline" onClick={() => setDocsOpen(true)}>Document types</Button><Button onClick={() => setNewProf('')}>Add profession</Button></>} />
    <div className="prt-body prt-body-professions">
      <TableCard>
        <Table columns={profColumns} rows={profs} rowKey={(p) => p.id} onRowClick={(p) => pick(p.id)} selected={(p) => p.id === sel.id} />
        <div className="card s prt-callout prt-inset"><b>Changing a partner&apos;s profession</b> is done from their profile, after their old specialisations and skills are removed. The database refuses it otherwise.</div>
      </TableCard>
      <div className="card prt-panel-loose">
        <CardHead pad={false} title={sel.name}
          right={sel.live ? <Tag tone="g">Live · {sel.partners} partners</Tag> : <Tag tone="x">Hidden · {sel.partners} partners</Tag>} />
        <div className="h2">Specialisations</div>{chips('spec', specsOf(sel.id))}
        <div className="h2">Skills</div>{chips('skill', skillsOf(sel.id))}
        <div className="h2">Documents asked at sign-up</div>
        <Table columns={ruleColumns} rows={docsOf(sel.id)} rowKey={(r) => `${r.doc}-${r.profession ?? ''}-${r.specialization ?? ''}`} />
        <div className="lft s prt-rule-form">
          <select className="inp prt-select" aria-label="Document" value={rule.doc} onChange={(e) => setRule({ ...rule, doc: e.target.value as DocId })}>
            <option value="">Document</option>{documentTypes.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select>
          <select className="inp prt-select" aria-label="Profession" value={rule.prof} onChange={(e) => setRule({ ...rule, prof: e.target.value as ProfessionId | '', spec: '' })}>
            <option value="">Everyone</option>{profs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
          <select className="inp prt-select" aria-label="Specialisation" value={rule.spec} disabled={!rule.prof} onChange={(e) => setRule({ ...rule, spec: e.target.value })}>
            <option value="">Any specialisation</option>{rule.prof && specsOf(rule.prof).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
          <span className="lft"><Check on={rule.required} onChange={(v) => setRule({ ...rule, required: v })} />Required</span>
          <Button size="lg" style={{ padding: '8px 14px' }} onClick={addRule}>Add rule</Button>
        </div>
        <div className="s m">A new rule also shows on the Documents screen of {sel.name.toLowerCase()}s already working.{elsewhere.length > 0 && ` Elsewhere: ${elsewhere.join('; ')}.`}</div>
      </div>
    </div>

    <Modal open={docsOpen} onClose={() => setDocsOpen(false)} title="Document types" actions={<Button size="sm" onClick={() => setDocsOpen(false)}>Done</Button>}>
      <Table columns={docTypeColumns} rows={documentTypes} rowKey={(d) => d.id} />
    </Modal>
    <Modal open={newProf !== null} onClose={() => setNewProf(null)} title="Add profession"
      actions={<><Button variant="outline" size="sm" onClick={() => setNewProf(null)}>Cancel</Button><Button size="sm" onClick={addProfession}>Add profession</Button></>}>
      <input className="inp" placeholder="Profession name, e.g. Cook" autoFocus value={newProf ?? ''} onChange={(e) => setNewProf(e.target.value)} />
      <div className="s m">New professions start hidden. Add specialisations, skills and document rules, then switch Live on.</div>
    </Modal>
  </>;
}

export default ProfessionsPage;
