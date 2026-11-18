/** Design page 15 (CUSTOMER M) · Testimonials — screen 52 · Home with testimonial. */
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Avatar, Card, CharacterTile, Dots, Grid, H2, Icon, Lft, Link, Row, Screen, T, palette, useInterval, useNav, useT, useTheme,
} from '@/native/ui';
import { useCustomerState } from '../../../state';
import { CustomerTabs } from '../../../navigation/CustomerTabs';
import { TestimonialCard } from '../components/TestimonialCard';
import { NEIGHBOUR_STATS, QUOTES, QUOTE_INTERVAL_MS } from '../data';

export function HomeTestimonialScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useCustomerState();
  const { c } = useTheme();
  const [i, setI] = useState(0);
  useInterval(() => setI((n) => (n + 1) % QUOTES.length), QUOTE_INTERVAL_MS);
  const book = () => { set({ service: 'general', when: 'now' }); nav.push('chores', { service: 'general' }); };
  return (
    <View style={styles.page}>
      <Screen>
        <Row>
          <Pressable onPress={() => nav.push('addresses')} accessibilityRole="button"><Lft>
            <Icon name="pin" color={c.accent} />
            <View><H2>{t(st.address?.label ?? 'Home', 'घर')}</H2><T s m>{st.address?.line ?? 'Flat 204, Block C'}</T></View>
          </Lft></Pressable>
          <Pressable onPress={() => nav.reset('account')} accessibilityLabel="Account"><Avatar face="nk" size={32} /></Pressable>
        </Row>
        <Card tone="yellow" onPress={book}>
          <Lft gap={10}>
            <CharacterTile name="hero" />
            <View style={styles.grow}><H2 color={palette.ink}>{t('Helper in 15 minutes', '15 मिनट में हेल्पर')}</H2><T s color={palette.ink}>{t('Or schedule for later', 'या बाद के लिए बुक करें')}</T></View>
            <Icon name="chevron" color={palette.ink} />
          </Lft>
        </Card>
        <Row>
          <H2 style={styles.section}>{t('Loved by your neighbours', 'पड़ोसियों की पसंद')}</H2>
          <Link onPress={() => nav.push('testimonials')}>{t('See all', 'सभी देखें')}</Link>
        </Row>
        <TestimonialCard quote={QUOTES[i]} onPress={() => setI((i + 1) % QUOTES.length)} />
        <Dots count={QUOTES.length} active={i} onPress={setI} />
        <Grid cols={3}>
          {NEIGHBOUR_STATS.map(([v, l, hi]) => (
            <Card key={l} style={{ paddingVertical: 9, paddingHorizontal: 4, alignItems: 'center' }} onPress={() => nav.push('testimonials')}>
              <T b>{v}</T><T s m>{t(l, hi)}</T>
            </Card>
          ))}
        </Grid>
      </Screen>
      <CustomerTabs active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  grow: { flex: 1 },
  section: { fontSize: 15 },
});

export default HomeTestimonialScreen;
