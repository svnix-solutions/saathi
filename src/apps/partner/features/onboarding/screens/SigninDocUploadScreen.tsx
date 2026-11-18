import React, { useState } from 'react';
import { BackHeader, Button, Grid, H2, Input, Page, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { docType, type DocId } from '@/data/professions';
import { DocPhotoTile } from '../components/DocPhotoTile';
import { SignupSteps } from '../components/SignupSteps';
import { docNumberLabels, sampleCertificate } from '../data';
import { addedOf, maskTail, typeMasked } from '../signup';
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
  const [until, setUntil] = useState(sample ? sampleCertificate.validUntil : '');
  const ok = front && (!d.hasBack || back) && (!d.asksNumber || num.length >= 4) && (!d.asksExpiry || until.trim().length >= 4);
  const [nl, nlHi] = docNumberLabels[d.id] ?? ['Number', 'नंबर'];
  const save = () => {
    set({ docsAdded: [...addedOf(st).filter((x) => x !== d.id), d.id] });
    nav.toast(t(`${d.name} added`, `${d.nameHi} जुड़ गया`));
    nav.back();
  };
  return (
    <Page>
      <Screen>
        <SignupSteps step={6} label={false} />
        <BackHeader title={t(d.name, d.nameHi)} onBack={nav.back} />
        {d.hasBack
          ? <Grid cols={2}>
            <DocPhotoTile added={front} onPress={() => setFront(!front)} addedLabel={t('Front added', 'आगे का हिस्सा जुड़ा')} addLabel={t('Add front side', 'आगे का हिस्सा जोड़ें')} />
            <DocPhotoTile added={back} onPress={() => setBack(!back)} addedLabel={t('Back added', 'पीछे का हिस्सा जुड़ा')} addLabel={t('Add back side', 'पीछे का हिस्सा जोड़ें')} />
          </Grid>
          : <DocPhotoTile added={front} onPress={() => setFront(!front)} addedLabel={t('Photo added', 'फ़ोटो जुड़ गई')} addLabel={t('Add photo', 'फ़ोटो जोड़ें')} />}
        {d.asksNumber && <>
          <H2>{t(nl, nlHi)}</H2>
          <Input value={maskTail(num)} onChangeText={(v) => setNum(typeMasked(num, v))} placeholder="XXXXXX3307" />
        </>}
        {d.asksExpiry && <>
          <H2>{t('Valid until', 'कब तक मान्य')}</H2>
          <Input value={until} onChangeText={setUntil} placeholder={sampleCertificate.validUntil} />
        </>}
        <T s m>{[
          d.asksExpiry ? t('We remind you 30 days before it runs out.', 'ख़त्म होने से 30 दिन पहले याद दिलाएँगे।') : '',
          d.asksNumber ? t('Only the last 4 characters are kept.', 'सिर्फ़ आख़िरी 4 अक्षर रखे जाते हैं।') : '',
          !d.asksExpiry && !d.asksNumber ? d.help : '',
        ].filter(Boolean).join(' ')}</T>
        <Spacer />
        <Button size="tall" disabled={!ok} onPress={save}>{t('Save', 'सेव करें')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninDocUploadScreen;
