/** Design page 14 (CUSTOMER J) · Language, gifting, support and society — screen 49 · Gift a visit. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, CharacterTile, Grid, H, H2, Input, Lft, Pill, Screen, Spacer, T, palette, useBack, useNav, useT } from '@/native/ui';
import { rupees } from '@/domain';
import { GIFTS, GIFT_DEFAULTS } from '../data';
import { hasTenDigits } from '../rules';

export function GiftScreen() {
  const t = useT();
  const nav = useNav();
  const back = useBack('account');
  const [gift, setGift] = useState(GIFT_DEFAULTS.gift);
  const [name, setName] = useState(GIFT_DEFAULTS.name);
  const [phone, setPhone] = useState(GIFT_DEFAULTS.phone);
  const [msg, setMsg] = useState(GIFT_DEFAULTS.msg);
  const price = GIFTS[gift].price;
  const send = () => {
    if (!name.trim() || !hasTenDigits(phone)) { nav.toast(t('Add their name and a 10-digit number', 'नाम और 10 अंकों का नंबर डालें')); return; }
    nav.toast(t(`Gift sent to ${name} on WhatsApp`, `${name} को WhatsApp पर उपहार भेजा गया`));
    setTimeout(back, 1200);
  };
  return (
    <Screen>
      <BackHeader title={t('Gift a visit', 'विज़िट उपहार दें')} fallback="account" />
      <Card tone="yellow">
        <Lft gap={10}>
          <CharacterTile name="hero" size={64} />
          <View style={styles.grow}>
            <H size={17} color={palette.ink}>{t('A clean home, from you', 'आपकी ओर से साफ़ घर')}</H>
            <T s color={palette.ink}>For parents, a new mother, a friend moving in</T>
          </View>
        </Lft>
      </Card>
      <H2>{t('Choose a gift', 'उपहार चुनें')}</H2>
      <Grid cols={3}>
        {GIFTS.map((g, i) => (
          <Pill key={g.k} sel={gift === i} onPress={() => setGift(i)}>
            {t(g.k, g.hi) + '\n'}<T s m>{rupees(g.price)}</T>
          </Pill>
        ))}
      </Grid>
      <H2>{t('Who is it for?', 'यह किसके लिए है?')}</H2>
      <Input small value={name} onChangeText={setName} placeholder="Their name" />
      <Input small prefix="+91" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Mobile number" maxLength={11} />
      <Input small multiline value={msg} onChangeText={setMsg} placeholder="Add a message" style={styles.message} />
      <T s m>They get a WhatsApp message and book the time themselves. Valid 3 months.</T>
      <Spacer />
      <Button onPress={send}>{t('Send gift', 'उपहार भेजें')} · {rupees(price)}</Button>
    </Screen>
  );
}

export default GiftScreen;

const styles = StyleSheet.create({
  grow: { flex: 1 },
  message: { minHeight: 54 },
});
