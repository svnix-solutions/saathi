import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Col, H, H2, Lft, Link, Meter, Page, Row, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { useClipPlayer } from '../hooks/useClipPlayer';
import { clipTime, partnerStories, tx } from '../data';

/** Design page 29 · screen 44: stories from other partners, the first one with a Hindi voice clip. */
export function StoriesScreen() {
  const nav = useNav();
  const t = useT();
  const clip = useClipPlayer();
  const { playing, sec } = clip;
  return (
    <Page variant="bare">
      <Screen>
        <Row style={styles.wrap}><H>{t('Partner stories', 'पार्टनर की कहानियाँ', 'ਪਾਰਟਨਰਾਂ ਦੀਆਂ ਕਹਾਣੀਆਂ')}</H><Link onPress={() => nav.push('kindWords')}>{t('Kind words', 'अच्छे शब्द', 'ਚੰਗੇ ਸ਼ਬਦ')}</Link></Row>
        {partnerStories.map((s, i) => (
          <Card key={s.name.en} sel={i === 0}>
            <Lft>
              <Avatar face={s.face} size={40} />
              <View style={styles.grow}><H2>{tx(t, s.name)}</H2><T s m>{tx(t, s.sub)}</T></View>
            </Lft>
            {s.audio
              ? <T size={14} style={{ fontWeight: '600', marginTop: 10, lineHeight: 19 }}>{tx(t, s.quote)}</T>
              : <T style={{ marginTop: 8 }}>{tx(t, s.quote)}</T>}
            {s.audio && (
              <Col gap={6} style={{ marginTop: 8 }}>
                <Link onPress={clip.toggle}>
                  {playing ? t(`Pause · ${clipTime(sec)} of 1:00`, `रोकें · ${clipTime(sec)} / 1:00`, `ਰੋਕੋ · ${clipTime(sec)} / 1:00`)
                    : sec > 0 ? t(`Resume in हिन्दी · ${clipTime(sec)}`, `हिन्दी में आगे सुनें · ${clipTime(sec)}`, `ਹਿੰਦੀ ਵਿੱਚ ਅੱਗੇ ਸੁਣੋ · ${clipTime(sec)}`)
                      : t('Listen in हिन्दी · 1 min', 'हिन्दी में सुनें · 1 मिनट', 'ਹਿੰਦੀ ਵਿੱਚ ਸੁਣੋ · 1 ਮਿੰਟ')}
                </Link>
                {(playing || sec > 0) && <Meter value={sec / 60} style={{ flex: 0 }} />}
              </Col>
            )}
          </Card>
        ))}
        <Spacer />
        <Button variant="outline" onPress={() => nav.push('shareStory')}>{t('Share my story', 'अपनी कहानी बताएँ', 'ਆਪਣੀ ਕਹਾਣੀ ਦੱਸੋ')}</Button>
      </Screen>
      <PartnerTabs active="home" />
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  wrap: { flexWrap: 'wrap', rowGap: 6 },
});

export default StoriesScreen;
