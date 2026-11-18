import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Col, Grid, H2, Meter, Page, Pill, Row, Screen, Sheet, Spacer, T, Tag, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { LessonCard } from '../components/LessonCard';
import { LessonVideo } from '../components/LessonVideo';
import { useLessonWatch } from '../hooks/useLessonWatch';
import { lessons, lessonsDone, testSlots, tx, type Lesson } from '../data';

/** Design page 26 · screen 33: training lessons, one short video and question each, then the home visit test. */
export function TrainingScreen() {
  const nav = useNav();
  const t = useT();
  const { c, device } = useTheme();
  const [done, setDone] = useState<string[]>(lessonsDone);
  const [open, setOpen] = useState<Lesson | null>(null);
  const { watched, playing, setPlaying } = useLessonWatch(open);
  const [pick, setPick] = useState<number | null>(null);
  const [testSheet, setTestSheet] = useState(false);
  const [slot, setSlot] = useState(testSlots[0]);

  const firstOpen = lessons.findIndex((l) => !done.includes(l.id));
  const openLesson = (l: Lesson, i: number) => {
    if (i > firstOpen && firstOpen >= 0) { nav.toast(t(`Opens after lesson ${i}`, `पाठ ${i} के बाद खुलेगा`, `ਪਾਠ ${i} ਤੋਂ ਬਾਅਦ ਖੁੱਲ੍ਹੇਗਾ`)); return; }
    setOpen(l); setPick(null); setPlaying(false);
  };
  const w = open ? (done.includes(open.id) ? open.mins : watched[open.id] ?? 0) : 0;
  const finished = open ? w >= open.mins : false;
  const finishLesson = (l: Lesson) => {
    if (!done.includes(l.id)) setDone((d) => [...d, l.id]);
    nav.toast(t('Lesson done. Next one is open.', 'पाठ पूरा हुआ। अगला खुल गया।', 'ਪਾਠ ਪੂਰਾ ਹੋਇਆ। ਅਗਲਾ ਖੁੱਲ੍ਹ ਗਿਆ।'));
    setOpen(null);
  };

  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Label>{t('Training', 'ट्रेनिंग', 'ਟ੍ਰੇਨਿੰਗ')}</TopBar.Label>
        <TopBar.Title>{t(`${done.length} of ${lessons.length} lessons done`, `${lessons.length} में से ${done.length} पाठ पूरे`, `${lessons.length} ਵਿੱਚੋਂ ${done.length} ਪਾਠ ਪੂਰੇ`)}</TopBar.Title>
        <TopBar.Progress value={done.length / lessons.length} />
      </TopBar>
      <Screen>
        {lessons.map((l, i) => (
          <LessonCard key={l.id} lesson={l} index={i} done={done.includes(l.id)} current={i === firstOpen}
            locked={firstOpen >= 0 && i > firstOpen} watched={watched[l.id] ?? 0} onPress={() => openLesson(l, i)} />
        ))}
        <Spacer />
        <Button variant="outline" onPress={() => done.length === lessons.length ? setTestSheet(true) : nav.toast(t('Finish all 5 lessons first', 'पहले सभी 5 पाठ पूरे करें', 'ਪਹਿਲਾਂ ਸਾਰੇ 5 ਪਾਠ ਪੂਰੇ ਕਰੋ'))}>
          {t('Book my home visit test', 'होम विज़िट टेस्ट बुक करें', 'ਹੋਮ ਵਿਜ਼ਿਟ ਟੈਸਟ ਬੁੱਕ ਕਰੋ')}
        </Button>
      </Screen>

      <Sheet visible={!!open} onClose={() => { setOpen(null); setPlaying(false); }}>
        {open && (
          <>
            <Row><H2 style={styles.grow}>{t(open.title, open.hi, open.pa)}</H2><Tag tone="x">{t(`${w} of ${open.mins} min`, `${open.mins} में से ${w} मिनट`, `${open.mins} ਵਿੱਚੋਂ ${w} ਮਿੰਟ`)}</Tag></Row>
            <LessonVideo playing={playing} finished={finished} onToggle={() => setPlaying((p) => !p)} />
            <Meter value={w / open.mins} style={styles.fixed} />
            {finished ? (
              <Col gap={8}>
                <H2>{t('Quick question', 'एक छोटा सवाल', 'ਇੱਕ ਛੋਟਾ ਸਵਾਲ')}: {tx(t, open.q)}</H2>
                {open.options.map((o, i) => (
                  <Card key={o.en} sel={pick === i} tone={pick === i && i !== open.answer ? 'red' : undefined} onPress={() => setPick(i)} style={{ paddingVertical: 9 }}>
                    <T>{tx(t, o)}</T>
                  </Card>
                ))}
                {pick !== null && pick !== open.answer && <T s color={c.red}>{t('Not quite. Try again.', 'सही नहीं। फिर कोशिश करें।', 'ਸਹੀ ਨਹੀਂ। ਫਿਰ ਕੋਸ਼ਿਸ਼ ਕਰੋ।')}</T>}
                <Button disabled={pick !== open.answer} onPress={() => finishLesson(open)}>{t('Finish lesson', 'पाठ पूरा करें', 'ਪਾਠ ਪੂਰਾ ਕਰੋ')}</Button>
              </Col>
            ) : (
              <Button onPress={() => setPlaying((p) => !p)}>{playing ? t('Pause', 'रोकें', 'ਰੋਕੋ') : w > 0 ? t('Continue watching', 'देखना जारी रखें', 'ਦੇਖਣਾ ਜਾਰੀ ਰੱਖੋ') : t('Play video', 'वीडियो चलाएँ', 'ਵੀਡੀਓ ਚਲਾਓ')}</Button>
            )}
          </>
        )}
      </Sheet>

      <Sheet visible={testSheet} onClose={() => setTestSheet(false)}>
        <H2>{t('Home visit test', 'होम विज़िट टेस्ट', 'ਹੋਮ ਵਿਜ਼ਿਟ ਟੈਸਟ')}</H2>
        <T s m>{t('A trainer watches one real visit and gives feedback.', 'एक ट्रेनर आपकी एक असली विज़िट देखकर सलाह देंगी।', 'ਇੱਕ ਟ੍ਰੇਨਰ ਤੁਹਾਡੀ ਇੱਕ ਅਸਲੀ ਵਿਜ਼ਿਟ ਦੇਖ ਕੇ ਸਲਾਹ ਦੇਣਗੇ।')}</T>
        <Grid cols={device === 'small' ? 2 : 3}>
          {testSlots.map((s) => <Pill key={s.en} sel={slot === s} onPress={() => setSlot(s)}>{tx(t, s)}</Pill>)}
        </Grid>
        <Button onPress={() => { setTestSheet(false); nav.toast(t(`Test booked for ${slot.en}`, `टेस्ट ${slot.hi} बुक हुआ`, `ਟੈਸਟ ${slot.pa} ਬੁੱਕ ਹੋਇਆ`)); }}>{t(`Book ${slot.en}`, `${slot.hi} बुक करें`, `${slot.pa} ਬੁੱਕ ਕਰੋ`)}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  fixed: { flex: 0 },
  grow: { flex: 1 },
});

export default TrainingScreen;
