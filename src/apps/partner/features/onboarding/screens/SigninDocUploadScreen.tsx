import React, { useState } from 'react';
import { BackHeader, Button, Grid, H2, Input, Page, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { docType, type DocId } from '@/data/professions';
import { DocPhotoTile } from '../components/DocPhotoTile';
import { SignupSteps } from '../components/SignupSteps';
import { docNumberLabels, sampleCertificate } from '../data';
import { addedOf, maskTail, typeMasked } from '../signup';
import { docHelp, docName } from '../words';
import { useOnboardingState } from '../state';

/** Design page 22 (section 96), screen 13 · Certificate upload: number and expiry only where the document type asks. */
export function SigninDocUploadScreen({ params }: { params: { doc?: DocId; sample?: boolean } }) {
  const t = useT();
  const nav = useNav();
  const [st, set] = useOnboardingState();
  const d = docType(params.doc ?? 'nursing_registration');
  const sample = !!params.sample;
  const [front, setFront] = useState(sample);
  const [back, setBack] = useState(sample);
  const [num, setNum] = useState(sample ? sampleCertificate.number : '');
  const [until, setUntil] = useState(sample ? t(sampleCertificate.validUntil, sampleCertificate.validUntilHi, sampleCertificate.validUntilPa) : '');
  const ok = front && (!d.hasBack || back) && (!d.asksNumber || num.length >= 4) && (!d.asksExpiry || until.trim().length >= 4);
  const [nl, nlHi, nlPa] = docNumberLabels[d.id] ?? ['Number', 'नंबर', 'ਨੰਬਰ'];
  const save = () => {
    set({ docsAdded: [...addedOf(st).filter((x) => x !== d.id), d.id] });
    nav.toast(t(`${d.name} added`, `${d.nameHi} जुड़ गया`, `${docName(t, d)} ਜੁੜ ਗਿਆ`));
    nav.back();
  };
  return (
    <Page>
      <Screen>
        <SignupSteps step={6} label={false} />
        <BackHeader title={docName(t, d)} onBack={nav.back} />
        {d.hasBack
          ? <Grid cols={2}>
            <DocPhotoTile added={front} onPress={() => setFront(!front)} addedLabel={t('Front added', 'आगे का हिस्सा जुड़ा', 'ਅਗਲਾ ਪਾਸਾ ਜੁੜ ਗਿਆ')} addLabel={t('Add front side', 'आगे का हिस्सा जोड़ें', 'ਅਗਲਾ ਪਾਸਾ ਜੋੜੋ')} />
            <DocPhotoTile added={back} onPress={() => setBack(!back)} addedLabel={t('Back added', 'पीछे का हिस्सा जुड़ा', 'ਪਿਛਲਾ ਪਾਸਾ ਜੁੜ ਗਿਆ')} addLabel={t('Add back side', 'पीछे का हिस्सा जोड़ें', 'ਪਿਛਲਾ ਪਾਸਾ ਜੋੜੋ')} />
          </Grid>
          : <DocPhotoTile added={front} onPress={() => setFront(!front)} addedLabel={t('Photo added', 'फ़ोटो जुड़ गई', 'ਫ਼ੋਟੋ ਜੁੜ ਗਈ')} addLabel={t('Add photo', 'फ़ोटो जोड़ें', 'ਫ਼ੋਟੋ ਜੋੜੋ')} />}
        {d.asksNumber && <>
          <H2>{t(nl, nlHi, nlPa)}</H2>
          <Input value={maskTail(num)} onChangeText={(v) => setNum(typeMasked(num, v))} placeholder="XXXXXX3307" />
        </>}
        {d.asksExpiry && <>
          <H2>{t('Valid until', 'कब तक मान्य', 'ਕਦੋਂ ਤੱਕ ਜਾਇਜ਼')}</H2>
          <Input value={until} onChangeText={setUntil} placeholder={t(sampleCertificate.validUntil, sampleCertificate.validUntilHi, sampleCertificate.validUntilPa)} />
        </>}
        <T s m>{[
          d.asksExpiry ? t('We remind you 30 days before it runs out.', 'ख़त्म होने से 30 दिन पहले याद दिलाएँगे।', 'ਖ਼ਤਮ ਹੋਣ ਤੋਂ 30 ਦਿਨ ਪਹਿਲਾਂ ਯਾਦ ਕਰਾਵਾਂਗੇ।') : '',
          d.asksNumber ? t('Only the last 4 characters are kept.', 'सिर्फ़ आख़िरी 4 अक्षर रखे जाते हैं।', 'ਸਿਰਫ਼ ਆਖ਼ਰੀ 4 ਅੱਖਰ ਰੱਖੇ ਜਾਂਦੇ ਹਨ।') : '',
          !d.asksExpiry && !d.asksNumber ? docHelp(t, d) : '',
        ].filter(Boolean).join(' ')}</T>
        <Spacer />
        <Button size="tall" disabled={!ok} onPress={save}>{t('Save', 'सेव करें', 'ਸੇਵ ਕਰੋ')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninDocUploadScreen;
