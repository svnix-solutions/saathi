import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Card, Check, H, H2, Icon, Lft, Row, Screen, T, Tag, useNav, useT, useTheme } from '@/native/ui';
import { useCommunityState } from '../state';
import { NeighbourHelpers } from '../components/NeighbourHelpers';

/** Design page 14 (CUSTOMER J) · Language, gifting, support and society — screen 51 · My society. */
export function SocietyScreen() {
  const t = useT();
  const nav = useNav();
  const [, set] = useCommunityState();
  const { c } = useTheme();
  const [joined, setJoined] = useState(false);
  const [slot, setSlot] = useState(false);
  const [guard, setGuard] = useState(true);
  const toggleOffer = () => { setJoined(!joined); nav.toast(joined ? 'Left the society offer' : '10% off added to every booking'); };
  const toggleSlot = () => { setSlot(!slot); nav.toast(slot ? 'Slot released' : 'Sunita booked for 11 am · ₹20 saved'); };
  const toggleGuard = () => { setGuard(!guard); nav.toast(guard ? 'Guard list turned off' : 'Your helpers are on the Gate 2 list'); };
  const book = (helper: string) => { set({ service: 'general', helper }); nav.push('chores', { service: 'general', helper }); };
  return (
    <Screen>
      <Row>
        <Lft>
          {nav.canGoBack && <Pressable onPress={nav.back} accessibilityRole="button" accessibilityLabel="Back"><Icon name="back" color={c.ink} /></Pressable>}
          <H>Green Park Society</H>
        </Lft>
        <Tag tone="n">Block C</Tag>
      </Row>
      <Card sel onPress={toggleOffer}>
        <Row>
          <T s b color={c.accent}>{t('Society offer', 'सोसाइटी ऑफ़र')}</T>
          {joined ? <Tag tone="g">{t('Joined', 'जुड़ गए')}</Tag> : <T s b color={c.accent}>{t('Join', 'जुड़ें')}</T>}
        </Row>
        <H2 style={[styles.offer, { marginTop: 2 }]}>10% off for all 240 flats</H2>
        <T s m>Agreed with your residents' association until March</T>
      </Card>
      <Card>
        <H2>Share a helper's morning</H2>
        <T s m>3 neighbours have Sunita 8 to 11 am. Take 11 am and save ₹20.</T>
        <Button variant={slot ? 'primary' : 'outline'} style={{ marginTop: 10, paddingVertical: 9 }} onPress={toggleSlot}>
          {slot ? t('11 am slot is yours', '11 बजे का स्लॉट आपका') : t('Take the 11 am slot', '11 बजे का स्लॉट लें')}
        </Button>
      </Card>
      <H2>Helpers your neighbours trust</H2>
      <NeighbourHelpers onBook={book} />
      <Card row onPress={toggleGuard}>
        <View style={styles.fill}><H2>Guard has the helper list</H2><T s m>Faster entry at Gate 2</T></View>
        <Check on={guard} />
      </Card>
    </Screen>
  );
}

export default SocietyScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
  offer: { fontSize: 15 },
});
