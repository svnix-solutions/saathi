import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Grid, H, H2, Lft, Meter, Page, Screen, Sheet, T, Tag, useNav, useT } from '@/native/ui';
import { BadgeIcon, BadgeTile } from '../components/BadgeTile';
import { badges, tx, type Badge } from '../data';

/** Design page 28 · screen 43: badges earned and how to unlock the rest. */
export function BadgesScreen() {
  const nav = useNav();
  const t = useT();
  const [open, setOpen] = useState<Badge | null>(null);
  return (
    <Page variant="bare">
      <Screen>
        <H>{t('My badges', 'मेरे बैज', 'ਮੇਰੇ ਬੈਜ')}</H>
        <T s m>{t('Customers see these on your profile.', 'ग्राहक इन्हें आपकी प्रोफ़ाइल पर देखते हैं।', 'ਗਾਹਕ ਇਹਨਾਂ ਨੂੰ ਤੁਹਾਡੀ ਪ੍ਰੋਫ਼ਾਈਲ ਤੇ ਦੇਖਦੇ ਹਨ।')}</T>
        <Grid cols={2}>
          {badges.map((b) => <BadgeTile key={b.title} badge={b} onPress={() => setOpen(b)} />)}
        </Grid>
      </Screen>
      <Sheet visible={!!open} onClose={() => setOpen(null)}>
        {open && (
          <>
            <Lft>
              <BadgeIcon badge={open} />
              <View style={styles.grow}><H2>{t(open.title, open.hi, open.pa)}</H2><T s m>{tx(t, open.sub)}</T></View>
              <Tag tone={open.earned ? 'n' : 'x'}>{open.earned ? t('Earned', 'मिल गया', 'ਮਿਲ ਗਿਆ') : t('Locked', 'बंद', 'ਬੰਦ')}</Tag>
            </Lft>
            {open.title === '500 visits' && <Meter value={142 / 500} style={styles.fixed} />}
            <T s m>{open.earned ? t('Shown on your profile and next to your name when customers book.', 'आपकी प्रोफ़ाइल पर और बुकिंग के समय आपके नाम के साथ दिखता है।', 'ਤੁਹਾਡੀ ਪ੍ਰੋਫ਼ਾਈਲ ਤੇ ਅਤੇ ਬੁਕਿੰਗ ਵੇਲੇ ਤੁਹਾਡੇ ਨਾਮ ਨਾਲ ਦਿਸਦਾ ਹੈ।') : open.how && tx(t, open.how)}</T>
            {open.go
              ? <Button onPress={() => { setOpen(null); nav.push(open.go!); }}>{t('Start the lesson', 'पाठ शुरू करें', 'ਪਾਠ ਸ਼ੁਰੂ ਕਰੋ')}</Button>
              : <Button variant="outline" onPress={() => setOpen(null)}>{t('Close', 'बंद करें', 'ਬੰਦ ਕਰੋ')}</Button>}
          </>
        )}
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  fixed: { flex: 0 },
});

export default BadgesScreen;
