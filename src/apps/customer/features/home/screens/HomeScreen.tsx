/** Design page 03 · Book a helper — screen 5 · Home, with the kinds of work on top; 5b–5d · Nursing, Repair, Barber (params: { category }). */
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Avatar, Card, CharacterTile, Grid, H, H2, Icon, Lft, Row, Screen, T, palette, useNav, useT, useTheme, type ScreenProps, ChipGroup,
} from '@/native/ui';
import { categories, rupees, serviceName, servicesIn, type Category } from '@/domain';
import { useCustomerState } from '../../../state';
import { CustomerTabs } from '../../../navigation/CustomerTabs';
import { SavedAddress } from '../../booking';
import { ServiceRowCard } from '../components/ServiceRowCard';
import { CATEGORY_NOTE, TRUST } from '../data';

export function HomeScreen({ params }: ScreenProps<{ category?: Category }>) {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st] = useCustomerState();
  const [cat, setCat] = useState<Category>(params.category ?? 'cleaning');
  const cleaning = servicesIn('cleaning');
  const grid = cleaning.slice(0, 4);
  const custom = cleaning[4];
  const info = categories.find((x) => x.id === cat)!;
  const trust = TRUST[cat];
  const note = CATEGORY_NOTE[cat];
  return (
    <View style={styles.page}>
      <Screen>
        <Row>
          <SavedAddress address={st.address} />
          <Pressable onPress={() => nav.reset('account')} accessibilityLabel="Account"><Avatar face="nk" size={32} /></Pressable>
        </Row>
        {cat === 'cleaning' && <Card tone="yellow" onPress={() => nav.push('chores', { service: st.service })}>
          <Lft>
            <CharacterTile name="hero" />
            <View>
              <H2 color={palette.ink}>{t('Helper in 15 minutes', '15 मिनट में हेल्पर')}</H2>
              <T s color={palette.ink}>{t('Or schedule for later', 'या बाद का समय चुनें')}</T>
            </View>
          </Lft>
        </Card>}
        <ChipGroup accessibilityLabel={t('Kind of work', 'काम का प्रकार', 'ਕੰਮ ਦੀ ਕਿਸਮ')} value={cat} onChange={setCat}
          items={categories.map((x) => ({ key: x.id, label: t(x.name, x.nameHi, x.namePa) }))} />
        <H size={16}>{t(info.title, info.titleHi, info.titlePa)}</H>
        {cat === 'cleaning' ? <>
          <Grid cols={2}>
            {grid.map((s) => (
              <Card key={s.id} onPress={() => nav.push('chores', { service: s.id })}>
                <CharacterTile name={s.character} />
                <H2 style={{ marginTop: 5 }}>{serviceName(t, s.id)}</H2>
                <T s m>{t(`from ${rupees(s.per30)}`, `${rupees(s.per30)} से`)}</T>
              </Card>
            ))}
          </Grid>
          <Card row onPress={() => nav.push('chores', { service: custom.id })}>
            <Lft>
              <CharacterTile name={custom.character} />
              <View>
                <H2>{serviceName(t, custom.id)}</H2>
                <T s m>{t(`You choose the chores · ${rupees(custom.per30)}`, `काम आप चुनें · ${rupees(custom.per30)}`)}</T>
              </View>
            </Lft>
          </Card>
        </> : <>
          {servicesIn(cat).map((s) => <ServiceRowCard key={s.id} service={s} onPress={() => nav.push('chores', { service: s.id })} />)}
          {trust && (
            <Card tone="mint">
              <Lft style={styles.top}>
                <Icon name="shield" color={c.accent} />
                <T s style={styles.grow}>{t(...trust)}</T>
              </Lft>
            </Card>
          )}
          {note && <Card><T s m>{t(...note)}</T></Card>}
        </>}
      </Screen>
      <CustomerTabs active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  grow: { flex: 1 },
  top: { alignItems: 'flex-start' },
});

export default HomeScreen;
