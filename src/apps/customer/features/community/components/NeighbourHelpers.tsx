import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Hr, Lft, Link, Row, T, useT } from '@/native/ui';
import { neighbourHelpers } from '../data';

/** "Helpers your neighbours trust" list with a Book link on each row. */
export function NeighbourHelpers({ onBook }: { onBook: (helper: string) => void }) {
  const t = useT();
  return (
    <Card style={styles.gap}>
      {neighbourHelpers.map((h, i) => (
        <React.Fragment key={h.name}>
          {i > 0 && <Hr />}
          <Row>
            <Lft>
              <Avatar face={h.face} size={26} />
              <View><T b>{t(h.name, h.nameHi, h.namePa)}</T><T s m>{t(`Favourite of ${h.flats} flats here`, `यहाँ ${h.flats} फ़्लैट की पसंद`, `ਇੱਥੇ ${h.flats} ਫ਼ਲੈਟਾਂ ਦੀ ਪਸੰਦ`)}</T></View>
            </Lft>
            <Link onPress={() => onBook(h.name)}>{t('Book', 'बुक', 'ਬੁੱਕ')}</Link>
          </Row>
        </React.Fragment>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({ gap: { gap: 9 } });
