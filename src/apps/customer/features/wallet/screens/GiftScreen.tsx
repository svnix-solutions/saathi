/** Design page 14 (CUSTOMER J) · Language, gifting, support and society — screen 49 · Gift a visit. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, CharacterTile, Grid, H, H2, Input, Lft, Pill, Screen, Spacer, T, palette, useBack, useNav, useT } from '@/native/ui';
import { rupees } from '@/domain';
import { GIFTS, GIFT_DEFAULTS, type Tri } from '../data';
import { hasTenDigits } from '../rules';

export function GiftScreen() {
  const t = useT();
  const nav = useNav();
  const back = useBack('account');
  const tri = (x: Tri) => t(x.en, x.hi, x.pa);
  const [gift, setGift] = useState(GIFT_DEFAULTS.gift);
  const [name, setName] = useState(() => tri(GIFT_DEFAULTS.name));
  const [phone, setPhone] = useState(GIFT_DEFAULTS.phone);
  const [msg, setMsg] = useState(() => tri(GIFT_DEFAULTS.msg));
  const price = GIFTS[gift].price;
  const send = () => {
    if (!name.trim() || !hasTenDigits(phone)) { nav.toast(t('Add their name and a 10-digit number', 'नाम और 10 अंकों का नंबर डालें', 'ਨਾਂ ਅਤੇ 10 ਅੰਕਾਂ ਦਾ ਨੰਬਰ ਪਾਓ')); return; }
    nav.toast(t(`Gift sent to ${name} on WhatsApp`, `${name} को WhatsApp पर उपहार भेजा गया`, `${name} ਨੂੰ WhatsApp ’ਤੇ ਤੋਹਫ਼ਾ ਭੇਜਿਆ ਗਿਆ`));
    setTimeout(back, 1200);
  };
  return (
    <Screen>
      <BackHeader title={t('Gift a visit', 'विज़िट उपहार दें', 'ਵਿਜ਼ਿਟ ਤੋਹਫ਼ੇ ਵਿੱਚ ਦਿਓ')} fallback="account" />
      <Card tone="yellow">
        <Lft gap={10}>
          <CharacterTile name="hero" size={64} />
          <View style={styles.grow}>
            <H size={17} color={palette.ink}>{t('A clean home, from you', 'आपकी ओर से साफ़ घर', 'ਤੁਹਾਡੇ ਵੱਲੋਂ ਸਾਫ਼ ਘਰ')}</H>
            <T s color={palette.ink}>{t('For parents, a new mother, a friend moving in', 'माता-पिता, नई माँ या नए घर में आए दोस्त के लिए', 'ਮਾਪਿਆਂ, ਨਵੀਂ ਮਾਂ ਜਾਂ ਨਵੇਂ ਘਰ ਆਏ ਦੋਸਤ ਲਈ')}</T>
          </View>
        </Lft>
      </Card>
      <H2>{t('Choose a gift', 'उपहार चुनें', 'ਤੋਹਫ਼ਾ ਚੁਣੋ')}</H2>
      <Grid cols={3}>
        {GIFTS.map((g, i) => (
          <Pill key={g.k} sel={gift === i} onPress={() => setGift(i)}>
            {t(g.k, g.hi, g.pa) + '\n'}<T s m>{rupees(g.price)}</T>
          </Pill>
        ))}
      </Grid>
      <H2>{t('Who is it for?', 'यह किसके लिए है?', 'ਇਹ ਕਿਸ ਲਈ ਹੈ?')}</H2>
      <Input small value={name} onChangeText={setName} placeholder={t('Their name', 'उनका नाम', 'ਉਹਨਾਂ ਦਾ ਨਾਂ')} />
      <Input small prefix="+91" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder={t('Mobile number', 'मोबाइल नंबर', 'ਮੋਬਾਈਲ ਨੰਬਰ')} maxLength={11} />
      <Input small multiline value={msg} onChangeText={setMsg} placeholder={t('Add a message', 'संदेश लिखें', 'ਸੁਨੇਹਾ ਲਿਖੋ')} style={styles.message} />
      <T s m>
        {t(
          'They get a WhatsApp message and book the time themselves. Valid 3 months.',
          'उन्हें WhatsApp पर संदेश मिलेगा और वे खुद समय बुक करेंगे। 3 महीने तक मान्य।',
          'ਉਹਨਾਂ ਨੂੰ WhatsApp ’ਤੇ ਸੁਨੇਹਾ ਮਿਲੇਗਾ ਅਤੇ ਉਹ ਆਪ ਸਮਾਂ ਬੁੱਕ ਕਰਨਗੇ। 3 ਮਹੀਨੇ ਤੱਕ ਚੱਲੇਗਾ।',
        )}
      </T>
      <Spacer />
      <Button onPress={send}>{t(`Send gift · ${rupees(price)}`, `उपहार भेजें · ${rupees(price)}`, `ਤੋਹਫ਼ਾ ਭੇਜੋ · ${rupees(price)}`)}</Button>
    </Screen>
  );
}

export default GiftScreen;

const styles = StyleSheet.create({
  grow: { flex: 1 },
  message: { minHeight: 54 },
});
