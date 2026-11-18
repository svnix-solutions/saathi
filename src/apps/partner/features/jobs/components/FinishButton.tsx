import React, { useState } from 'react';
import { taskName, taskNamesHiPartner } from '@/domain';
import { Button, H2, Sheet, T, useNav, useT } from '@/native/ui';
import { missingTasks } from '../job';
import { useJobsState } from '../state';

/** "Finish job" with a check that every task is ticked (a sheet lists the ones that are not). */
/** `labelPa` defaults to the Punjabi for "Finish job" when the label is that. */
export function FinishButton({ label, labelHi, labelPa }: { label: string; labelHi: string; labelPa?: string }) {
  const t = useT();
  const nav = useNav();
  const [st] = useJobsState();
  const [ask, setAsk] = useState(false);
  const missing = missingTasks(st.job);
  return (
    <>
      <Button size="tall" onPress={() => (missing.length ? setAsk(true) : nav.push('finishCode'))}>{t(label, labelHi, labelPa ?? (label === 'Finish job' ? 'ਕੰਮ ਖ਼ਤਮ ਕਰੋ' : undefined))}</Button>
      <Sheet visible={ask} onClose={() => setAsk(false)}>
        <H2>{t(`${missing.length} task not ticked`, `${missing.length} काम पर टिक नहीं`, `${missing.length} ਕੰਮ ਤੇ ਟਿੱਕ ਨਹੀਂ`)}</H2>
        <T s m>{missing.map((x) => taskName(t, x, taskNamesHiPartner)).join(', ')}. {t('Tick it if it is done, or tell the customer why.', 'हो गया हो तो टिक करें, नहीं तो ग्राहक को कारण बताएँ।', 'ਹੋ ਗਿਆ ਹੈ ਤਾਂ ਟਿੱਕ ਕਰੋ, ਨਹੀਂ ਤਾਂ ਗਾਹਕ ਨੂੰ ਕਾਰਨ ਦੱਸੋ।')}</T>
        <Button size="tall" onPress={() => setAsk(false)}>{t('Keep working', 'काम जारी रखें', 'ਕੰਮ ਜਾਰੀ ਰੱਖੋ')}</Button>
        <Button variant="plain" onPress={() => { setAsk(false); nav.push('finishCode'); }}>{t('Finish anyway', 'फिर भी खत्म करें', 'ਫਿਰ ਵੀ ਖ਼ਤਮ ਕਰੋ')}</Button>
      </Sheet>
    </>
  );
}

export default FinishButton;
