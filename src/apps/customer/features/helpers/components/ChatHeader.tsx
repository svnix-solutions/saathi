import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, H2, Icon, Lft, Link, Row, T, TopBar, palette } from '@/native/ui';

export type ChatHeaderProps = { typing: boolean; onCall: () => void };

/** Green header of the chat: back, Sunita's face, status ("Typing…") and a call button. */
export function ChatHeader({ typing, onCall }: ChatHeaderProps) {
  return (
    <TopBar style={{ paddingBottom: 12, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
      <Row>
        <Lft>
          <TopBar.Back />
          <Avatar face="sd" size={26} />
          <View><H2 color={palette.white}>Sunita D.</H2><T s color={palette.white} style={styles.dim}>{typing ? 'Typing…' : 'Arriving in 5 min'}</T></View>
        </Lft>
        <Link onPress={onCall}><Icon name="call" color={palette.white} /></Link>
      </Row>
    </TopBar>
  );
}

export default ChatHeader;

const styles = StyleSheet.create({ dim: { opacity: 0.8 } });
