import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, H2, Lft, Link, Page, Row, Screen, Stars, T, Tag, Toggle, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { kindWords, tx } from '../data';

/** Design page 29 · screen 45: what customers said about me, and whether to show it on my profile. */
export function KindWordsScreen() {
  const nav = useNav();
  const t = useT();
  const small = useTheme().device === 'small';
  const [show, setShow] = useState(true);
  const [thanked, setThanked] = useState<string[]>([]);
  const thank = (id: string, who: string) => {
    setThanked((s) => [...s, id]);
    const name = who.split(',')[0];
    nav.toast(t(`Thank-you sent to ${name}`, `${name} को धन्यवाद भेजा`, `${name} ਨੂੰ ਧੰਨਵਾਦ ਭੇਜਿਆ`));
  };
  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Label>{t('Kind words for you', 'आपके लिए अच्छे शब्द', 'ਤੁਹਾਡੇ ਲਈ ਚੰਗੇ ਸ਼ਬਦ')}</TopBar.Label>
        <TopBar.Title>{t('12 customers thanked you', '12 ग्राहकों ने धन्यवाद कहा', '12 ਗਾਹਕਾਂ ਨੇ ਧੰਨਵਾਦ ਕੀਤਾ')}</TopBar.Title>
      </TopBar>
      <Screen>
        {kindWords.map((k) => (
          <Card key={k.who.en}>
            {small
              ? <Lft style={styles.top}><Avatar face={k.face} size={30} /><View style={styles.grow}><T b>{tx(t, k.who)}</T><Stars value={5} /></View></Lft>
              : <Row><Lft style={styles.grow}><Avatar face={k.face} size={30} /><T b style={styles.grow}>{tx(t, k.who)}</T></Lft><Stars value={5} /></Row>}
            <T style={{ marginTop: 8 }}>{tx(t, k.quote)}</T>
            <Row style={[styles.wrap, { marginTop: 8 }]}>
              <Tag tone="n">{tx(t, k.where)}</Tag>
              {thanked.includes(k.who.en)
                ? <T s m>{t('Thanked', 'धन्यवाद भेजा', 'ਧੰਨਵਾਦ ਭੇਜਿਆ')}</T>
                : <Link onPress={() => thank(k.who.en, tx(t, k.who))}>{t('Say thank you', 'धन्यवाद कहें', 'ਧੰਨਵਾਦ ਕਹੋ')}</Link>}
            </Row>
          </Card>
        ))}
        <Card row>
          <View style={styles.grow}><H2>{t('Show these on my profile', 'इन्हें मेरी प्रोफ़ाइल पर दिखाएँ', 'ਇਹਨਾਂ ਨੂੰ ਮੇਰੀ ਪ੍ਰੋਫ਼ਾਈਲ ਤੇ ਦਿਖਾਓ')}</H2><T s m>{t('Customers see them before booking', 'ग्राहक बुकिंग से पहले इन्हें देखते हैं', 'ਗਾਹਕ ਬੁਕਿੰਗ ਤੋਂ ਪਹਿਲਾਂ ਇਹਨਾਂ ਨੂੰ ਦੇਖਦੇ ਹਨ')}</T></View>
          <Toggle on={show} onChange={(v) => { setShow(v); nav.toast(v ? t('Shown on your profile', 'आपकी प्रोफ़ाइल पर दिख रहे हैं', 'ਤੁਹਾਡੀ ਪ੍ਰੋਫ਼ਾਈਲ ਤੇ ਦਿਸ ਰਹੇ ਹਨ') : t('Hidden from your profile', 'आपकी प्रोफ़ाइल से छिपाए गए', 'ਤੁਹਾਡੀ ਪ੍ਰੋਫ਼ਾਈਲ ਤੋਂ ਲੁਕਾਏ ਗਏ')); }} />
        </Card>
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  top: { alignItems: 'flex-start' },
  wrap: { flexWrap: 'wrap', rowGap: 6 },
});

export default KindWordsScreen;
