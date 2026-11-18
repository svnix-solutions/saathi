import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, H, H2, Link, Screen, T, Toggle, useNav, useT } from '@/native/ui';
import { CustomerTabs } from '../../../navigation/CustomerTabs';
import { BlockedHelpersSheet } from '../components/BlockedHelpersSheet';
import { HelperCard } from '../components/HelperCard';
import { defaultBlocked, defaultFavourites, myHelpers } from '../data';
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
    nav.toast(favs.includes(n) ? `${n} removed from favourites` : `${n} added to favourites`);
  };
  const book = (name: string) => { set({ helper: name, service: 'general' }); nav.push('chores', { service: 'general', helper: name }); };
  const unblock = (b: string) => { set({ blocked: blocked.filter((x) => x !== b) }); nav.toast(`${b} unblocked`); };
  return (
    <View style={styles.root}>
      <Screen>
        <H>{t('Your helpers', 'आपके हेल्पर')}</H>
        {myHelpers.map((p) => (
          <HelperCard key={p.n} person={p} favourite={favs.includes(p.n)}
            onOpen={() => (p.face === 'sd' ? nav.push('helperProfile') : toggleFav(p.n))}
            onToggleFavourite={() => toggleFav(p.n)} onBook={() => book(p.n)} />
        ))}
        <Card row>
          <View style={styles.grow}><H2>Prefer my favourites</H2><T s m>We try them first, then send the nearest helper</T></View>
          <Toggle on={prefer} onChange={(v) => { setPrefer(v); nav.toast(v ? 'Favourites will be tried first' : 'Nearest helper will be sent'); }} />
        </Card>
        <Card row onPress={() => setManage(true)}>
          <View><H2>Do not send again</H2><T s m>{blocked.length} helper{blocked.length === 1 ? '' : 's'} blocked</T></View>
          <Link onPress={() => setManage(true)}>Manage</Link>
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
