import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, BackHeader, Button, Card, Grid, H, H2, Hr, Lft, Link, Pill, Screen, Spacer, T, Tag, useNav, useT } from '@/native/ui';
import { StatCard } from '../components/StatCard';
import { defaultFavourites, profileBadges, profileHelper, profileSkills } from '../data';
import { useCustomerState } from '../../../state';

/** Design page 12 · screen 40, helper profile. */
export function HelperProfileScreen() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useCustomerState();
  const favs = st.favourites ?? defaultFavourites;
  const fav = favs.includes(profileHelper);
  const toggle = () => {
    set({ favourites: fav ? favs.filter((x) => x !== profileHelper) : [...favs, profileHelper] });
    nav.toast(fav ? 'Sunita removed from favourites' : 'Sunita added to favourites');
  };
  return (
    <Screen>
      <BackHeader title={t('Your helper', 'आपकी हेल्पर')} onBack={nav.back} />
      <View style={styles.center}>
        <Avatar face="sd" size={72} style={{ marginBottom: 6 }} />
        <H>Sunita D.</H>
        <T s m center>With Saathi since Oct 2026 · 142 visits</T>
      </View>
      <Lft gap={5} style={styles.badges}>
        {profileBadges.map((b) => <Tag key={b} tone="n">{b}</Tag>)}
      </Lft>
      <Grid cols={3}>
        <StatCard value="4.8" label="Rating" onPress={() => nav.push('helperReviews')} />
        <StatCard value="96%" label="On time" />
        <StatCard value="6" label="Your visits" onPress={() => nav.push('visitReport')} />
      </Grid>
      <H2>Good at</H2>
      <Lft gap={6} style={styles.wrap}>
        {profileSkills.map((s) => <Pill key={s} s style={{ paddingVertical: 6, paddingHorizontal: 10 }}>{s}</Pill>)}
      </Lft>
      <Card>
        <T s><T s b>Speaks</T> Hindi, Punjabi</T>
        <Hr style={{ marginVertical: 8 }} />
        <T s><T s b>Customers say</T> "Very thorough, always on time."</T>
        <View style={{ marginTop: 6 }}><Link onPress={() => nav.push('helperReviews')}>Read all 142 reviews</Link></View>
      </Card>
      <Spacer />
      <Grid cols={2}>
        <Button variant={fav ? 'yellow' : 'outline'} icon={fav ? 'star' : undefined} style={{ paddingVertical: 11 }} onPress={toggle}>{t('Favourite', 'पसंदीदा')}</Button>
        <Button style={{ paddingVertical: 12 }} onPress={() => nav.push('chores', { service: 'general', helper: profileHelper })}>{t('Book Sunita', 'सुनीता को बुक करें')}</Button>
      </Grid>
    </Screen>
  );
}

export default HelperProfileScreen;

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  badges: { justifyContent: 'center', flexWrap: 'wrap' },
  wrap: { flexWrap: 'wrap' },
});
