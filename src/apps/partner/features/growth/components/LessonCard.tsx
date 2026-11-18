import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Check, H2, IconTile, Lft, T, Tag, useT, useTheme } from '@/native/ui';
import type { Lesson } from '../data';

export type LessonCardProps = {
  lesson: Lesson;
  /** position in the list (0-based), used in "Opens after lesson n" */
  index: number;
  done: boolean;
  /** the next lesson to do */
  current: boolean;
  locked: boolean;
  /** minutes watched so far */
  watched: number;
  onPress: () => void;
};

/** One training lesson: a tick when done, faded when locked, selected with Start / Continue when it is next. */
export function LessonCard({ lesson: l, index, done, current, locked, watched, onPress }: LessonCardProps) {
  const t = useT();
  const { c } = useTheme();
  return (
    <Card row sel={current} onPress={onPress} style={locked ? styles.locked : undefined}>
      <Lft style={styles.grow}>
        {done ? <Check on size={24} /> : <IconTile name={l.icon} bg={current ? c.card : undefined} />}
        <View style={styles.grow}>
          <H2>{t(l.title, l.hi, l.pa)}</H2>
          <T s m>
            {done ? t(`${l.mins} min video`, `${l.mins} मिनट का वीडियो`, `${l.mins} ਮਿੰਟ ਦੀ ਵੀਡੀਓ`)
              : locked ? t(`Opens after lesson ${index}`, `पाठ ${index} के बाद खुलेगा`, `ਪਾਠ ${index} ਤੋਂ ਬਾਅਦ ਖੁੱਲ੍ਹੇਗਾ`)
                : t(`${watched} of ${l.mins} min watched`, `${l.mins} में से ${watched} मिनट देखा`, `${l.mins} ਵਿੱਚੋਂ ${watched} ਮਿੰਟ ਦੇਖੀ`)}
          </T>
        </View>
      </Lft>
      {current && <Tag>{watched > 0 ? t('Continue', 'जारी रखें', 'ਜਾਰੀ ਰੱਖੋ') : t('Start', 'शुरू करें', 'ਸ਼ੁਰੂ ਕਰੋ')}</Tag>}
    </Card>
  );
}

const styles = StyleSheet.create({
  locked: { opacity: 0.6 },
  grow: { flex: 1 },
});

export default LessonCard;
