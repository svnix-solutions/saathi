import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, H, H2, Hr, Icon, IconTile, Lft, ListCard, Page, Row, Screen, Sheet, Spacer, T, Tag, useNav, useT, useTheme } from '@/native/ui';
import { rupees } from '@/domain';
import { AddToggle } from '../components/AddToggle';
import { AmountLine } from '../components/AmountLine';
import { kitItems } from '../data';

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
        <Row><H>{t('Kit shop', 'किट दुकान')}</H><Tag tone="n">Paid from earnings</Tag></Row>
        <ListCard>
          {kitItems.map((k) => (
            <Row key={k.id}>
              <Lft style={styles.grow}>
                <IconTile name={k.icon} />
                <View style={styles.grow}><T b>{k.name}</T><T s m>{k.sub}</T></View>
              </Lft>
              {k.free ? <Tag tone="n">Free</Tag> : <AddToggle on={cart.includes(k.id)} onPress={() => toggle(k.id)} />}
            </Row>
          ))}
        </ListCard>
        <Card row onPress={() => nav.toast('Block C hub · Gate 2, next to the milk booth')}>
          <View><H2>Pick up at</H2><T s m>Block C hub · open 7 am to 7 pm</T></View>
          <Icon name="pin" color={c.accent} />
        </Card>
        {ordered && <Card tone="mint"><H2>Order placed</H2><T s m>Ready to pick up tomorrow after 10 am.</T></Card>}
        <Spacer />
        <Button disabled={cart.length === 0 || ordered} onPress={() => setSheet(true)}>
          {ordered ? t('Ordered', 'ऑर्डर हो गया') : `${t('Order', 'ऑर्डर')} ${cart.length} items · ${rupees(total)}`}
        </Button>
      </Screen>
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t('Pay from earnings', 'कमाई से भुगतान')}</H2>
        <Card style={styles.summary}>
          {inCart.map((k) => <AmountLine key={k.id} label={k.name} value={k.free ? 'Free' : rupees(k.price)} />)}
          <Hr />
          <Row><T b>Taken from Monday's payout</T><T b>{rupees(total)}</T></Row>
        </Card>
        <T s m>Nothing to pay now. At cost, no profit for Saathi.</T>
        <Button onPress={() => { setSheet(false); setOrdered(true); nav.toast(`Ordered · ${rupees(total)} from Monday's payout`); }}>{t('Place order', 'ऑर्डर करें')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  summary: { gap: 7 },
});

export default KitShopScreen;
