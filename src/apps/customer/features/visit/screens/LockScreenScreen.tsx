import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Grid, H, H2, IconTile, Lft, Mark, Row, Screen, Spacer, T, Tag, palette, useNav, useT, useTheme } from '@/native/ui';
import { useLockScreenEta } from '../hooks/useLockScreenEta';
import { latinParts } from '../../helpers';

/** Design page 16 (CUSTOMER H) · screen 59, live updates on the lock screen and WhatsApp. */
export function LockScreenScreen() {
  const nav = useNav();
  const t = useT();
  const { locale } = useTheme();
  const [hi, pa] = [locale === 'hi', locale === 'pa'];
  const footnote = t('Updates on the lock screen and on WhatsApp, without opening the app', 'लॉक स्क्रीन और WhatsApp पर अपडेट, ऐप खोले बिना', 'ਲਾਕ ਸਕ੍ਰੀਨ ਅਤੇ WhatsApp ਤੇ ਅਪਡੇਟ, ਐਪ ਖੋਲ੍ਹੇ ਬਿਨਾਂ');
  const { mins, pct, clock } = useLockScreenEta();
  const [reply, setReply] = useState(false);
  const onTheWay = mins > 0;
  return (
    <Screen bg={palette.ink}>
      <View style={[styles.clockBox, { marginTop: 10 }]}>
        <Text style={styles.date}>{t('Saturday 21 November', 'शनिवार 21 नवंबर', 'ਸ਼ਨੀਵਾਰ 21 ਨਵੰਬਰ')}</Text>
        <Text style={styles.clock}>{clock}</Text>
      </View>
      <Card style={{ marginTop: 10 }} onPress={() => nav.push('tracking')}>
        <Row>
          <Lft><Mark size={20} /><T b>Saathi</T></Lft>
          <Tag>{onTheWay ? t('Live', 'लाइव', 'ਲਾਈਵ') : t('Arrived', 'पहुँच गईं', 'ਪਹੁੰਚ ਗਈ')}</Tag>
        </Row>
        <H style={{ marginTop: 8 }}>{onTheWay
          ? t(`Sunita arrives in ${mins} min`, `सुनीता ${mins} मिनट में पहुँचेंगी`, `ਸੁਨੀਤਾ ${mins} ਮਿੰਟ ਵਿੱਚ ਪਹੁੰਚੇਗੀ`)
          : t('Sunita is at your door', 'सुनीता आपके दरवाज़े पर हैं', 'ਸੁਨੀਤਾ ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ ਤੇ ਹੈ')}</H>
        <View style={[styles.track, { marginTop: 9 }]}>
          <View style={[styles.fill, { width: `${pct * 100}%` }]} />
        </View>
        <Row style={{ marginTop: 5 }}><T s m>{onTheWay ? t('On the way', 'रास्ते में', 'ਰਾਹ ਵਿੱਚ') : t('At the door', 'दरवाज़े पर', 'ਦਰਵਾਜ਼ੇ ਤੇ')}</T><T s m>{t('Door code 4821', 'दरवाज़े का कोड 4821', 'ਦਰਵਾਜ਼ੇ ਦਾ ਕੋਡ 4821')}</T></Row>
      </Card>
      <Card onPress={() => setReply(!reply)}>
        <Lft style={styles.top} gap={10}>
          <IconTile name="call" bg={palette.green} color={palette.white} />
          <View style={styles.grow}>
            {/* brand names stay in Latin script; separate text nodes so each reads as its own word */}
            <H2>{'WhatsApp'}{' · '}{'Saathi'}</H2>
            <T s m>
              {onTheWay
                ? t(`Your helper Sunita is ${mins} min away.`, `आपकी हेल्पर सुनीता ${mins} मिनट दूर हैं।`, `ਤੁਹਾਡੀ ਹੈਲਪਰ ਸੁਨੀਤਾ ${mins} ਮਿੰਟ ਦੂਰ ਹੈ।`)
                : t('Sunita has reached your door.', 'सुनीता आपके दरवाज़े पर पहुँच गई हैं।', 'ਸੁਨੀਤਾ ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ ਤੇ ਪਹੁੰਚ ਗਈ ਹੈ।')}
              {t(' Reply 1 to call her, 2 to change the time.', ' उन्हें कॉल करने के लिए 1, समय बदलने के लिए 2 भेजें।', ' ਉਹਨੂੰ ਕਾਲ ਕਰਨ ਲਈ 1, ਸਮਾਂ ਬਦਲਣ ਲਈ 2 ਭੇਜੋ।')}
            </T>
          </View>
        </Lft>
        {reply && (
          <Grid cols={2} style={{ marginTop: 10 }}>
            <Button variant="outline" style={{ paddingVertical: 9 }} onPress={() => nav.toast(t('Calling Sunita…', 'सुनीता को कॉल हो रहा है…', 'ਸੁਨੀਤਾ ਨੂੰ ਕਾਲ ਹੋ ਰਹੀ ਹੈ…'))}>{t('1 · Call', '1 · कॉल', '1 · ਕਾਲ')}</Button>
            <Button variant="outline" style={{ paddingVertical: 9 }} onPress={() => nav.push('changeBooking')}>{t('2 · Change', '2 · बदलें', '2 · ਬਦਲੋ')}</Button>
          </Grid>
        )}
      </Card>
      <Spacer />
      <Text style={[styles.date, styles.footnote]}>
        {hi || pa ? latinParts(footnote) : footnote}
      </Text>
    </Screen>
  );
}

export default LockScreenScreen;

const styles = StyleSheet.create({
  clockBox: { alignItems: 'center' },
  date: { color: palette.white, opacity: 0.7, fontSize: 11 },
  clock: { color: palette.white, fontSize: 54, fontWeight: '700', letterSpacing: -1.6, lineHeight: 59 },
  footnote: { textAlign: 'center' },
  track: { height: 7, borderRadius: 4, backgroundColor: palette.mint },
  fill: { height: '100%', borderRadius: 4, backgroundColor: palette.green },
  top: { alignItems: 'flex-start' },
  grow: { flex: 1 },
});
