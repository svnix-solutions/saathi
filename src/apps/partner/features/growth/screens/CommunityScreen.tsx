import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Avatar, Button, Card, H, H2, Input, Lft, ListCard, Row, Screen, T, Tag, palette, useNav, useT, useTheme } from '@/native/ui';
import { PostCard } from '../components/PostCard';
import { leaderboard, myTipTitle, posts as samplePosts, tx, type Post } from '../data';

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
    const body = `"${draft.trim()}"`;
    setPosts((ps) => [{ id: String(Date.now()), title: myTipTitle, body: { en: body, hi: body, pa: body }, likes: 0 }, ...ps]);
    setDraft('');
    nav.toast(t('Shared with Block C partners', 'ब्लॉक सी की पार्टनर के साथ बाँटा', 'ਬਲਾਕ ਸੀ ਦੇ ਪਾਰਟਨਰਾਂ ਨਾਲ ਸਾਂਝਾ ਕੀਤਾ'));
  };
  const toggleGoing = () => { setGoing(!going); nav.toast(going ? t('Removed from meet-up', 'मीटिंग से नाम हटाया', 'ਮੀਟਿੰਗ ਤੋਂ ਨਾਮ ਹਟਾਇਆ') : t('See you Sunday at 4 pm', 'रविवार शाम 4 बजे मिलते हैं', 'ਐਤਵਾਰ ਸ਼ਾਮ 4 ਵਜੇ ਮਿਲਦੇ ਹਾਂ')); };
  return (
    <Screen>
      <Row style={styles.wrap}><H>{t('Block C partners', 'ब्लॉक सी पार्टनर', 'ਬਲਾਕ ਸੀ ਪਾਰਟਨਰ')}</H><Tag tone="n">{t('This week', 'इस हफ़्ते', 'ਇਸ ਹਫ਼ਤੇ')}</Tag></Row>
      <ListCard gap={9}>
        {leaderboard.map((b) => (
          <Row key={b.rank} style={b.me ? { backgroundColor: c.mint, marginVertical: -4, marginHorizontal: -6, paddingVertical: 4, paddingHorizontal: 6, borderRadius: 8 } : undefined}>
            <Lft style={styles.grow}><T b style={styles.rank}>{b.rank}</T><Avatar face={b.face} size={28} /><T b style={styles.grow}>{tx(t, b.name)}</T></Lft>
            <T s m>{t(`${b.visits} visits · ${b.rating}`, `${b.visits} विज़िट · ${b.rating}`, `${b.visits} ਵਿਜ਼ਿਟਾਂ · ${b.rating}`)}</T>
          </Row>
        ))}
      </ListCard>
      <Card tone="yellow">
        <H2 color={palette.ink}>{t('Top 3 get ₹200 extra', 'टॉप 3 को ₹200 ज़्यादा', 'ਟਾਪ 3 ਨੂੰ ₹200 ਵੱਧ')}</H2>
        <T color={palette.ink}>{t('4 more visits and you are first.', '4 विज़िट और, फिर आप पहले नंबर पर।', '4 ਵਿਜ਼ਿਟਾਂ ਹੋਰ, ਫਿਰ ਤੁਸੀਂ ਪਹਿਲੇ ਨੰਬਰ ਤੇ।')}</T>
      </Card>
      <H2>{t('From the team', 'टीम से', 'ਟੀਮ ਵੱਲੋਂ')}</H2>
      <Card style={styles.composer}>
        <Input small multiline value={draft} onChangeText={setDraft} placeholder={t('Share a tip with Block C…', 'ब्लॉक सी के साथ कोई सुझाव बाँटें…', 'ਬਲਾਕ ਸੀ ਨਾਲ ਕੋਈ ਸੁਝਾਅ ਸਾਂਝਾ ਕਰੋ…')} />
        <Button disabled={!draft.trim()} style={{ paddingVertical: 9 }} onPress={post}>{t('Post', 'पोस्ट करें', 'ਪੋਸਟ ਕਰੋ')}</Button>
      </Card>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} onLike={() => like(p.id)} action={p.id === 'meet' && (
          <Pressable onPress={toggleGoing} accessibilityRole="button">
            <T s b color={c.accent}>{going ? t("✓ I'm going", '✓ मैं आ रही हूँ', '✓ ਮੈਂ ਆ ਰਹੀ ਹਾਂ') : t("I'll come", 'मैं आऊँगी', 'ਮੈਂ ਆਵਾਂਗੀ')}</T>
          </Pressable>
        )} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  rank: { width: 14 },
  grow: { flex: 1 },
  wrap: { flexWrap: 'wrap', rowGap: 6 },
  composer: { gap: 8 },
});

export default CommunityScreen;
