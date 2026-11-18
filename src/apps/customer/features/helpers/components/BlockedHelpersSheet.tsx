import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, H2, Lft, Link, Sheet, T, useT } from '@/native/ui';
import { helperName } from '../data';

export type BlockedHelpersSheetProps = { visible: boolean; blocked: string[]; onUnblock: (name: string) => void; onClose: () => void };

/** "Do not send again" sheet: the blocked helpers, each with Unblock. */
export function BlockedHelpersSheet({ visible, blocked, onUnblock, onClose }: BlockedHelpersSheetProps) {
  const t = useT();
  return (
    <Sheet visible={visible} onClose={onClose}>
      <H2>{t('Do not send again', 'दोबारा न भेजें', 'ਦੁਬਾਰਾ ਨਾ ਭੇਜੋ')}</H2>
      {blocked.length === 0 && <T m>{t('No helpers blocked.', 'कोई हेल्पर ब्लॉक नहीं।', 'ਕੋਈ ਹੈਲਪਰ ਬਲਾਕ ਨਹੀਂ।')}</T>}
      {blocked.map((b) => (
        <Card key={b} row>
          <Lft style={styles.grow}><Avatar face="mt" size={32} /><H2 style={styles.grow}>{helperName(t, b)}</H2></Lft>
          <Link onPress={() => onUnblock(b)}>{t('Unblock', 'अनब्लॉक करें', 'ਅਨਬਲਾਕ ਕਰੋ')}</Link>
        </Card>
      ))}
      <Button variant="outline" onPress={onClose}>{t('Done', 'हो गया', 'ਹੋ ਗਿਆ')}</Button>
    </Sheet>
  );
}

export default BlockedHelpersSheet;

const styles = StyleSheet.create({ grow: { flex: 1 } });
