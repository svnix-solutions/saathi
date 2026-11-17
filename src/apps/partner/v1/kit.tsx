/**
 * Small helpers shared by the partner v1 screens (local to this area).
 * Candidates for the shared kit are listed in the area report.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import {
  Button, Check, H, H2, Icon, Row, T, ThemeProvider, TopBar, palette, useAppState, useTheme, type IconName, type Locale,
} from '@/native/ui';
import { font } from '@/tokens';
import type { PartnerState } from '../chrome';

/** Today's list on the earnings screen. */
export type PayLine = { title: string; titleHi: string; sub: string; amt: number; tip?: boolean };

/** Extra optional fields this area keeps in the shared partner state. */
export type V1State = PartnerState & {
  locale?: Locale;
  /** auto-ring a new job ~4 s after Home opens online (off on design pages) */
  autoOffer?: boolean;
  offerShown?: boolean;
  jobsToday?: number;
  earnedToday?: number;
  week?: number;
  weekJobs?: number;
  today?: PayLine[];
  email?: string;
  area?: string;
  emergency?: string;
  ref2?: { name: string; phone: string; rel: string };
  selfieIn?: boolean;
  selfieOut?: boolean;
  jobEndsAt?: number;
  checkedInAt?: string;
  photos?: string[];
  alertsRead?: string[];
  familyLive?: boolean;
};

export const defaultToday: PayLine[] = [
  { title: 'General cleaning', titleHi: 'सामान्य सफ़ाई', sub: '11:10 am · 1 hr', amt: 126 },
  { title: 'Dishes & meal prep', titleHi: 'बर्तन और खाना तैयारी', sub: '9:00 am · 1.5 hr', amt: 189 },
  { title: 'Tip from customer', titleHi: 'ग्राहक से टिप', sub: '11:15 am', amt: 50, tip: true },
];

/** Re-provides the theme with the language the partner picked in the app (st.locale). */
export function withLang<P extends object>(C: React.ComponentType<P>) {
  const Wrapped = (p: P) => {
    const [st] = useAppState<V1State>();
    return <ThemeProvider locale={st.locale}><C {...p} /></ThemeProvider>;
  };
  Wrapped.displayName = `withLang(${C.displayName ?? C.name ?? 'Screen'})`;
  return Wrapped;
}

/** Full-height screen wrapper (TopBar + Screen + tabs go inside). */
export const Page = ({ children, bg }: { children: React.ReactNode; bg?: string }) => {
  const { c } = useTheme();
  return <View style={{ flex: 1, backgroundColor: bg ?? c.surface }}>{children}</View>;
};

/** White text on the green header. `dim` = the design's opacity .8 lines. */
export function TopT({ children, dim, b, style }: { children: React.ReactNode; dim?: boolean; b?: boolean; style?: StyleProp<TextStyle> }) {
  return <T s color="#fff" b={b} style={[dim ? { opacity: 0.8 } : null, style]}>{children}</T>;
}
export const TopH = ({ children, size }: { children: React.ReactNode; size?: number }) => <H color="#fff" size={size}>{children}</H>;
export const TopH2 = ({ children }: { children: React.ReactNode }) => <H2 color="#fff">{children}</H2>;
export { TopBar };

/** The design's tall bottom button (padding 16, 15px). */
export function Big({ children, onPress, variant = 'primary', disabled, icon, style, pad = 16, size = 15, textColor }: {
  children: React.ReactNode; onPress?: () => void; variant?: 'primary' | 'outline' | 'yellow' | 'ghostDark'; disabled?: boolean;
  icon?: IconName; style?: StyleProp<ViewStyle>; pad?: number; size?: number; textColor?: string;
}) {
  const { fs } = useTheme();
  return (
    <Button variant={variant} onPress={onPress} disabled={disabled} icon={icon}
      style={[{ paddingVertical: pad }, style]} textStyle={{ fontSize: fs(size), ...(textColor ? { color: textColor } : {}) }}>
      {children}
    </Button>
  );
}

/** Outline button with a grey border and ink text (`.btn.o` with border-color line). */
export function Plain({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) {
  const { c } = useTheme();
  return <Button variant="outline" onPress={onPress} style={{ borderColor: c.line }} textStyle={{ color: c.ink }}>{children}</Button>;
}

/** Sign-up step bar + "Sign-up · step n of 6". */
export function SignupSteps({ step, label = true }: { step: number; label?: boolean }) {
  const { c } = useTheme();
  const t = useTheme().locale === 'hi';
  return (
    <View style={{ gap: 11 }}>
      <View style={{ flexDirection: 'row', gap: 5 }}>
        {[0, 1, 2, 3, 4, 5].map((i) => <View key={i} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: i < step ? palette.green : c.line }} />)}
      </View>
      {label && <T s m>{t ? `साइन-अप · चरण ${step} / 6` : `Sign-up · step ${step} of 6`}</T>}
    </View>
  );
}

/** Pressable 24px checkbox (`.cb` 24×24). */
export const Cb = ({ on, size = 24 }: { on?: boolean; size?: number }) => <Check on={on} size={size} />;

/** Icon + right chevron used in list rows. */
export const Chev = () => { const { c } = useTheme(); return <Icon name="chevron" color={c.mut} />; };

/** Mint "added" / dashed "add" photo tile. */
export function PhotoTile({ added, label, icon, onPress, height = 78, bold }: {
  added?: boolean; label: string; icon?: IconName; onPress?: () => void; height?: number; bold?: boolean;
}) {
  const { c } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}
      style={{ height, borderRadius: height > 70 ? 12 : 11, alignItems: 'center', justifyContent: 'center', gap: 2,
        backgroundColor: added ? c.mint : 'transparent', borderWidth: added ? 0 : 1.5, borderStyle: 'dashed', borderColor: c.accent }}>
      {icon && <Icon name={icon} color={c.accent} />}
      <T s center color={c.accent} b={bold}>{label}</T>
    </Pressable>
  );
}

/** A label/value row inside a card. */
export function KV({ k, v }: { k: React.ReactNode; v: React.ReactNode }) {
  return <Row>{typeof k === 'string' ? <T style={{ flex: 1 }}>{k}</T> : k}{v}</Row>;
}

/** Seconds → "m:ss". */
export const mmss = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.floor(Math.max(0, s) % 60)).padStart(2, '0')}`;

/** A countdown from `from` seconds, ticking once a second while `running`. */
export function useCountdown(from: number, running = true) {
  const [left, setLeft] = useState(from);
  useEffect(() => {
    if (!running || left <= 0) return;
    const id = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(id);
  }, [left, running]);
  return [left, setLeft] as const;
}

/** Seconds left on the current job. Uses st.jobEndsAt when set, else starts at 38:12 (the design's value). */
export function useJobClock() {
  const [st] = useAppState<V1State>();
  const fallback = useRef(Date.now() + 2292 * 1000);
  const ends = st.jobEndsAt ?? fallback.current;
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  return Math.max(0, Math.round((ends - now) / 1000));
}
export const leftLabel = (sec: number, hi: boolean) => (hi ? `${mmss(sec)} बाकी` : `${mmss(sec)} left`);

/** Round icon badge (the 64px `.ic` circles on the quiet/error screens). */
export function Badge({ name, tone }: { name: IconName; tone?: 'red' }) {
  const { c } = useTheme();
  return (
    <View style={{ width: 64, height: 64, borderRadius: 32, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: tone === 'red' ? '#fbe9e7' : c.mint }}>
      <Icon name={name} size={30} color={tone === 'red' ? palette.red : c.accent} />
    </View>
  );
}

/** A bold green inline action (design: `.s` 700 green). */
export function GreenText({ children, onPress, center }: { children: React.ReactNode; onPress?: () => void; center?: boolean }) {
  const { c, fs } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" hitSlop={6} style={center ? { alignSelf: 'center' } : undefined}>
      <Text style={{ fontFamily: font.family, fontSize: fs(11), fontWeight: '700', color: c.accent, textAlign: center ? 'center' : undefined }}>{children}</Text>
    </Pressable>
  );
}
