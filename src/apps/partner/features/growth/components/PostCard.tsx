import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Card, Icon, Lft, T, palette, useT, useTheme } from '@/native/ui';
import { tx, type Post } from '../data';

export type PostCardProps = {
  post: Post;
  onLike: () => void;
  /** extra action next to the likes (e.g. "I'll come" on a meet-up) */
  action?: React.ReactNode;
};

/** A community post with a star "like" count. */
export function PostCard({ post: p, onLike, action }: PostCardProps) {
  const t = useT();
  const { c } = useTheme();
  return (
    <Card>
      <T b>{tx(t, p.title)}</T>
      <T s m>{tx(t, p.body)}</T>
      <Lft gap={14} style={{ marginTop: 7 }}>
        <Pressable onPress={onLike} accessibilityRole="button" accessibilityLabel={t('Like', 'पसंद करें', 'ਪਸੰਦ ਕਰੋ')} style={styles.like}>
          <Icon name="star" size={14} color={p.liked ? palette.yellow : c.mut} fill={p.liked} />
          <T s b color={p.liked ? c.ink : c.mut}>{p.likes}</T>
        </Pressable>
        {action}
      </Lft>
    </Card>
  );
}

const styles = StyleSheet.create({
  like: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});

export default PostCard;
