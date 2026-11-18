import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, H2, Lft, Link, Page, Row, Screen, Stars, T, Tag, Toggle, TopBar, useNav, useT } from '@/native/ui';
import { kindWords } from '../data';

/** Design page 29 · screen 45: what customers said about me, and whether to show it on my profile. */
export function KindWordsScreen() {
  const nav = useNav();
  const t = useT();
  const [show, setShow] = useState(true);
  const [thanked, setThanked] = useState<string[]>([]);
  const thank = (who: string) => { setThanked((s) => [...s, who]); nav.toast(`Thank-you sent to ${who.split(',')[0]}`); };
  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Label>{t('Kind words for you', 'आपके लिए अच्छे शब्द')}</TopBar.Label>
        <TopBar.Title>{t('12 customers thanked you', '12 ग्राहकों ने धन्यवाद कहा')}</TopBar.Title>
      </TopBar>
      <Screen>
        {kindWords.map((k) => (
          <Card key={k.who}>
            <Row><Lft><Avatar face={k.face} size={30} /><T b>{k.who}</T></Lft><Stars value={5} /></Row>
            <T style={{ marginTop: 8 }}>{k.quote}</T>
            <Row style={{ marginTop: 8 }}>
              <Tag tone="n">{k.where}</Tag>
              {thanked.includes(k.who)
                ? <T s m>Thanked</T>
                : <Link onPress={() => thank(k.who)}>{t('Say thank you', 'धन्यवाद कहें')}</Link>}
            </Row>
          </Card>
        ))}
        <Card row>
          <View style={styles.grow}><H2>{t('Show these on my profile', 'इन्हें मेरी प्रोफ़ाइल पर दिखाएँ')}</H2><T s m>Customers see them before booking</T></View>
          <Toggle on={show} onChange={(v) => { setShow(v); nav.toast(v ? 'Shown on your profile' : 'Hidden from your profile'); }} />
        </Card>
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
});

export default KindWordsScreen;
