/** 90 Services and prices */
import React, { useState } from 'react';
import { Button, PageHead, TableCard } from '../../../ui';
import { useAdmin } from '../../../session';
import { initialBookingRules } from '../data';
import { useServices } from '../hooks/useServices';
import { ServicesTable } from '../components/ServicesTable';
import { ServiceDetail } from '../components/ServiceDetail';
import { BookingRulesCard } from '../components/BookingRulesCard';
import { BookingRulesModal } from '../components/BookingRulesModal';
import { AddServiceModal } from '../components/AddServiceModal';
import '../catalog.css';

export function ServicesPage() {
  const { toast, go } = useAdmin();
  const svc = useServices();
  const [addSvc, setAddSvc] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [rules, setRules] = useState(initialBookingRules);
  const [rulesDraft, setRulesDraft] = useState(rules);
  const editRules = () => { setRulesDraft(rules); setRulesOpen(true); };
  const kinds = new Set(svc.list.map((s) => s.category)).size;

  return <>
    <PageHead title="Services and prices" sub={<>{svc.list.length} services in {kinds} kinds of work · prices are per 30 minutes</>}
      actions={<>
        <Button variant="outline" onClick={() => go('professions')}>Professions & documents</Button>
        <Button variant="outline" onClick={editRules}>Booking rules</Button>
        <Button onClick={() => setAddSvc(true)}>Add service</Button>
      </>} />
    <div className="cat-services-grid">
      <TableCard footer={<div className="card s cat-warn-inset"><b>A new price applies to new bookings only.</b> Bookings already made keep the amount they were booked at.</div>}>
        <ServicesTable model={svc} onOpenProfessions={() => go('professions')} />
      </TableCard>
      <div className="cat-stack">
        <ServiceDetail service={svc.sel} onTaskChange={svc.setTaskOn} onAddTask={svc.addTask} />
        <BookingRulesCard rules={rules} onEdit={editRules} />
      </div>
    </div>

    <BookingRulesModal open={rulesOpen} draft={rulesDraft} onDraftChange={setRulesDraft} onClose={() => setRulesOpen(false)}
      onSave={() => { setRules(rulesDraft); setRulesOpen(false); toast('Booking rules saved'); }} />
    <AddServiceModal open={addSvc} onClose={() => setAddSvc(false)} onAdd={svc.addService} />
  </>;
}

export default ServicesPage;
