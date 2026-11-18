import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Avatar, Button, Card, H, H2, Input, Lft, ListCard, Row, Screen, T, Tag, palette, useNav, useT, useTheme } from '@/native/ui';
import { PostCard } from '../components/PostCard';
import { leaderboard, posts as samplePosts, type Post } from '../data';

/** Design page 31 · screen 54: this week's Block C leaderboard, team news and tips from other partners. */
export function CommunityScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [draft, setDraft] = useState('');
  const [going, setGoing] = useState(false);
  const like = (id: string) => setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p)));
  const post = () => {
    if (!draft.trim()) return;
    setPosts((ps) => [{ id: String(Date.now()), title: 'Tip from Sunita', body: `"${draft.trim()}"`, likes: 0 }, ...ps]);
    setDraft('');
    nav.toast('Shared with Block C partners');
  };
  const toggleGoing = () => { setGoing(!going); nav.toast(going ? 'Removed from meet-up' : 'See you Sunday at 4 pm'); };
  return (
    <Screen>
      <Row><H>{t('Block C partners', 'ब्लॉक सी पार्टनर')}</H><Tag tone="n">This week</Tag></Row>
      <ListCard gap={9}>
        {leaderboard.map((b) => (
          <Row key={b.rank} style={b.me ? { backgroundColor: c.mint, marginVertical: -4, marginHorizontal: -6, paddingVertical: 4, paddingHorizontal: 6, borderRadius: 8 } : undefined}>
            <Lft><T b style={styles.rank}>{b.rank}</T><Avatar face={b.face} size={28} /><T b>{b.name}</T></Lft>
            <T s m>{b.visits} visits · {b.rating}</T>
          </Row>
        ))}
      </ListCard>
      <Card tone="yellow"><H2 color={palette.ink}>Top 3 get ₹200 extra</H2><T color={palette.ink}>4 more visits and you are first.</T></Card>
      <H2>{t('From the team', 'टीम से')}</H2>
      <Card style={styles.composer}>
        <Input small multiline value={draft} onChangeText={setDraft} placeholder={t('Share a tip with Block C…', 'ब्लॉक सी के साथ कोई सुझाव बाँटें…')} />
        <Button disabled={!draft.trim()} style={{ paddingVertical: 9 }} onPress={post}>{t('Post', 'पोस्ट करें')}</Button>
      </Card>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} onLike={() => like(p.id)} action={p.id === 'meet' && (
          <Pressable onPress={toggleGoing} accessibilityRole="button">
            <T s b color={c.accent}>{going ? "✓ I'm going" : "I'll come"}</T>
          </Pressable>
        )} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  rank: { width: 14 },
  composer: { gap: 8 },
});

export default CommunityScreen;
