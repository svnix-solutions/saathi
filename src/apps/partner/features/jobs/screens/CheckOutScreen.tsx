/** Design page 22 (section 54), screen 20 · Check out: time worked, tasks, photos, selfie, finish code. */
import React from 'react';
import { rupees } from '@/domain';
import { Button, Card, Check, Grid, H, H2, Lft, Page, PhotoTile, Row, Screen, Spacer, T, Tag, TopBar, useNav, useT } from '@/native/ui';
import { CheckLine } from '../components/CheckLine';
import { checkoutPhotos, checkoutPhotosDefault, photoNamesHi, photoNamesPa } from '../data';
import { useJobsState } from '../state';

export function CheckOutScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useJobsState();
  const job = st.job;
  const photos = st.photos ?? checkoutPhotosDefault;
  const addPhoto = () => {
    const next = checkoutPhotos.find((p) => !photos.includes(p)) ?? `Photo ${photos.length + 1}`;
    set({ photos: [...photos, next] });
    nav.toast(t('Photo added', 'फ़ोटो जुड़ गई', 'ਫ਼ੋਟੋ ਜੁੜ ਗਈ'));
  };
  const removePhoto = (p: string) => { set({ photos: photos.filter((x) => x !== p) }); nav.toast(t('Photo removed', 'फ़ोटो हटाई', 'ਫ਼ੋਟੋ ਹਟਾਈ')); };
  const selfie = !!st.selfieOut;
  const timeCard = { paddingVertical: 9, paddingHorizontal: 4, alignItems: 'center' } as const;
  return (
    <Page>
      <TopBar><Row><TopBar.Heading>{t('Check out', 'चेक-आउट', 'ਚੈੱਕ-ਆਊਟ')}</TopBar.Heading><Tag>{t('Job', 'काम', 'ਕੰਮ')} {job.id}</Tag></Row></TopBar>
      <Screen>
        <Grid cols={3}>
          <Card style={timeCard}><T s m>{t('In', 'आए', 'ਆਏ')}</T><T b>11:08</T></Card>
          <Card style={timeCard}><T s m>{t('Out', 'गए', 'ਗਏ')}</T><T b>12:10</T></Card>
          <Card sel style={timeCard}><T s m>{t('Worked', 'काम किया', 'ਕੰਮ ਕੀਤਾ')}</T><T b center>{t('1 hr 2 min', '1 घंटा 2 मिनट', '1 ਘੰਟਾ 2 ਮਿੰਟ')}</T></Card>
        </Grid>
        <Card row onPress={() => nav.back()}>
          <Lft style={{ flex: 1 }}><Check on={job.done.length === job.tasks.length} size={24} /><H2 style={{ flex: 1 }}>{t(`${job.done.length} of ${job.tasks.length} tasks done`, `${job.tasks.length} में से ${job.done.length} काम पूरे`, `${job.tasks.length} ਵਿੱਚੋਂ ${job.done.length} ਕੰਮ ਪੂਰੇ`)}</H2></Lft>
        </Card>
        <H2>{t('Photos of finished work', 'पूरे काम की फ़ोटो', 'ਪੂਰੇ ਕੰਮ ਦੀਆਂ ਫ਼ੋਟੋਆਂ')}</H2>
        <Grid cols={3}>
          {photos.map((p) => <PhotoTile key={p} added height={66} label={t(p, photoNamesHi[p], photoNamesPa[p])} onPress={() => removePhoto(p)} />)}
          <PhotoTile height={66} bold label={t('+ Add', '+ जोड़ें', '+ ਜੋੜੋ')} onPress={addPhoto} />
        </Grid>
        <CheckLine on={selfie} sel={!selfie} icon="user" title={t('Check-out selfie', 'चेक-आउट सेल्फ़ी', 'ਚੈੱਕ-ਆਊਟ ਸੈਲਫ਼ੀ')}
          sub={selfie ? t('Added', 'जुड़ गई', 'ਜੁੜ ਗਈ') : t("At the customer's door", 'ग्राहक के दरवाज़े पर', 'ਗਾਹਕ ਦੇ ਦਰਵਾਜ਼ੇ ਤੇ')} onPress={() => nav.push('selfie', { mode: 'out' })} />
        <CheckLine sel={selfie} title={t('Finish code', 'फ़िनिश कोड', 'ਫ਼ਿਨਿਸ਼ ਕੋਡ')} sub={t('The customer gives one of two codes; it closes the job', 'ग्राहक दो में से एक कोड देगा; इससे काम बंद होगा', 'ਗਾਹਕ ਦੋ ਵਿੱਚੋਂ ਇੱਕ ਕੋਡ ਦੇਵੇਗਾ; ਇਸ ਨਾਲ ਕੰਮ ਬੰਦ ਹੋਵੇਗਾ')}
          onPress={() => (selfie ? nav.push('finishCode') : nav.toast(t('Take the check-out selfie first', 'पहले चेक-आउट सेल्फ़ी लें', 'ਪਹਿਲਾਂ ਚੈੱਕ-ਆਊਟ ਸੈਲਫ਼ੀ ਲਓ')))} />
        <Spacer />
        <Row><T m>{t('You earn', 'आपकी कमाई', 'ਤੁਹਾਡੀ ਕਮਾਈ')}</T><H>{rupees(job.earn)}</H></Row>
        {selfie
          ? <Button size="tall" onPress={() => nav.push('finishCode')}>{t('Ask for the finish code', 'फ़िनिश कोड पूछें', 'ਫ਼ਿਨਿਸ਼ ਕੋਡ ਪੁੱਛੋ')}</Button>
          : <Button size="tall" disabled={photos.length === 0} onPress={() => nav.push('selfie', { mode: 'out' })}>{t('Take selfie and check out', 'सेल्फ़ी लें और चेक-आउट करें', 'ਸੈਲਫ਼ੀ ਲਓ ਅਤੇ ਚੈੱਕ-ਆਊਟ ਕਰੋ')}</Button>}
      </Screen>
    </Page>
  );
}

export default CheckOutScreen;
