import React, { useState } from 'react';
import { Button, H2, Page, ProgressBar, Screen, Sheet, Spacer, T, Tag, TopBar, useNav, useT } from '@/native/ui';
import { JoiningStepCard } from '../components/JoiningStepCard';
import { joiningDone } from '../data';

/** Design page 21 (section 51), screen 13 · Joining. */
export function JoiningScreen() {
  const t = useT();
  const nav = useNav();
  const [police, setPolice] = useState(false);
  return (
    <Page>
      <TopBar>
        <TopBar.Text dim>{t('Welcome to Saathi Partner', 'Saathi Partner में स्वागत है', 'Saathi Partner ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ')}</TopBar.Text>
        <TopBar.Title>{t('Finish joining', 'जुड़ना पूरा करें', 'ਜੁੜਨਾ ਪੂਰਾ ਕਰੋ')}</TopBar.Title>
        <ProgressBar value={0.5} height={6} style={{ marginTop: 10 }} />
        <TopBar.Text dim style={{ marginTop: 4 }}>{t('2 of 4 steps done', '4 में से 2 चरण पूरे', '4 ਵਿੱਚੋਂ 2 ਕਦਮ ਪੂਰੇ')}</TopBar.Text>
      </TopBar>
      <Screen>
        {joiningDone.map((s) => <JoiningStepCard key={s.en} done title={t(s.en, s.hi, s.pa)} sub={t(s.subEn, s.subHi, s.subPa)} />)}
        <JoiningStepCard title={t('Police verification', 'पुलिस सत्यापन', 'ਪੁਲਿਸ ਵੈਰੀਫ਼ਿਕੇਸ਼ਨ')} sub={t('We are checking · about 3 days', 'जाँच जारी · लगभग 3 दिन', 'ਜਾਂਚ ਜਾਰੀ · ਲਗਭਗ 3 ਦਿਨ')}
          right={<Tag>{t('In review', 'जाँच में', 'ਜਾਂਚ ਵਿੱਚ')}</Tag>} onPress={() => setPolice(true)} />
        <JoiningStepCard sel title={t('Training', 'ट्रेनिंग', 'ਟ੍ਰੇਨਿੰਗ')} sub={t('4 short videos and a home visit test', '4 छोटे वीडियो और एक घर पर टेस्ट', '4 ਛੋਟੀਆਂ ਵੀਡੀਓ ਅਤੇ ਇੱਕ ਘਰ ਵਿੱਚ ਟੈਸਟ')} onPress={() => nav.push('training')} />
        <Spacer />
        <Button size="tall" onPress={() => nav.push('training')}>{t('Start training', 'ट्रेनिंग शुरू करें', 'ਟ੍ਰੇਨਿੰਗ ਸ਼ੁਰੂ ਕਰੋ')}</Button>
      </Screen>
      <Sheet visible={police} onClose={() => setPolice(false)}>
        <H2>{t('Police verification', 'पुलिस सत्यापन', 'ਪੁਲਿਸ ਵੈਰੀਫ਼ਿਕੇਸ਼ਨ')}</H2>
        <T s m>{t('Sent to the Block C police station on Monday. Most checks finish in 3 days. We send an SMS when it is done; you can take jobs meanwhile once training is passed.', 'सोमवार को ब्लॉक सी थाने भेजा गया। ज़्यादातर जाँच 3 दिन में पूरी होती है। पूरा होने पर SMS आएगा; ट्रेनिंग पास होने पर तब तक भी काम ले सकते हैं।', 'ਸੋਮਵਾਰ ਨੂੰ ਬਲਾਕ ਸੀ ਥਾਣੇ ਭੇਜਿਆ ਗਿਆ। ਜ਼ਿਆਦਾਤਰ ਜਾਂਚ 3 ਦਿਨਾਂ ਵਿੱਚ ਪੂਰੀ ਹੁੰਦੀ ਹੈ। ਪੂਰੀ ਹੋਣ ਉੱਤੇ SMS ਆਵੇਗਾ; ਟ੍ਰੇਨਿੰਗ ਪਾਸ ਹੋਣ ਤੋਂ ਬਾਅਦ ਉਦੋਂ ਤੱਕ ਵੀ ਕੰਮ ਲੈ ਸਕਦੇ ਹੋ।')}</T>
        <Button size="tall" onPress={() => setPolice(false)}>{t('OK', 'ठीक है', 'ਠੀਕ ਹੈ')}</Button>
      </Sheet>
    </Page>
  );
}

export default JoiningScreen;
