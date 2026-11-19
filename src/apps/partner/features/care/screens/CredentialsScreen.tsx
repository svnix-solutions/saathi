/** Design page 38 · 5 · Licence and registration: council number, expiry, specialisations, supervising doctor, training. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BackHeader, Button, Card, H, H2, Icon, IconTile, KeyValue, ListCard, Lft, Page, PhotoTile, Row, Screen, Sheet, T, Tag, palette, useNav, useT, useTheme,
} from '@/native/ui';
import { ButtonRow } from '../components/ButtonRow';
import { WordChips } from '../components/WordChips';
import { credentials, roleName } from '../data';
import { useCareState } from '../state';

export function CredentialsScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useCareState();
  const role = st.careRole ?? 'nurse';
  const cr = credentials[role];
  const renewSoon = cr.daysLeft < 90 && !st.careRenewSent;
  const [sheet, setSheet] = useState<'renew' | 'upload' | null>(null);
  const [renewPhoto, setRenewPhoto] = useState(false);
  const sendRenewal = () => {
    if (!renewPhoto) { nav.toast(t('Add a photo of the renewal receipt first', 'पहले रिन्यूअल रसीद की फ़ोटो जोड़ें', 'ਪਹਿਲਾਂ ਰੀਨਿਊਅਲ ਰਸੀਦ ਦੀ ਫ਼ੋਟੋ ਜੋੜੋ')); return; }
    set({ careRenewSent: true });
    setSheet(null);
    nav.toast(t('Sent. Saathi checks it with the council in 2 days.', 'भेज दिया। Saathi 2 दिन में काउंसिल से जाँचेगा।', 'ਭੇਜ ਦਿੱਤਾ। Saathi 2 ਦਿਨਾਂ ਵਿੱਚ ਕੌਂਸਲ ਤੋਂ ਜਾਂਚੇਗਾ।'));
  };
  const uploaded = (how: string) => {
    setSheet(null);
    nav.toast(`${how} · ${t('certificate sent for checking', 'सर्टिफ़िकेट जाँच के लिए भेजा', 'ਸਰਟੀਫ਼ਿਕੇਟ ਜਾਂਚ ਲਈ ਭੇਜਿਆ')}`);
  };

  return (
    <Page>
      <Screen>
        <BackHeader title={t('Licence and registration', 'लाइसेंस और रजिस्ट्रेशन', 'ਲਾਇਸੈਂਸ ਅਤੇ ਰਜਿਸਟ੍ਰੇਸ਼ਨ')} fallback="care.today" />
        <Card style={{ gap: 9 }}>
          <Row>
            <Lft style={styles.fill}>
              <IconTile name="shield" />
              <View style={styles.fill}><H2>{t(...cr.council)}</H2><T s m>{t(...cr.qualification)}</T></View>
            </Lft>
          </Row>
          <View>
            <T s m>{t('Registration no.', 'रजिस्ट्रेशन नंबर', 'ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨੰਬਰ')}</T>
            <T b>{cr.number}</T>
          </View>
          <KeyValue label={t('Valid till', 'कब तक मान्य', 'ਕਦੋਂ ਤੱਕ ਜਾਇਜ਼')} value={t(...cr.expires)} />
          <Row>
            <T s m>{t('Status', 'स्थिति', 'ਸਥਿਤੀ')}</T>
            {st.careRenewSent
              ? <Tag tone="y">{t('Renewal checking', 'रिन्यूअल की जाँच', 'ਰੀਨਿਊਅਲ ਦੀ ਜਾਂਚ')}</Tag>
              : <Tag tone="g">{t('Verified with the council', 'काउंसिल से सत्यापित', 'ਕੌਂਸਲ ਤੋਂ ਤਸਦੀਕਸ਼ੁਦਾ')}</Tag>}
          </Row>
        </Card>

        {renewSoon && (
          <Card tone="yellow" style={{ gap: 8 }}>
            <T b color={palette.ink}>{t(`Renew within ${cr.daysLeft} days`, `${cr.daysLeft} दिन में रिन्यू करें`, `${cr.daysLeft} ਦਿਨਾਂ ਵਿੱਚ ਰੀਨਿਊ ਕਰੋ`)}</T>
            <T s color={palette.ink}>{t('After the expiry date you cannot take care visits until it is renewed.', 'तारीख़ निकलने के बाद रिन्यू होने तक आप विज़िट नहीं ले सकेंगे।', 'ਤਰੀਕ ਲੰਘਣ ਤੋਂ ਬਾਅਦ ਰੀਨਿਊ ਹੋਣ ਤੱਕ ਤੁਸੀਂ ਵਿਜ਼ਿਟਾਂ ਨਹੀਂ ਲੈ ਸਕੋਗੇ।')}</T>
            <Button onPress={() => setSheet('renew')}>{t('Renew registration', 'रजिस्ट्रेशन रिन्यू करें', 'ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਰੀਨਿਊ ਕਰੋ')}</Button>
          </Card>
        )}

        <H2>{t('Specialisations', 'विशेषज्ञता', 'ਮਾਹਰਤਾ')}</H2>
        <WordChips items={cr.specialisations.map((s) => t(...s))} />

        <H2>{t('Supervising doctor', 'निगरानी वाले डॉक्टर', 'ਨਿਗਰਾਨੀ ਵਾਲੇ ਡਾਕਟਰ')}</H2>
        <Card row>
          <Lft style={styles.fill}>
            <IconTile name="user" />
            <View style={styles.fill}><H2>{t(...cr.supervisor.name)}</H2><T s m>{t(...cr.supervisor.role)}</T></View>
          </Lft>
          <IconTile name="call" onPress={() => nav.toast(t(`Calling ${cr.supervisor.name[0]}`, `${cr.supervisor.name[1]} को कॉल`, `${cr.supervisor.name[2]} ਨੂੰ ਕਾਲ`))} />
        </Card>

        <H2>{t('Training done', 'पूरी की गई ट्रेनिंग', 'ਪੂਰੀ ਕੀਤੀ ਟ੍ਰੇਨਿੰਗ')}</H2>
        <ListCard>
          {cr.training.map((x) => (
            <Lft key={x.name[0]} style={styles.top}>
              <Icon name="check" size={16} color={c.accent} />
              <View style={styles.fill}><T b>{t(...x.name)}</T><T s m>{t(...x.when)}</T></View>
            </Lft>
          ))}
        </ListCard>

        <ButtonRow>
          <Button variant="outline" icon="cam" onPress={() => setSheet('upload')}>{t('Upload certificate', 'सर्टिफ़िकेट अपलोड करें', 'ਸਰਟੀਫ਼ਿਕੇਟ ਅੱਪਲੋਡ ਕਰੋ')}</Button>
          <Button variant="plain" onPress={() => nav.push('training')}>{t('More training', 'और ट्रेनिंग', 'ਹੋਰ ਟ੍ਰੇਨਿੰਗ')}</Button>
        </ButtonRow>
        <T s m>{t(`Saathi checks every ${roleName(t, role).toLowerCase()}'s registration with the council every year.`, `Saathi हर साल काउंसिल से हर ${roleName(t, role)} का रजिस्ट्रेशन जाँचता है।`, `Saathi ਹਰ ਸਾਲ ਕੌਂਸਲ ਤੋਂ ਹਰ ${roleName(t, role)} ਦੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਜਾਂਚਦਾ ਹੈ।`)}</T>
      </Screen>

      <Sheet visible={sheet === 'renew'} onClose={() => setSheet(null)}>
        <H>{t('Renew registration', 'रजिस्ट्रेशन रिन्यू करें', 'ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਰੀਨਿਊ ਕਰੋ')}</H>
        <T s m>{t(`Renew on the ${cr.council[0]} website, then add the receipt here.`, `${cr.council[1]} की वेबसाइट पर रिन्यू करें, फिर रसीद यहाँ जोड़ें।`, `${cr.council[2]} ਦੀ ਵੈੱਬਸਾਈਟ ਤੇ ਰੀਨਿਊ ਕਰੋ, ਫਿਰ ਰਸੀਦ ਇੱਥੇ ਜੋੜੋ।`)}</T>
        <PhotoTile icon="cam" added={renewPhoto} bold onPress={() => setRenewPhoto(true)}
          label={renewPhoto ? t('Receipt added', 'रसीद जुड़ गई', 'ਰਸੀਦ ਜੁੜ ਗਈ') : t('Photo of the renewal receipt', 'रिन्यूअल रसीद की फ़ोटो', 'ਰੀਨਿਊਅਲ ਰਸੀਦ ਦੀ ਫ਼ੋਟੋ')} />
        <Button onPress={sendRenewal}>{t('Send for checking', 'जाँच के लिए भेजें', 'ਜਾਂਚ ਲਈ ਭੇਜੋ')}</Button>
        <Button variant="plain" onPress={() => setSheet(null)}>{t('Later', 'बाद में', 'ਬਾਅਦ ਵਿੱਚ')}</Button>
      </Sheet>
      <Sheet visible={sheet === 'upload'} onClose={() => setSheet(null)}>
        <H2>{t('Upload a certificate', 'सर्टिफ़िकेट अपलोड करें', 'ਸਰਟੀਫ਼ਿਕੇਟ ਅੱਪਲੋਡ ਕਰੋ')}</H2>
        <T s m>{t('A new course, a renewal or a degree. All four corners in the photo.', 'नया कोर्स, रिन्यूअल या डिग्री। फ़ोटो में चारों कोने दिखें।', 'ਨਵਾਂ ਕੋਰਸ, ਰੀਨਿਊਅਲ ਜਾਂ ਡਿਗਰੀ। ਫ਼ੋਟੋ ਵਿੱਚ ਚਾਰੇ ਕੋਨੇ ਦਿਸਣ।')}</T>
        <Button icon="cam" onPress={() => uploaded(t('Photo taken', 'फ़ोटो ली', 'ਫ਼ੋਟੋ ਲਈ'))}>{t('Take photo', 'फ़ोटो लें', 'ਫ਼ੋਟੋ ਲਓ')}</Button>
        <Button variant="outline" onPress={() => uploaded(t('File chosen', 'फ़ाइल चुनी', 'ਫ਼ਾਈਲ ਚੁਣੀ'))}>{t('Choose a PDF or photo', 'PDF या फ़ोटो चुनें', 'PDF ਜਾਂ ਫ਼ੋਟੋ ਚੁਣੋ')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 }, top: { alignItems: 'flex-start' } });

export default CredentialsScreen;
