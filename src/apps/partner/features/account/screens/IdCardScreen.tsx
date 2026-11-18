import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, H, H2, Hr, Icon, Lft, Mark, Page, Row, Screen, Sheet, Spacer, T, Tag, palette, useNav, useT } from '@/native/ui';
import { IdVerifyCode } from '../components/IdVerifyCode';
import { useAccountState } from '../state';
import { tint } from '@/tokens';

/** Design page 21 (section 51), screen 15 · Digital ID card. */
export function IdCardScreen() {
  const t = useT();
  const nav = useNav();
  const [st] = useAccountState();
  const [scan, setScan] = useState(false);
  const fullName = st.name === 'Sunita' ? 'Sunita D.' : st.name;
  return (
    <Page bg={palette.greenD}>
      <Screen bg={palette.greenD}>
        <Row>
          <Pressable onPress={nav.back} style={styles.back} accessibilityRole="button" hitSlop={8}>
            <Icon name="back" color={palette.white} /><H2 color={palette.white}>{t('My ID card', 'मेरा आईडी कार्ड')}</H2>
          </Pressable>
          <T s color={palette.white} style={styles.dim}>{t('Show at the gate', 'गेट पर दिखाएँ')}</T>
        </Row>
        <Card style={[styles.center, { paddingVertical: 18, paddingHorizontal: 14, marginTop: 6 }]}>
          <Lft gap={6}><Mark size={24} /><H2 style={styles.brand}>Saathi Partner</H2></Lft>
          <Avatar face="sd" size={84} style={{ marginTop: 14, marginBottom: 8 }} />
          <H>{fullName}</H>
          <T s m>{t('Partner ID KP-0142 · Block C zone', 'पार्टनर आईडी KP-0142 · ब्लॉक सी')}</T>
          <Lft gap={5} style={[styles.tags, { marginTop: 10 }]}>
            <Tag tone="n">{t('ID checked', 'आईडी जाँची')}</Tag><Tag tone="n">{t('Police verified', 'पुलिस सत्यापित')}</Tag><Tag tone="n">{t('Trained', 'प्रशिक्षित')}</Tag>
          </Lft>
          <Hr style={[styles.stretch, { marginVertical: 14 }]} />
          <Pressable onPress={() => setScan(true)} style={styles.scan} accessibilityRole="button">
            <IdVerifyCode label={t('Verification code', 'सत्यापन कोड')} />
            <View><H2>{t('Scan to check', 'जाँचने के लिए स्कैन करें')}</H2><T s m>{t('Opens a Saathi\npage with this photo', 'इस फ़ोटो के साथ\nSaathi पेज खुलेगा')}</T></View>
          </Pressable>
        </Card>
        <Spacer />
        <T s center color={tint.onDeepGreenMuted}>{t(`Valid today for booking ${st.job.id}, Flat 204`, `आज बुकिंग ${st.job.id}, फ़्लैट 204 के लिए मान्य`)}</T>
      </Screen>
      <Sheet visible={scan} onClose={() => setScan(false)}>
        <Lft><Avatar face="sd" size={44} /><View><H2>{fullName} · KP-0142</H2><T s m>saathi.in/check/KP-0142</T></View></Lft>
        <Tag tone="g">{t('Verified partner · on a job now', 'सत्यापित पार्टनर · अभी काम पर')}</Tag>
        <T s m>{t('This is what the guard sees after scanning: the same photo, name and today’s booking.', 'स्कैन करने पर गार्ड यही देखता है: वही फ़ोटो, नाम और आज की बुकिंग।')}</T>
        <Button size="tall" onPress={() => setScan(false)}>{t('Close', 'बंद करें')}</Button>
      </Sheet>
    </Page>
  );
}

export default IdCardScreen;

const styles = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dim: { opacity: 0.8 },
  center: { alignItems: 'center' },
  brand: { fontSize: 15 },
  tags: { justifyContent: 'center', flexWrap: 'wrap' },
  stretch: { alignSelf: 'stretch' },
  scan: { flexDirection: 'row', alignItems: 'center', gap: 14 },
});
