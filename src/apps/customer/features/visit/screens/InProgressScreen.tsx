import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, CheckRow, H, H2, IconTile, Lft, Ring, Row, Screen, Spacer, T, Tag, useNav, useT } from '@/native/ui';
import { clock, dur, rupees, serviceById, taskName } from '@/domain';
import { defaultVisitTasks } from '../data';
import { useVisitClock } from '../hooks/useVisitClock';
import { useVisitState } from '../state';

/** Design page 04 · screen 10, job in progress. */
export function InProgressScreen() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useVisitState();
  const extra = st.extraMinutes ?? 0;
  const total = (st.minutes + extra) * 60;
  const { left, addMinutes } = useVisitClock(st.minutes, () => nav.replace('visit.finish'));
  const tasks = st.tasks.length ? st.tasks : defaultVisitTasks;
  const [done, setDone] = useState<string[]>(tasks.slice(0, Math.min(2, tasks.length - 1)));
  const allDone = tasks.every((x) => done.includes(x));
  const per30 = serviceById(st.service).per30;
  const toggleTask = (x: string) => setDone((l) => (l.includes(x) ? l.filter((y) => y !== x) : [...l, x]));
  const addHalfHour = () => {
    set({ extraMinutes: extra + 30 });
    addMinutes(30);
    nav.toast(t(`30 minutes added · ${rupees(per30)}`, `30 मिनट जोड़े गए · ${rupees(per30)}`, `30 ਮਿੰਟ ਜੋੜੇ ਗਏ · ${rupees(per30)}`));
  };
  return (
    <Screen>
      <Row><H2>{t('Job in progress', 'काम चल रहा है', 'ਕੰਮ ਚੱਲ ਰਿਹਾ ਹੈ')}</H2><Tag>{t('Live', 'लाइव', 'ਲਾਈਵ')}</Tag></Row>
      <Card style={styles.checks}>
        <CheckRow on label={t('Started with your code at 10:02', '10:02 पर आपके कोड से शुरू हुआ', '10:02 ਤੇ ਤੁਹਾਡੇ ਕੋਡ ਨਾਲ ਸ਼ੁਰੂ ਹੋਇਆ')} />
        <CheckRow on label={t('Sunita checked in with a selfie', 'सुनीता ने सेल्फ़ी से चेक-इन किया', 'ਸੁਨੀਤਾ ਨੇ ਸੈਲਫ਼ੀ ਨਾਲ ਚੈੱਕ-ਇਨ ਕੀਤਾ')} />
      </Card>
      <Ring pct={1 - left / total}>
        <View style={styles.ringBody}>
          <H size={26}>{clock(left)}</H>
          <T s m>{t(`left of ${dur(t, st.minutes + extra)}`, `${dur(t, st.minutes + extra)} में से बाकी`, `${dur(t, st.minutes + extra)} ਵਿੱਚੋਂ ਬਾਕੀ`)}</T>
        </View>
      </Ring>
      <Card style={styles.tasks}>
        {tasks.map((x) => (
          <CheckRow key={x} done on={done.includes(x)} label={taskName(t, x)} onPress={() => toggleTask(x)} />
        ))}
      </Card>
      <Card row>
        <Lft style={styles.grow}><Avatar face="sd" size={32} /><H2 style={styles.grow}>{t('Sunita D.', 'सुनीता डी.', 'ਸੁਨੀਤਾ ਡੀ.')}</H2></Lft>
        <IconTile name="call" onPress={() => nav.toast(t('Calling Sunita D.…', 'सुनीता डी. को कॉल हो रहा है…', 'ਸੁਨੀਤਾ ਡੀ. ਨੂੰ ਕਾਲ ਹੋ ਰਹੀ ਹੈ…'))} />
      </Card>
      <Spacer />
      {allDone && <Button onPress={() => nav.replace('visit.finish')}>{t('Sunita says it is done · see finish codes', 'सुनीता ने काम पूरा बताया · फ़िनिश कोड देखें', 'ਸੁਨੀਤਾ ਨੇ ਕੰਮ ਪੂਰਾ ਦੱਸਿਆ · ਫ਼ਿਨਿਸ਼ ਕੋਡ ਵੇਖੋ')}</Button>}
      <Button variant="yellow" onPress={addHalfHour}>{t(`Add 30 minutes · ${rupees(per30)}`, `30 मिनट जोड़ें · ${rupees(per30)}`, `30 ਮਿੰਟ ਹੋਰ ਜੋੜੋ · ${rupees(per30)}`)}</Button>
    </Screen>
  );
}

export default InProgressScreen;

const styles = StyleSheet.create({
  checks: { gap: 8 },
  tasks: { gap: 10 },
  ringBody: { alignItems: 'center' },
  grow: { flex: 1 },
});
