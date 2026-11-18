/** Design page 30 (section 56 "WORKER G"), screen 49 · Instant photo check of the finished work. */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, H2, Icon, Lft, PhotoTile, Screen, Spacer, T, useNav, useT, useTheme } from '@/native/ui';
import { workPhotos } from '../data';
import { usePhotoChecks } from '../hooks/usePhotoChecks';

export function PhotoCheckScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const { ps, capture, all } = usePhotoChecks();
  return (
    <Screen>
      <BackHeader title={t('Work photos', 'काम की फ़ोटो', 'ਕੰਮ ਦੀਆਂ ਫ਼ੋਟੋਆਂ')} onBack={nav.back} />
      {workPhotos.map((p) => {
        const s = ps[p.id];
        return (
          <Card key={p.id} tone={s === 'fail' ? 'red' : undefined} onPress={s === 'pass' ? () => capture(p.id) : undefined}>
            <Lft>
              <PhotoTile variant="thumb" label={t(p.label, p.labelHi, p.labelPa)} dark={s === 'fail'}>
                {s === 'checking' ? <T s color={c.accent}>…</T> : s === 'empty' ? <Icon name="cam" color={c.accent} /> : undefined}
              </PhotoTile>
              <View style={styles.fill}>
                <H2>{t(p.title, p.titleHi, p.titlePa)}</H2>
                {s === 'pass' && <Lft gap={4}><Icon name="check" size={14} color={c.accent} /><T s color={c.accent} style={styles.fill}>{t('Looks clean and clear', 'साफ़ और सही दिख रहा है', 'ਸਾਫ਼ ਅਤੇ ਠੀਕ ਦਿਸਦਾ ਹੈ')}</T></Lft>}
                {s === 'fail' && <T s color={c.red}>{t('Too dark to see. Take it again with the light on.', 'बहुत अँधेरा है। लाइट जलाकर फिर से लें।', 'ਬਹੁਤ ਹਨੇਰਾ ਹੈ। ਲਾਈਟ ਜਗਾ ਕੇ ਦੁਬਾਰਾ ਲਓ।')}</T>}
                {s === 'checking' && <T s m>{t('Checking photo…', 'फ़ोटो जाँच रहे हैं…', 'ਫ਼ੋਟੋ ਜਾਂਚ ਰਹੇ ਹਾਂ…')}</T>}
                {s === 'empty' && <T s m>{t('Tap to take photo', 'फ़ोटो लें', 'ਫ਼ੋਟੋ ਲਓ')}</T>}
              </View>
            </Lft>
            {s === 'fail' && <Button variant="outline" icon="cam" style={{ marginTop: 10, paddingVertical: 9 }} onPress={() => capture(p.id)}>{t('Retake photo', 'फिर से फ़ोटो लें', 'ਦੁਬਾਰਾ ਫ਼ੋਟੋ ਲਓ')}</Button>}
          </Card>
        );
      })}
      <T s m>{t('Checked on your phone in a second, so nothing is disputed later.', 'आपके फ़ोन पर पल भर में जाँच, ताकि बाद में कोई झगड़ा न हो।', 'ਤੁਹਾਡੇ ਫ਼ੋਨ ਤੇ ਪਲ ਵਿੱਚ ਜਾਂਚ, ਤਾਂ ਜੋ ਬਾਅਦ ਵਿੱਚ ਕੋਈ ਝਗੜਾ ਨਾ ਹੋਵੇ।')}</T>
      <Spacer />
      <Button disabled={!all} onPress={() => nav.push('checkOut')}>{t('Continue to check out', 'चेक आउट करें', 'ਚੈੱਕ-ਆਊਟ ਕਰੋ')}</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default PhotoCheckScreen;
