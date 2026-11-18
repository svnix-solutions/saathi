/** Design page 17 (CUSTOMER I) · Membership, protection and shared homes — screen 61 · Damage claim. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Grid, H, H2, IconTile, Input, Lft, Row, Screen, Spacer, T, Tag, useNav, useT, useTheme } from '@/native/ui';
import { rupees } from '@/domain';
import { useCustomerState } from '../../../state';
import { ClaimSteps } from '../components/ClaimSteps';
import { ItemChip } from '../components/ItemChip';
import { PhotoSlots } from '../components/PhotoSlots';
import { CLAIM_DEFAULTS, COVER, DAMAGE_ITEMS, MAX_CLAIM_PHOTOS, OTHER_ITEM, type Tri } from '../data';
import { claimProblem } from '../rules';

export function DamageClaimScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useCustomerState();
  const tri = (x: Tri) => t(x.en, x.hi, x.pa);
  const other = tri(OTHER_ITEM);
  const [item, setItem] = useState(() => tri(CLAIM_DEFAULTS.item));
  const [value, setValue] = useState(CLAIM_DEFAULTS.value);
  const [photos, setPhotos] = useState(CLAIM_DEFAULTS.photos);
  const [sent, setSent] = useState(false);
  const cap = st.plus ? COVER.plus : COVER.basic;
  const checking = t('Being checked', 'जाँच हो रही है', 'ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ');
  const valueLabel = t('Value', 'क़ीमत', 'ਕੀਮਤ');
  const send = () => {
    const problem = claimProblem(item, photos, value, cap, other);
    if (problem) { nav.toast(tri(problem)); return; }
    setSent(true);
    nav.toast(t('Claim sent · we reply in one working day', 'दावा भेजा गया · हम एक कामकाजी दिन में जवाब देंगे', 'ਦਾਅਵਾ ਭੇਜਿਆ ਗਿਆ · ਅਸੀਂ ਇੱਕ ਕੰਮ ਵਾਲੇ ਦਿਨ ਵਿੱਚ ਜਵਾਬ ਦਿਆਂਗੇ'));
  };
  if (sent) {
    return (
      <Screen>
        <BackHeader title={t('Damage protection', 'नुकसान सुरक्षा', 'ਨੁਕਸਾਨ ਤੋਂ ਸੁਰੱਖਿਆ')} fallback="home" />
        <Card sel>
          <Row><H2 style={styles.grow}>{t('Claim #C-118', 'दावा #C-118', 'ਦਾਅਵਾ #C-118')}</H2><Tag>{checking}</Tag></Row>
          <T s m style={{ marginTop: 4 }}>{`${item} · ${rupees(Number(value) || 0)} · ${t('visit #2041', 'विज़िट #2041', 'ਵਿਜ਼ਿਟ #2041')}`}</T>
        </Card>
        <ClaimSteps steps={[
          { title: t('Claim sent', 'दावा भेजा', 'ਦਾਅਵਾ ਭੇਜਿਆ'), sub: t(`Today, with ${photos} photos`, `आज, ${photos} फ़ोटो के साथ`, `ਅੱਜ, ${photos} ਫ਼ੋਟੋਆਂ ਨਾਲ`), done: true },
          { title: checking, sub: t('We talk to Sunita and look at the photos', 'हम सुनीता से बात करते हैं और फ़ोटो देखते हैं', 'ਅਸੀਂ ਸੁਨੀਤਾ ਨਾਲ ਗੱਲ ਕਰਦੇ ਹਾਂ ਅਤੇ ਫ਼ੋਟੋਆਂ ਦੇਖਦੇ ਹਾਂ'), done: true },
          { title: t('Decision', 'फ़ैसला', 'ਫ਼ੈਸਲਾ'), sub: t('Within one working day', 'एक कामकाजी दिन में', 'ਇੱਕ ਕੰਮ ਵਾਲੇ ਦਿਨ ਵਿੱਚ'), done: false },
          { title: t('Paid', 'भुगतान', 'ਭੁਗਤਾਨ'), sub: t('Into your Saathi wallet or bank', 'आपके Saathi वॉलेट या बैंक में', 'ਤੁਹਾਡੇ Saathi ਵਾਲੇਟ ਜਾਂ ਬੈਂਕ ਵਿੱਚ'), done: false },
        ]} />
        <T s m>
          {t(
            'You do not have to do anything else. We will message you here and on WhatsApp.',
            'आपको और कुछ नहीं करना है। हम आपको यहाँ और WhatsApp पर संदेश भेजेंगे।',
            'ਤੁਹਾਨੂੰ ਹੋਰ ਕੁਝ ਨਹੀਂ ਕਰਨਾ। ਅਸੀਂ ਤੁਹਾਨੂੰ ਇੱਥੇ ਅਤੇ WhatsApp ’ਤੇ ਸੁਨੇਹਾ ਭੇਜਾਂਗੇ।',
          )}
        </T>
        <Spacer />
        <Button onPress={() => nav.reset('home')}>{t('Back to home', 'होम पर जाएँ', 'ਹੋਮ ’ਤੇ ਜਾਓ')}</Button>
        <Button variant="outline" onPress={() => nav.push('supportChat')}>{t('Talk to support', 'सहायता से बात करें', 'ਸਹਾਇਤਾ ਨਾਲ ਗੱਲ ਕਰੋ')}</Button>
      </Screen>
    );
  }
  return (
    <Screen>
      <BackHeader title={t('Damage protection', 'नुकसान सुरक्षा', 'ਨੁਕਸਾਨ ਤੋਂ ਸੁਰੱਖਿਆ')} fallback="home" />
      <Card sel>
        <Lft gap={10}>
          <IconTile name="shield" bg={c.card} />
          <View style={styles.grow}>
            <H2>{t('Every visit is covered', 'हर विज़िट सुरक्षित है', 'ਹਰ ਵਿਜ਼ਿਟ ਸੁਰੱਖਿਅਤ ਹੈ')}</H2>
            <T s m>{t(`Up to ${rupees(COVER.basic)} · ${rupees(COVER.plus)} with Plus`, `${rupees(COVER.basic)} तक · प्लस के साथ ${rupees(COVER.plus)}`, `${rupees(COVER.basic)} ਤੱਕ · ਪਲੱਸ ਨਾਲ ${rupees(COVER.plus)}`)}</T>
          </View>
        </Lft>
      </Card>
      <H>{t('What was damaged?', 'क्या टूटा या ख़राब हुआ?', 'ਕੀ ਟੁੱਟਿਆ ਜਾਂ ਖ਼ਰਾਬ ਹੋਇਆ?')}</H>
      <Input small value={item === other ? '' : item} onChangeText={setItem} placeholder={t('Describe the item', 'चीज़ के बारे में बताएँ', 'ਚੀਜ਼ ਬਾਰੇ ਦੱਸੋ')} />
      <Lft gap={6} style={styles.wrap}>
        {DAMAGE_ITEMS.slice(1).map((x) => <ItemChip key={x.en} label={tri(x)} selected={item === tri(x)} onPress={() => setItem(tri(x))} />)}
      </Lft>
      <Grid cols={2}>
        <Card style={styles.centre} onPress={() => nav.push('bookings')}><T s m>{t('Visit', 'विज़िट', 'ਵਿਜ਼ਿਟ')}</T><T b>{t('#2041 · today', '#2041 · आज', '#2041 · ਅੱਜ')}</T></Card>
        <Card style={{ alignItems: 'center', paddingVertical: 6 }}>
          <T s m>{valueLabel}</T>
          <Input small prefix="₹" value={value} onChangeText={(v) => setValue(v.replace(/\D/g, ''))} keyboardType="number-pad" accessibilityLabel={valueLabel}
            style={{ borderWidth: 0, padding: 0, backgroundColor: 'transparent', justifyContent: 'center', alignSelf: 'stretch' }} />
        </Card>
      </Grid>
      <H2>{t('Photos', 'फ़ोटो', 'ਫ਼ੋਟੋਆਂ')}</H2>
      <PhotoSlots count={photos} max={MAX_CLAIM_PHOTOS} onAdd={() => setPhotos(photos + 1)}
        onRemove={(i) => { setPhotos(photos - 1); nav.toast(t(`Photo ${i + 1} removed`, `फ़ोटो ${i + 1} हटाई गई`, `ਫ਼ੋਟੋ ${i + 1} ਹਟਾਈ ਗਈ`)); }} />
      <T s m>
        {t(
          'Report within 24 hours. We reply in one working day and pay into your wallet or bank.',
          '24 घंटे के अंदर बताएँ। हम एक कामकाजी दिन में जवाब देते हैं और आपके वॉलेट या बैंक में पैसे भेजते हैं।',
          '24 ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਦੱਸੋ। ਅਸੀਂ ਇੱਕ ਕੰਮ ਵਾਲੇ ਦਿਨ ਵਿੱਚ ਜਵਾਬ ਦਿੰਦੇ ਹਾਂ ਅਤੇ ਤੁਹਾਡੇ ਵਾਲੇਟ ਜਾਂ ਬੈਂਕ ਵਿੱਚ ਪੈਸੇ ਭੇਜਦੇ ਹਾਂ।',
        )}
      </T>
      <Spacer />
      <Button onPress={send}>{t('Send claim', 'दावा भेजें', 'ਦਾਅਵਾ ਭੇਜੋ')}</Button>
    </Screen>
  );
}

export default DamageClaimScreen;

const styles = StyleSheet.create({
  grow: { flex: 1 },
  wrap: { flexWrap: 'wrap' },
  centre: { alignItems: 'center' },
});
