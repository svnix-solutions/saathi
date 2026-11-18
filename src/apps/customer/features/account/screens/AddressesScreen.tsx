/** Design page 05 · Address, changes and safety — screen 13 · Addresses and home details. */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Grid, H2, Icon, Lft, ListCard, Pill, Row, Screen, Spacer, T, Tag, Toggle, useNav, useT, useTheme } from '@/native/ui';
import { useCustomerState } from '../../../state';
import { ADDRESSES, HOME_SIZES } from '../data';

export function AddressesScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useCustomerState();
  const size = st.homeSize ?? '2';
  const baths = st.bathrooms ?? 2;
  const reachNote = st.address.note
    ? (st.address.line === ADDRESSES[0].line ? t('Gate 2, near the park. Tell the guard flat 204.', 'गेट 2, पार्क के पास। गार्ड को फ़्लैट 204 बताएँ।', 'ਗੇਟ 2, ਪਾਰਕ ਦੇ ਕੋਲ। ਗਾਰਡ ਨੂੰ ਫ਼ਲੈਟ 204 ਦੱਸੋ।') : st.address.note)
    : t('No note yet.', 'अभी कोई नोट नहीं।', 'ਅਜੇ ਕੋਈ ਨੋਟ ਨਹੀਂ।');
  return (
    <Screen>
      <BackHeader title={t('My addresses', 'मेरे पते', 'ਮੇਰੇ ਪਤੇ')} onBack={nav.back} />
      {ADDRESSES.map((a, i) => {
        const on = st.address.line === a.line;
        const choose = () => { set({ address: { label: a.label, line: a.line, note: a.note } }); if (!on) nav.toast(t(`${a.label} is now the default`, `${a.labelHi} अब मुख्य पता है`, `${a.labelPa} ਹੁਣ ਮੁੱਖ ਪਤਾ ਹੈ`)); };
        return (
          <Card key={a.line} sel={on} onPress={choose}>
            <Row>
              <Lft style={styles.grow}>
                <Icon name={i === 0 ? 'home' : 'pin'} color={c.accent} />
                <View style={styles.grow}><H2>{t(a.label, a.labelHi, a.labelPa)}</H2><T s m>{t(a.line, a.lineHi, a.linePa)}</T></View>
              </Lft>
              {on && <Tag>{t('Default', 'मुख्य', 'ਮੁੱਖ')}</Tag>}
            </Row>
          </Card>
        );
      })}
      <H2>{t('About this home', 'इस घर के बारे में', 'ਇਸ ਘਰ ਬਾਰੇ')}</H2>
      <Grid cols={3}>
        {HOME_SIZES.map((h) => <Pill key={h.v} sel={size === h.v} onPress={() => set({ homeSize: h.v })}>{h.label}</Pill>)}
      </Grid>
      <ListCard>
        <Row>
          <T>{t('Bathrooms', 'बाथरूम', 'ਬਾਥਰੂਮ')}</T>
          <Lft gap={10}>
            <Pressable onPress={() => set({ bathrooms: Math.max(1, baths - 1) })} accessibilityRole="button" accessibilityLabel={t('Fewer', 'कम', 'ਘੱਟ')}><T b color={c.accent}>−</T></Pressable>
            <T b>{baths}</T>
            <Pressable onPress={() => set({ bathrooms: Math.min(5, baths + 1) })} accessibilityRole="button" accessibilityLabel={t('More', 'ज़्यादा', 'ਵੱਧ')}><T b color={c.accent}>+</T></Pressable>
          </Lft>
        </Row>
        <Row><T style={styles.grow}>{t('Pets at home', 'घर में पालतू', 'ਘਰ ਵਿੱਚ ਪਾਲਤੂ ਜਾਨਵਰ')}</T><Toggle on={st.pets ?? true} onChange={(v) => set({ pets: v })} /></Row>
        <Row><T style={styles.grow}>{t('Elderly person at home', 'घर में बुज़ुर्ग', 'ਘਰ ਵਿੱਚ ਬਜ਼ੁਰਗ')}</T><Toggle on={st.elderly ?? false} onChange={(v) => set({ elderly: v })} /></Row>
      </ListCard>
      <Card>
        <T s b>{t('How to reach', 'कैसे पहुँचें', 'ਕਿਵੇਂ ਪਹੁੰਚਣਾ ਹੈ')}</T>
        <T s m>{reachNote}</T>
      </Card>
      <Spacer />
      <Button variant="outline" onPress={() => nav.push('signin.address', { add: true })}>{t('Add new address', 'नया पता जोड़ें', 'ਨਵਾਂ ਪਤਾ ਜੋੜੋ')}</Button>
    </Screen>
  );
}

export default AddressesScreen;

const styles = StyleSheet.create({ grow: { flex: 1 } });
