import React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Col, H, H2, Lft, Link, Meter, Page, Row, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { useClipPlayer } from '../hooks/useClipPlayer';
import { clipTime, partnerStories } from '../data';

/** Design page 29 · screen 44: stories from other partners, the first one with a Hindi voice clip. */
export function StoriesScreen() {
  const nav = useNav();
  const t = useT();
  const clip = useClipPlayer();
  const { playing, sec } = clip;
  return (
    <Page variant="bare">
      <Screen>
        <Row><H>{t('Partner stories', 'पार्टनर की कहानियाँ')}</H><Link onPress={() => nav.push('kindWords')}>{t('Kind words', 'अच्छे शब्द')}</Link></Row>
        {partnerStories.map((s, i) => (
          <Card key={s.name} sel={i === 0}>
            <Lft>
              <Avatar face={s.face} size={40} />
              <View><H2>{s.name}</H2><T s m>{s.sub}</T></View>
            </Lft>
            {s.audio
              ? <T size={14} style={{ fontWeight: '600', marginTop: 10, lineHeight: 19 }}>{s.quote}</T>
              : <T style={{ marginTop: 8 }}>{s.quote}</T>}
            {s.audio && (
              <Col gap={6} style={{ marginTop: 8 }}>
                <Link onPress={clip.toggle}>
                  {playing ? `Pause · ${clipTime(sec)} of 1:00` : sec > 0 ? `Resume in हिन्दी · ${clipTime(sec)}` : 'Listen in हिन्दी · 1 min'}
                </Link>
                {(playing || sec > 0) && <Meter value={sec / 60} style={{ flex: 0 }} />}
              </Col>
            )}
          </Card>
        ))}
        <Spacer />
        <Button variant="outline" onPress={() => nav.push('shareStory')}>{t('Share my story', 'अपनी कहानी बताएँ')}</Button>
      </Screen>
      <PartnerTabs active="home" />
    </Page>
  );
}

export default StoriesScreen;
