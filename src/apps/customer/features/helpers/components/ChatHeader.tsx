import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, H2, Icon, Lft, Link, Row, T, TopBar, palette, useT } from '@/native/ui';

export type ChatHeaderProps = { typing: boolean; onCall: () => void };

/** Green header of the chat: back, Sunita's face, status ("Typing…") and a call button. */
export function ChatHeader({ typing, onCall }: ChatHeaderProps) {
  const t = useT();
  return (
    <TopBar style={{ paddingBottom: 12, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
      <Row>
        <Lft style={styles.grow}>
          <TopBar.Back />
          <Avatar face="sd" size={26} />
          <View style={styles.grow}>
            <H2 color={palette.white}>{t('Sunita D.', 'सुनीता डी.', 'ਸੁਨੀਤਾ ਡੀ.')}</H2>
            <T s color={palette.white} style={styles.dim}>
              {typing ? t('Typing…', 'लिख रही हैं…', 'ਲਿਖ ਰਹੀ ਹੈ…') : t('Arriving in 5 min', '5 मिनट में पहुँचेंगी', '5 ਮਿੰਟ ਵਿੱਚ ਪਹੁੰਚੇਗੀ')}
            </T>
          </View>
        </Lft>
        <Link onPress={onCall}><Icon name="call" color={palette.white} /></Link>
      </Row>
    </TopBar>
  );
}

export default ChatHeader;

const styles = StyleSheet.create({ dim: { opacity: 0.8 }, grow: { flex: 1 } });
