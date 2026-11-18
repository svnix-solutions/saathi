import React from 'react';
import { Avatar, Button, Card, H2, Lft, Link, Sheet, T } from '@/native/ui';

export type BlockedHelpersSheetProps = { visible: boolean; blocked: string[]; onUnblock: (name: string) => void; onClose: () => void };

/** "Do not send again" sheet: the blocked helpers, each with Unblock. */
export function BlockedHelpersSheet({ visible, blocked, onUnblock, onClose }: BlockedHelpersSheetProps) {
  return (
    <Sheet visible={visible} onClose={onClose}>
      <H2>Do not send again</H2>
      {blocked.length === 0 && <T m>No helpers blocked.</T>}
      {blocked.map((b) => (
        <Card key={b} row>
          <Lft><Avatar face="mt" size={32} /><H2>{b}</H2></Lft>
          <Link onPress={() => onUnblock(b)}>Unblock</Link>
        </Card>
      ))}
      <Button variant="outline" onPress={onClose}>Done</Button>
    </Sheet>
  );
}

export default BlockedHelpersSheet;
