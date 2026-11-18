import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Card, Check, H, H2, Icon, Lft, Row, Screen, T, Tag, useNav, useT, useTheme } from '@/native/ui';
import { NeighbourHelpers } from '../components/NeighbourHelpers';
import { useCustomerState } from '../../../state';

/** Design page 14 (CUSTOMER J) · Language, gifting, support and society — screen 51 · My society. */
export function SocietyScreen() {
  const t = useT();
  const nav = useNav();
  const [, set] = useCustomerState();
  const { c } = useTheme();
  const [joined, setJoined] = useState(false);
  const [slot, setSlot] = useState(false);
  const [guard, setGuard] = useState(true);
  const toggleOffer = () => { setJoined(!joined); nav.toast(joined ? t('Left the society offer', 'सोसाइटी ऑफ़र छोड़ दिया', 'ਸੋਸਾਇਟੀ ਆਫ਼ਰ ਛੱਡ ਦਿੱਤਾ') : t('10% off added to every booking', 'हर बुकिंग पर 10% छूट जुड़ गई', 'ਹਰ ਬੁਕਿੰਗ ਤੇ 10% ਛੋਟ ਜੁੜ ਗਈ')); };
  const toggleSlot = () => { setSlot(!slot); nav.toast(slot ? t('Slot released', 'स्लॉट छोड़ दिया', 'ਸਲਾਟ ਛੱਡ ਦਿੱਤਾ') : t('Sunita booked for 11 am · ₹20 saved', 'सुनीता 11 बजे के लिए बुक · ₹20 बचे', 'ਸੁਨੀਤਾ 11 ਵਜੇ ਲਈ ਬੁੱਕ · ₹20 ਬਚੇ')); };
  const toggleGuard = () => { setGuard(!guard); nav.toast(guard ? t('Guard list turned off', 'गार्ड लिस्ट बंद की गई', 'ਗਾਰਡ ਲਿਸਟ ਬੰਦ ਕੀਤੀ ਗਈ') : t('Your helpers are on the Gate 2 list', 'आपके हेल्पर गेट 2 की लिस्ट में हैं', 'ਤੁਹਾਡੇ ਹੈਲਪਰ ਗੇਟ 2 ਦੀ ਲਿਸਟ ਵਿੱਚ ਹਨ')); };
  const book = (helper: string) => { set({ service: 'general', helper }); nav.push('chores', { service: 'general', helper }); };
  return (
    <Screen>
      <Row>
        <Lft style={styles.shrink}>
          {nav.canGoBack && <Pressable onPress={nav.back} accessibilityRole="button" accessibilityLabel={t('Back', 'वापस', 'ਵਾਪਸ')}><Icon name="back" color={c.ink} /></Pressable>}
          <H style={styles.shrink}>{t('Green Park Society', 'ग्रीन पार्क सोसाइटी', 'ਗ੍ਰੀਨ ਪਾਰਕ ਸੋਸਾਇਟੀ')}</H>
        </Lft>
        <Tag tone="n">{t('Block C', 'ब्लॉक सी', 'ਬਲਾਕ ਸੀ')}</Tag>
      </Row>
      <Card sel onPress={toggleOffer}>
        <Row>
          <T s b color={c.accent}>{t('Society offer', 'सोसाइटी ऑफ़र', 'ਸੋਸਾਇਟੀ ਆਫ਼ਰ')}</T>
          {joined ? <Tag tone="g">{t('Joined', 'जुड़ गए', 'ਜੁੜ ਗਏ')}</Tag> : <T s b color={c.accent}>{t('Join', 'जुड़ें', 'ਜੁੜੋ')}</T>}
        </Row>
        <H2 style={[styles.offer, { marginTop: 2 }]}>{t('10% off for all 240 flats', 'सभी 240 फ़्लैट के लिए 10% छूट', 'ਸਾਰੇ 240 ਫ਼ਲੈਟਾਂ ਲਈ 10% ਛੋਟ')}</H2>
        <T s m>{t("Agreed with your residents' association until March", 'आपकी रेज़िडेंट्स एसोसिएशन के साथ मार्च तक तय', 'ਤੁਹਾਡੀ ਰੈਜ਼ੀਡੈਂਟਸ ਐਸੋਸੀਏਸ਼ਨ ਨਾਲ ਮਾਰਚ ਤੱਕ ਤੈਅ')}</T>
      </Card>
      <Card>
        <H2>{t("Share a helper's morning", 'हेल्पर की सुबह साझा करें', 'ਹੈਲਪਰ ਦੀ ਸਵੇਰ ਸਾਂਝੀ ਕਰੋ')}</H2>
        <T s m>{t('3 neighbours have Sunita 8 to 11 am. Take 11 am and save ₹20.', '3 पड़ोसियों के पास सुनीता सुबह 8 से 11 बजे तक हैं। 11 बजे का समय लें और ₹20 बचाएँ।', '3 ਗੁਆਂਢੀਆਂ ਕੋਲ ਸੁਨੀਤਾ ਸਵੇਰੇ 8 ਤੋਂ 11 ਵਜੇ ਤੱਕ ਹੈ। 11 ਵਜੇ ਦਾ ਸਮਾਂ ਲਓ ਅਤੇ ₹20 ਬਚਾਓ।')}</T>
        <Button variant={slot ? 'primary' : 'outline'} style={{ marginTop: 10, paddingVertical: 9 }} onPress={toggleSlot}>
          {slot ? t('11 am slot is yours', '11 बजे का स्लॉट आपका', '11 ਵਜੇ ਦਾ ਸਲਾਟ ਤੁਹਾਡਾ') : t('Take the 11 am slot', '11 बजे का स्लॉट लें', '11 ਵਜੇ ਦਾ ਸਲਾਟ ਲਓ')}
        </Button>
      </Card>
      <H2>{t('Helpers your neighbours trust', 'हेल्पर जिन पर पड़ोसी भरोसा करते हैं', 'ਹੈਲਪਰ ਜਿਨ੍ਹਾਂ ਤੇ ਗੁਆਂਢੀ ਭਰੋਸਾ ਕਰਦੇ ਹਨ')}</H2>
      <NeighbourHelpers onBook={book} />
      <Card row onPress={toggleGuard}>
        <View style={styles.fill}><H2>{t('Guard has the helper list', 'गार्ड के पास हेल्पर की लिस्ट है', 'ਗਾਰਡ ਕੋਲ ਹੈਲਪਰ ਦੀ ਲਿਸਟ ਹੈ')}</H2><T s m>{t('Faster entry at Gate 2', 'गेट 2 पर जल्दी एंट्री', 'ਗੇਟ 2 ਤੇ ਛੇਤੀ ਐਂਟਰੀ')}</T></View>
        <Check on={guard} />
      </Card>
    </Screen>
  );
}

export default SocietyScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
  shrink: { flexShrink: 1 },
  offer: { fontSize: 15 },
});
