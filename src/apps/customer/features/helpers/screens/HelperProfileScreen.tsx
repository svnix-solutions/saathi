import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, BackHeader, Button, Card, Grid, H, H2, Hr, Lft, Link, Pill, Screen, Spacer, T, Tag, useNav, useT } from '@/native/ui';
import { StatCard } from '../components/StatCard';
import { defaultFavourites, latinParts, profileBadges, profileHelper, profileSkills, reviews, tr } from '../data';
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
    nav.toast(fav
      ? t('Sunita removed from favourites', 'सुनीता को पसंदीदा से हटाया', 'ਸੁਨੀਤਾ ਨੂੰ ਪਸੰਦੀਦਾ ਵਿੱਚੋਂ ਹਟਾਇਆ')
      : t('Sunita added to favourites', 'सुनीता को पसंदीदा में जोड़ा', 'ਸੁਨੀਤਾ ਨੂੰ ਪਸੰਦੀਦਾ ਵਿੱਚ ਜੋੜਿਆ'));
  };
  return (
    <Screen>
      <BackHeader title={t('Your helper', 'आपकी हेल्पर', 'ਤੁਹਾਡੀ ਹੈਲਪਰ')} onBack={nav.back} />
      <View style={styles.center}>
        <Avatar face="sd" size={72} style={{ marginBottom: 6 }} />
        <H>{t('Sunita D.', 'सुनीता डी.', 'ਸੁਨੀਤਾ ਡੀ.')}</H>
        <T s m center>{latinParts(t('With Saathi since Oct 2026 · 142 visits', 'अक्टूबर 2026 से Saathi के साथ · 142 विज़िट', 'ਅਕਤੂਬਰ 2026 ਤੋਂ Saathi ਨਾਲ · 142 ਵਿਜ਼ਿਟਾਂ'))}</T>
      </View>
      <Lft gap={5} style={styles.badges}>
        {profileBadges.map((b) => <Tag key={b.en} tone="n">{tr(t, b)}</Tag>)}
      </Lft>
      <Grid cols={3}>
        <StatCard value="4.8" label={t('Rating', 'रेटिंग', 'ਰੇਟਿੰਗ')} onPress={() => nav.push('helperReviews')} />
        <StatCard value="96%" label={t('On time', 'समय पर', 'ਸਮੇਂ ਸਿਰ')} />
        <StatCard value="6" label={t('Your visits', 'आपकी विज़िट', 'ਤੁਹਾਡੀਆਂ ਵਿਜ਼ਿਟਾਂ')} onPress={() => nav.push('visitReport')} />
      </Grid>
      <H2>{t('Good at', 'इनमें माहिर', 'ਇਹਨਾਂ ਵਿੱਚ ਮਾਹਿਰ')}</H2>
      <Lft gap={6} style={styles.wrap}>
        {profileSkills.map((s) => <Pill key={s.en} s style={{ paddingVertical: 6, paddingHorizontal: 10 }}>{tr(t, s)}</Pill>)}
      </Lft>
      <Card>
        <T s><T s b>{t('Speaks', 'भाषा', 'ਬੋਲੀ')}</T>{t(' Hindi, Punjabi', ' हिंदी, पंजाबी', ' ਹਿੰਦੀ, ਪੰਜਾਬੀ')}</T>
        <Hr style={{ marginVertical: 8 }} />
        <T s><T s b>{t('Customers say', 'ग्राहक कहते हैं', 'ਗਾਹਕ ਕਹਿੰਦੇ ਹਨ')}</T>{` "${tr(t, reviews[0].text)}"`}</T>
        <View style={{ marginTop: 6 }}><Link onPress={() => nav.push('helperReviews')}>{t('Read all 142 reviews', 'सभी 142 रिव्यू पढ़ें', 'ਸਾਰੇ 142 ਰਿਵਿਊ ਪੜ੍ਹੋ')}</Link></View>
      </Card>
      <Spacer />
      <Grid cols={2}>
        <Button variant={fav ? 'yellow' : 'outline'} icon={fav ? 'star' : undefined} style={{ paddingVertical: 11 }} onPress={toggle}>{t('Favourite', 'पसंदीदा', 'ਪਸੰਦੀਦਾ')}</Button>
        <Button style={{ paddingVertical: 12 }} onPress={() => nav.push('chores', { service: 'general', helper: profileHelper })}>{t('Book Sunita', 'सुनीता को बुक करें', 'ਸੁਨੀਤਾ ਨੂੰ ਬੁੱਕ ਕਰੋ')}</Button>
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
