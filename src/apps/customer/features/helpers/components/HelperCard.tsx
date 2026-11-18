import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, H2, Icon, Lft, Link, Row, T, useT, useTheme } from '@/native/ui';
import { helperName, tr, type HelperPerson } from '../data';
import { FavouriteChip } from './FavouriteChip';

export type HelperCardProps = {
  person: HelperPerson;
  favourite: boolean;
  onOpen: () => void;
  onToggleFavourite: () => void;
  onBook: () => void;
};

/** One of "Your helpers": face, name (opens the profile), visits, favourite star or chip, and "Book …". */
export function HelperCard({ person, favourite, onOpen, onToggleFavourite, onBook }: HelperCardProps) {
  const t = useT();
  const { c } = useTheme();
  const first = helperName(t, person.first);
  return (
    <Card sel={favourite}>
      <Row>
        <Lft style={styles.grow}>
          <Avatar face={person.face} />
          <View style={styles.grow}><Link color={c.ink} onPress={onOpen}><H2>{helperName(t, person.n)}</H2></Link><T s m>{tr(t, person.sub)}</T></View>
        </Lft>
        {favourite
          ? <FavouriteChip onPress={onToggleFavourite} />
          : <Link onPress={onToggleFavourite}><Icon name="star" color={c.mut} /></Link>}
      </Row>
      <Button variant={favourite ? 'primary' : 'outline'} style={{ marginTop: 10, paddingVertical: favourite ? 10 : 9 }} onPress={onBook}>
        {t(`Book ${person.first}`, `${first} को बुक करें`, `${first} ਨੂੰ ਬੁੱਕ ਕਰੋ`)}
      </Button>
    </Card>
  );
}

export default HelperCard;

const styles = StyleSheet.create({ grow: { flex: 1 } });
