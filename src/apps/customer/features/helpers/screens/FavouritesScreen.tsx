import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, H, H2, Link, Screen, T, Toggle, useNav, useT } from '@/native/ui';
import { CustomerTabs } from '../../../navigation/CustomerTabs';
import { BlockedHelpersSheet } from '../components/BlockedHelpersSheet';
import { HelperCard } from '../components/HelperCard';
import { defaultBlocked, defaultFavourites, helperName, myHelpers } from '../data';
import { useCustomerState } from '../../../state';

/** Design page 10 · screen 33, favourite helpers. */
export function FavouritesScreen() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useCustomerState();
  const favs = st.favourites ?? defaultFavourites;
  const blocked = st.blocked ?? defaultBlocked;
  const [prefer, setPrefer] = useState(true);
  const [manage, setManage] = useState(false);
  const toggleFav = (n: string) => {
    const next = favs.includes(n) ? favs.filter((x) => x !== n) : [...favs, n];
    set({ favourites: next });
    const name = helperName(t, n);
    nav.toast(favs.includes(n)
      ? t(`${n} removed from favourites`, `${name} को पसंदीदा से हटाया`, `${name} ਨੂੰ ਪਸੰਦੀਦਾ ਵਿੱਚੋਂ ਹਟਾਇਆ`)
      : t(`${n} added to favourites`, `${name} को पसंदीदा में जोड़ा`, `${name} ਨੂੰ ਪਸੰਦੀਦਾ ਵਿੱਚ ਜੋੜਿਆ`));
  };
  const book = (name: string) => { set({ helper: name, service: 'general' }); nav.push('chores', { service: 'general', helper: name }); };
  const unblock = (b: string) => { set({ blocked: blocked.filter((x) => x !== b) }); nav.toast(t(`${b} unblocked`, `${helperName(t, b)} को अनब्लॉक किया`, `${helperName(t, b)} ਨੂੰ ਅਨਬਲਾਕ ਕੀਤਾ`)); };
  return (
    <View style={styles.root}>
      <Screen>
        <H>{t('Your helpers', 'आपके हेल्पर', 'ਤੁਹਾਡੇ ਹੈਲਪਰ')}</H>
        {myHelpers.map((p) => (
          <HelperCard key={p.n} person={p} favourite={favs.includes(p.n)}
            onOpen={() => (p.face === 'sd' ? nav.push('helperProfile') : toggleFav(p.n))}
            onToggleFavourite={() => toggleFav(p.n)} onBook={() => book(p.n)} />
        ))}
        <Card row>
          <View style={styles.grow}>
            <H2>{t('Prefer my favourites', 'पहले मेरे पसंदीदा', 'ਪਹਿਲਾਂ ਮੇਰੇ ਪਸੰਦੀਦਾ')}</H2>
            <T s m>{t('We try them first, then send the nearest helper', 'पहले उन्हें पूछते हैं, फिर सबसे पास वाला हेल्पर भेजते हैं', 'ਪਹਿਲਾਂ ਉਹਨਾਂ ਨੂੰ ਪੁੱਛਦੇ ਹਾਂ, ਫਿਰ ਸਭ ਤੋਂ ਨੇੜੇ ਵਾਲਾ ਹੈਲਪਰ ਭੇਜਦੇ ਹਾਂ')}</T>
          </View>
          <Toggle on={prefer} onChange={(v) => { setPrefer(v); nav.toast(v
            ? t('Favourites will be tried first', 'पहले पसंदीदा हेल्पर को पूछेंगे', 'ਪਹਿਲਾਂ ਪਸੰਦੀਦਾ ਹੈਲਪਰ ਨੂੰ ਪੁੱਛਾਂਗੇ')
            : t('Nearest helper will be sent', 'सबसे पास वाला हेल्पर भेजेंगे', 'ਸਭ ਤੋਂ ਨੇੜੇ ਵਾਲਾ ਹੈਲਪਰ ਭੇਜਾਂਗੇ')); }} />
        </Card>
        <Card row onPress={() => setManage(true)}>
          <View style={styles.grow}>
            <H2>{t('Do not send again', 'दोबारा न भेजें', 'ਦੁਬਾਰਾ ਨਾ ਭੇਜੋ')}</H2>
            {/* same text nodes as before in English ("1", " helper", "", " blocked") so the line renders identically */}
            <T s m>{blocked.length}{t(' helper', ' हेल्पर', ' ਹੈਲਪਰ')}{t(blocked.length === 1 ? '' : 's', '', '')}{t(' blocked', ' ब्लॉक', ' ਬਲਾਕ')}</T>
          </View>
          <Link onPress={() => setManage(true)}>{t('Manage', 'बदलें', 'ਬਦਲੋ')}</Link>
        </Card>
      </Screen>
      <CustomerTabs active="account" />
      <BlockedHelpersSheet visible={manage} blocked={blocked} onUnblock={unblock} onClose={() => setManage(false)} />
    </View>
  );
}

export default FavouritesScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  grow: { flex: 1 },
});
