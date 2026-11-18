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
  const { status, upload } = useDocumentStatus(() => nav.toast(t('Profile photo approved', 'प्रोफ़ाइल फ़ोटो मंज़ूर', 'ਪ੍ਰੋਫ਼ਾਈਲ ਫ਼ੋਟੋ ਮਨਜ਼ੂਰ')));
  const [sheet, setSheet] = useState(false);
  const uploadPhoto = (how: string) => {
    setSheet(false);
    upload();
    nav.toast(`${how} · ${t('uploaded, checking now', 'अपलोड हुई, जाँच हो रही है', 'ਅੱਪਲੋਡ ਹੋ ਗਈ, ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ')}`);
  };
  const tap = (id: PartnerDocId) => {
    if (id === 'photo' && status.photo === 'update') setSheet(true);
    else if (id === 'bank') nav.push('bank');
    else nav.toast(status[id] === 'checking'
      ? t('Still checking, takes a minute', 'जाँच जारी है, एक मिनट लगेगा', 'ਜਾਂਚ ਜਾਰੀ ਹੈ, ਇੱਕ ਮਿੰਟ ਲੱਗੇਗਾ')
      : t('This document is valid', 'यह दस्तावेज़ मान्य है', 'ਇਹ ਦਸਤਾਵੇਜ਼ ਜਾਇਜ਼ ਹੈ'));
  };
  return (
    <Page variant="bare">
      <Screen>
        <H>{t('My documents', 'मेरे कागज़', 'ਮੇਰੇ ਕਾਗਜ਼')}</H>
        {partnerDocs.map((d) => {
          const s = status[d.id];
          const sub = s === 'checking' ? t('New photo · checking…', 'नई फ़ोटो · जाँच जारी…', 'ਨਵੀਂ ਫ਼ੋਟੋ · ਜਾਂਚ ਜਾਰੀ…')
            : s === 'valid' && d.id === 'photo' ? t('Updated today', 'आज बदली गई', 'ਅੱਜ ਬਦਲੀ ਗਈ') : t(...d.sub);
          return <DocumentCard key={d.id} icon={d.icon} title={t(...d.title)} status={s} sub={sub} onPress={() => tap(d.id)} />;
        })}
        <Card row onPress={() => nav.toast(t('Certificate saved to your phone', 'सर्टिफ़िकेट आपके फ़ोन में सेव हुआ', 'ਸਰਟੀਫ਼ਿਕੇਟ ਤੁਹਾਡੇ ਫ਼ੋਨ ਵਿੱਚ ਸੇਵ ਹੋ ਗਿਆ'))}>
          <Lft>
            <IconTile name="list" />
            <View>
              <H2>{t('Training certificate', 'ट्रेनिंग सर्टिफ़िकेट', 'ਟ੍ਰੇਨਿੰਗ ਸਰਟੀਫ਼ਿਕੇਟ')}</H2>
              <T s m>{t('Download or share', 'डाउनलोड या शेयर करें', 'ਡਾਊਨਲੋਡ ਜਾਂ ਸ਼ੇਅਰ ਕਰੋ')}</T>
            </View>
          </Lft>
          <Chevron />
        </Card>
        <T s m>{t('We remind you 30 days before anything runs out.', 'कुछ भी ख़त्म होने से 30 दिन पहले हम याद दिलाएँगे।', 'ਕੁਝ ਵੀ ਖ਼ਤਮ ਹੋਣ ਤੋਂ 30 ਦਿਨ ਪਹਿਲਾਂ ਅਸੀਂ ਯਾਦ ਕਰਾਵਾਂਗੇ।')}</T>
      </Screen>
      <PartnerTabs active="home" />
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t('New profile photo', 'नई प्रोफ़ाइल फ़ोटो', 'ਨਵੀਂ ਪ੍ਰੋਫ਼ਾਈਲ ਫ਼ੋਟੋ')}</H2>
        <T s m>{t('Plain background, face clearly seen, no cap or sunglasses.', 'सादा बैकग्राउंड, चेहरा साफ़ दिखे, टोपी या काला चश्मा नहीं।', 'ਸਾਦਾ ਬੈਕਗ੍ਰਾਊਂਡ, ਚਿਹਰਾ ਸਾਫ਼ ਦਿਸੇ, ਟੋਪੀ ਜਾਂ ਕਾਲੀ ਐਨਕ ਨਹੀਂ।')}</T>
        <Button icon="cam" onPress={() => uploadPhoto(t('Photo taken', 'फ़ोटो ली', 'ਫ਼ੋਟੋ ਲਈ'))}>{t('Take photo', 'फ़ोटो लें', 'ਫ਼ੋਟੋ ਲਓ')}</Button>
        <Button variant="outline" onPress={() => uploadPhoto(t('Photo chosen', 'फ़ोटो चुनी', 'ਫ਼ੋਟੋ ਚੁਣੀ'))}>{t('Choose from gallery', 'गैलरी से चुनें', 'ਗੈਲਰੀ ਵਿੱਚੋਂ ਚੁਣੋ')}</Button>
      </Sheet>
    </Page>
  );
}

export default DocumentsScreen;
