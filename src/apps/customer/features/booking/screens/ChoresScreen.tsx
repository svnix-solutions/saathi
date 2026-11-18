/** Design page 03 · Book a helper — screen 6 · Choose chores. */
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  BackHeader, Button, Card, CharacterTile, CheckRow, H, H2, Input, Lft, Screen, Spacer, T, useNav, useT, type ScreenProps,
} from '@/native/ui';
import { serviceById, serviceName, taskName, type ServiceId } from '@/domain';
import { useCustomerState } from '../../../state';
import { toggleIn } from '../data';

export function ChoresScreen({ params }: ScreenProps<{ service?: ServiceId }>) {
  const nav = useNav();
  const t = useT();
  const [st, set] = useCustomerState();
  const id: ServiceId = params.service ?? st.service;
  const s = serviceById(id);
  const sameService = id === st.service;
  const [ticked, setTicked] = useState<string[]>(() =>
    sameService && st.tasks.length ? st.tasks.filter((x) => s.tasks.includes(x)) : s.tasks.slice(0, Math.min(3, s.tasks.length)));
  const sampleNote = "Please do the kids' room first.";
  /** The sample note from the prototype state is shown in the current language; a typed note as written. */
  const [note, setNote] = useState(() => {
    const n = sameService ? st.note : '';
    return n === sampleNote ? t(sampleNote, 'पहले बच्चों का कमरा कर दें।', 'ਪਹਿਲਾਂ ਬੱਚਿਆਂ ਦਾ ਕਮਰਾ ਕਰ ਦਿਓ।') : n;
  });
  const next = () => { set({ service: id, tasks: ticked, note }); nav.push('time'); };
  return (
    <Screen>
      <BackHeader title={serviceName(t, id)} onBack={nav.back} />
      <Lft>
        <CharacterTile name={s.character} size={64} />
        <H style={styles.grow}>{t('What should the helper do?', 'हेल्पर क्या काम करे?', 'ਹੈਲਪਰ ਕੀ ਕੰਮ ਕਰੇ?')}</H>
      </Lft>
      <Card style={styles.tasks}>
        {s.tasks.map((task) => <CheckRow key={task} on={ticked.includes(task)} label={taskName(t, task)} onPress={() => setTicked((l) => toggleIn(l, task))} />)}
      </Card>
      <H2>{t('Anything specific?', 'कुछ खास?', 'ਕੁਝ ਖ਼ਾਸ?')}</H2>
      <Input small multiline value={note} onChangeText={setNote} style={{ minHeight: 70 }}
        placeholder={t(sampleNote, 'पहले बच्चों का कमरा कर दें।', 'ਪਹਿਲਾਂ ਬੱਚਿਆਂ ਦਾ ਕਮਰਾ ਕਰ ਦਿਓ।')} />
      <T s m>{t('Helpers bring nothing with them. Keep your broom, mop and cleaner ready.', 'हेल्पर कुछ साथ नहीं लाते। झाड़ू, पोछा और क्लीनर तैयार रखें।', 'ਹੈਲਪਰ ਕੁਝ ਨਾਲ ਨਹੀਂ ਲਿਆਉਂਦੇ। ਝਾੜੂ, ਪੋਚਾ ਅਤੇ ਕਲੀਨਰ ਤਿਆਰ ਰੱਖੋ।')}</T>
      <Spacer />
      <Button disabled={!ticked.length} onPress={next}>{t('Continue', 'आगे बढ़ें', 'ਅੱਗੇ ਵਧੋ')}</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  tasks: { gap: 11 },
});

export default ChoresScreen;
