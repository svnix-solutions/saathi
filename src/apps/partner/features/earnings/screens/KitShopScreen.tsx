import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, H, H2, Hr, Icon, IconTile, Lft, ListCard, Page, Row, Screen, Sheet, Spacer, T, Tag, useNav, useT, useTheme } from '@/native/ui';
import { rupees } from '@/domain';
import { AddToggle } from '../components/AddToggle';
import { AmountLine } from '../components/AmountLine';
import { kitItems, tx } from '../data';

/** Design page 31 · screen 53: uniform and cleaning kit at cost, paid from the next payout. */
export function KitShopScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [cart, setCart] = useState<string[]>(['uniform', 'cloths']);
  const [sheet, setSheet] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const inCart = kitItems.filter((k) => cart.includes(k.id));
  const total = inCart.reduce((a, k) => a + k.price, 0);
  const toggle = (id: string) => { setOrdered(false); setCart((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])); };
  return (
    <Page variant="bare">
      <Screen>
        <Row style={styles.wrap}><H>{t('Kit shop', 'किट दुकान', 'ਕਿੱਟ ਦੁਕਾਨ')}</H><Tag tone="n">{t('Paid from earnings', 'कमाई से कटेगा', 'ਕਮਾਈ ਵਿੱਚੋਂ ਕੱਟੇਗਾ')}</Tag></Row>
        <ListCard>
          {kitItems.map((k) => (
            <Row key={k.id}>
              <Lft style={styles.grow}>
                <IconTile name={k.icon} />
                <View style={styles.grow}><T b>{tx(t, k.name)}</T><T s m>{tx(t, k.sub)}</T></View>
              </Lft>
              {k.free ? <Tag tone="n">{t('Free', 'मुफ़्त', 'ਮੁਫ਼ਤ')}</Tag> : <AddToggle on={cart.includes(k.id)} onPress={() => toggle(k.id)} />}
            </Row>
          ))}
        </ListCard>
        <Card row onPress={() => nav.toast(t('Block C hub · Gate 2, next to the milk booth', 'ब्लॉक सी हब · गेट 2, दूध बूथ के पास', 'ਬਲਾਕ ਸੀ ਹੱਬ · ਗੇਟ 2, ਦੁੱਧ ਬੂਥ ਦੇ ਨਾਲ'))}>
          <View style={styles.grow}><H2>{t('Pick up at', 'यहाँ से लें', 'ਇੱਥੋਂ ਲਓ')}</H2><T s m>{t('Block C hub · open 7 am to 7 pm', 'ब्लॉक सी हब · सुबह 7 से शाम 7 बजे तक खुला', 'ਬਲਾਕ ਸੀ ਹੱਬ · ਸਵੇਰੇ 7 ਤੋਂ ਸ਼ਾਮ 7 ਵਜੇ ਤੱਕ ਖੁੱਲ੍ਹਾ')}</T></View>
          <Icon name="pin" color={c.accent} />
        </Card>
        {ordered && <Card tone="mint"><H2>{t('Order placed', 'ऑर्डर हो गया', 'ਆਰਡਰ ਹੋ ਗਿਆ')}</H2><T s m>{t('Ready to pick up tomorrow after 10 am.', 'कल सुबह 10 बजे के बाद ले सकती हैं।', 'ਕੱਲ੍ਹ ਸਵੇਰੇ 10 ਵਜੇ ਤੋਂ ਬਾਅਦ ਲੈ ਸਕਦੇ ਹੋ।')}</T></Card>}
        <Spacer />
        <Button disabled={cart.length === 0 || ordered} onPress={() => setSheet(true)}>
          {ordered ? t('Ordered', 'ऑर्डर हो गया', 'ਆਰਡਰ ਹੋ ਗਿਆ') : t(`Order ${cart.length} items · ${rupees(total)}`, `${cart.length} चीज़ें ऑर्डर करें · ${rupees(total)}`, `${cart.length} ਚੀਜ਼ਾਂ ਆਰਡਰ ਕਰੋ · ${rupees(total)}`)}
        </Button>
      </Screen>
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t('Pay from earnings', 'कमाई से भुगतान', 'ਕਮਾਈ ਵਿੱਚੋਂ ਭੁਗਤਾਨ')}</H2>
        <Card style={styles.summary}>
          {inCart.map((k) => <AmountLine key={k.id} label={tx(t, k.name)} value={k.free ? t('Free', 'मुफ़्त', 'ਮੁਫ਼ਤ') : rupees(k.price)} />)}
          <Hr />
          <Row><T b style={styles.grow}>{t("Taken from Monday's payout", 'सोमवार के भुगतान से कटेगा', 'ਸੋਮਵਾਰ ਦੇ ਭੁਗਤਾਨ ਵਿੱਚੋਂ ਕੱਟੇਗਾ')}</T><T b>{rupees(total)}</T></Row>
        </Card>
        <T s m>{t('Nothing to pay now. At cost, no profit for Saathi.', 'अभी कुछ नहीं देना। लागत पर, Saathi का कोई मुनाफ़ा नहीं।', 'ਹੁਣ ਕੁਝ ਨਹੀਂ ਦੇਣਾ। ਲਾਗਤ ਤੇ, Saathi ਦਾ ਕੋਈ ਮੁਨਾਫ਼ਾ ਨਹੀਂ।')}</T>
        <Button onPress={() => { setSheet(false); setOrdered(true); nav.toast(t(`Ordered · ${rupees(total)} from Monday's payout`, `ऑर्डर हो गया · सोमवार के भुगतान से ${rupees(total)}`, `ਆਰਡਰ ਹੋ ਗਿਆ · ਸੋਮਵਾਰ ਦੇ ਭੁਗਤਾਨ ਵਿੱਚੋਂ ${rupees(total)}`)); }}>{t('Place order', 'ऑर्डर करें', 'ਆਰਡਰ ਕਰੋ')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  summary: { gap: 7 },
  wrap: { flexWrap: 'wrap', rowGap: 6 },
});

export default KitShopScreen;
