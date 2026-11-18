import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Chevron, H, H2, IconTile, Lft, Page, Screen, Sheet, T, useNav, useT } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { DocumentCard } from '../components/DocumentCard';
import { partnerDocs, type PartnerDocId } from '../data';
import { useDocumentStatus } from '../hooks/useDocumentStatus';

/** Design page 32 (section 58 "WORKER I"), screen 56 · My documents. */
export function DocumentsScreen() {
  const nav = useNav();
  const t = useT();
  const { status, upload } = useDocumentStatus(() => nav.toast('Profile photo approved'));
  const [sheet, setSheet] = useState(false);
  const uploadPhoto = (how: string) => { setSheet(false); upload(); nav.toast(`${how} · uploaded, checking now`); };
  const tap = (id: PartnerDocId) => {
    if (id === 'photo' && status.photo === 'update') setSheet(true);
    else if (id === 'bank') nav.push('bank');
    else nav.toast(status[id] === 'checking' ? 'Still checking, takes a minute' : 'This document is valid');
  };
  return (
    <Page variant="bare">
      <Screen>
        <H>{t('My documents', 'मेरे कागज़')}</H>
        {partnerDocs.map((d) => {
          const s = status[d.id];
          const sub = s === 'checking' ? 'New photo · checking…' : s === 'valid' && d.id === 'photo' ? 'Updated today' : d.sub;
          return <DocumentCard key={d.id} icon={d.icon} title={d.title} status={s} sub={sub} onPress={() => tap(d.id)} />;
        })}
        <Card row onPress={() => nav.toast('Certificate saved to your phone')}>
          <Lft><IconTile name="list" /><View><H2>Training certificate</H2><T s m>Download or share</T></View></Lft>
          <Chevron />
        </Card>
        <T s m>We remind you 30 days before anything runs out.</T>
      </Screen>
      <PartnerTabs active="home" />
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t('New profile photo', 'नई प्रोफ़ाइल फ़ोटो')}</H2>
        <T s m>Plain background, face clearly seen, no cap or sunglasses.</T>
        <Button icon="cam" onPress={() => uploadPhoto('Photo taken')}>{t('Take photo', 'फ़ोटो लें')}</Button>
        <Button variant="outline" onPress={() => uploadPhoto('Photo chosen')}>{t('Choose from gallery', 'गैलरी से चुनें')}</Button>
      </Sheet>
    </Page>
  );
}

export default DocumentsScreen;
