/** 94 Pay advances: approve or refuse with the partner's earnings in view. */
import React, { useState } from 'react';
import { Kpi, KpiGrid, PageHead, Tabs } from '../../../ui';
import { useAdmin } from '../../../session';
import { inr } from '../../../fixtures';
import { useAdvances } from '../hooks/useAdvances';
import { AdvancesTable } from '../components/AdvancesTable';
import { AdvanceReview } from '../components/AdvanceReview';
import { RefuseAdvanceModal } from '../components/RefuseAdvanceModal';
import '../finance.css';

export function AdvancesPage() {
  const { go } = useAdmin();
  const adv = useAdvances();
  const cur = adv.cur;
  const [refusing, setRefusing] = useState(false);

  return <>
    <PageHead title="Pay advances" sub={<>{adv.requests} request{adv.requests === 1 ? '' : 's'} · repaid from weekly payouts, no interest</>}
      actions={<Tabs value={adv.filter} onChange={adv.setFilter} items={[
        { key: 'requests', label: `Requests ${adv.requests}` }, { key: 'repaying', label: `Being repaid ${adv.repaying}` }, { key: 'repaid', label: 'Repaid 14' }]} />} />
    <KpiGrid>
      <Kpi label="Out on advance" value={inr(adv.out)} />
      <Kpi label="Being repaid" value={<>{adv.repaying} partners</>} />
      <Kpi label="Due back this Monday" value="₹4,250" />
      <Kpi label="Repaid late, ever" value="0" />
    </KpiGrid>
    <div className="fin-advances-grid">
      <AdvancesTable rows={adv.rows} current={cur.id} onPick={adv.select} />
      <AdvanceReview advance={cur} check={adv.check} onOpenPartner={() => go('partnerDetail', { id: cur.id, name: cur.name })}
        onRefuse={() => setRefusing(true)} onApprove={adv.approve} />
    </div>
    <RefuseAdvanceModal open={refusing} partner={cur.name} onClose={() => setRefusing(false)} onRefuse={adv.refuse} />
  </>;
}

export default AdvancesPage;
