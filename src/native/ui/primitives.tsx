/**
 * React Native primitives that mirror the design's CSS classes 1:1:
 *   .h → <H>, .h2 → <H2>, body → <T>, .s → <T s>, .m → <T m>
 *   .card → <Card>, .sel → <Card sel>, .btn/.btn.o/.btn.y → <Button variant>
 *   .pill → <Pill>, .cb → <Check>, .tag → <Tag>, .ic → <IconTile>, .row/.lft → <Row>/<Lft>
 *   .g2/.g3 → <Grid cols>, .hr → <Hr>, .inp → <Input>, .otp → <OtpInput>, .tog → <Toggle>
 *   .bub → <Bubble>, .st → <Stars>, .tabs → <TabBar>, .top → <TopBar>, .map → <MapMock>
 * All of them read colours and text scale from the ThemeProvider (dark mode / large text).
 */
import React from 'react';
import {
  Pressable, ScrollView, Text, TextInput, View,
  type StyleProp, type TextStyle, type ViewStyle,
} from 'react-native';
import { font, palette, radius } from '@/tokens';
import { useTheme } from '../theme';
import { Icon, type IconName } from './Icon';

type VS = StyleProp<ViewStyle>;
type TS = StyleProp<TextStyle>;

/* ---------- text ---------- */
type TProps = {
  children?: React.ReactNode; style?: TS; s?: boolean; m?: boolean; b?: boolean; center?: boolean;
  color?: string; size?: number; numberOfLines?: number; strike?: boolean;
};
export function T({ children, style, s, m, b, center, color, size, numberOfLines, strike }: TProps) {
  const { c, fs } = useTheme();
  return (
    <Text numberOfLines={numberOfLines} style={[{
      fontFamily: font.family, color: color ?? (m ? c.mut : c.ink), fontSize: fs(size ?? (s ? font.size.s : font.size.body)),
      lineHeight: fs((size ?? (s ? font.size.s : font.size.body)) * 1.4), fontWeight: b ? '700' : '400',
      textAlign: center ? 'center' : undefined, textDecorationLine: strike ? 'line-through' : undefined,
    }, style]}>{children}</Text>
  );
}
/** Screen headline (.h, 19px bold). Pass size={22} for sign-in titles. */
export function H({ children, style, size = font.size.h, color, center }: { children?: React.ReactNode; style?: TS; size?: number; color?: string; center?: boolean }) {
  const { c, fs } = useTheme();
  return <Text style={[{ fontFamily: font.family, fontSize: fs(size), lineHeight: fs(size * 1.2), fontWeight: '700', letterSpacing: -0.2, color: color ?? c.ink, textAlign: center ? 'center' : undefined }, style]}>{children}</Text>;
}
/** Section label (.h2, 13px bold). */
export function H2({ children, style, color, m, center }: { children?: React.ReactNode; style?: TS; color?: string; m?: boolean; center?: boolean }) {
  const { c, fs } = useTheme();
  return <Text style={[{ fontFamily: font.family, fontSize: fs(font.size.h2), lineHeight: fs(17), fontWeight: '700', color: color ?? (m ? c.mut : c.ink), textAlign: center ? 'center' : undefined }, style]}>{children}</Text>;
}
/** Green bold inline action text ("Change", "Book again"). */
export function Link({ children, onPress, color, style }: { children: React.ReactNode; onPress?: () => void; color?: string; style?: TS }) {
  const { c, fs } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="link" hitSlop={6}>
      <Text style={[{ fontFamily: font.family, fontSize: fs(font.size.s), fontWeight: '700', color: color ?? c.accent }, style]}>{children}</Text>
    </Pressable>
  );
}

/* ---------- layout ---------- */
export const Row = ({ children, style, gap = 8 }: { children?: React.ReactNode; style?: VS; gap?: number }) => (
  <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap }, style]}>{children}</View>
);
export const Lft = ({ children, style, gap = 8 }: { children?: React.ReactNode; style?: VS; gap?: number }) => (
  <View style={[{ flexDirection: 'row', alignItems: 'center', gap }, style]}>{children}</View>
);
export const Col = ({ children, style, gap = 0 }: { children?: React.ReactNode; style?: VS; gap?: number }) => (
  <View style={[{ gap }, style]}>{children}</View>
);
/** .g2 / .g3 grids. Children are laid out in equal columns. */
export function Grid({ cols = 2, gap, children, style }: { cols?: number; gap?: number; children: React.ReactNode; style?: VS }) {
  const g = gap ?? (cols === 3 ? 7 : 9);
  const items = React.Children.toArray(children);
  const rows: React.ReactNode[][] = [];
  items.forEach((it, i) => { if (i % cols === 0) rows.push([]); rows[rows.length - 1].push(it); });
  return (
    <View style={[{ gap: g }, style]}>
      {rows.map((r, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: g }}>
          {r.map((it, j) => <View key={j} style={{ flex: 1, minWidth: 0 }}>{it}</View>)}
          {r.length < cols && Array.from({ length: cols - r.length }).map((_, j) => <View key={'e' + j} style={{ flex: 1 }} />)}
        </View>
      ))}
    </View>
  );
}
export const Hr = ({ style }: { style?: VS }) => { const { c } = useTheme(); return <View style={[{ height: 1, backgroundColor: c.line }, style]} />; };
/** Pushes following content to the bottom of a Screen (.end = margin-top:auto). */
export const Spacer = () => <View style={{ flex: 1, minHeight: 8 }} />;

/**
 * The phone screen body (.scr): padding 20/16/14, gap 11, scrolls when content is long.
 * Put a <TopBar> before it and a <TabBar> after it inside a <View style={{flex:1}}>.
 */
export function Screen({ children, style, gap = 11, scroll = true, pad = true, bg }: {
  children?: React.ReactNode; style?: VS; gap?: number; scroll?: boolean; pad?: boolean; bg?: string;
}) {
  const { c } = useTheme();
  const inner: ViewStyle = { padding: pad ? 16 : 0, paddingTop: pad ? 20 : 0, paddingBottom: pad ? 14 : 0, gap, flexGrow: 1 };
  if (!scroll) return <View style={[{ flex: 1, backgroundColor: bg ?? c.surface }, inner, style]}>{children}</View>;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: bg ?? c.surface }} contentContainerStyle={[inner, style]} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

/* ---------- surfaces ---------- */
export function Card({ children, sel, tone, style, onPress, pad = true, row }: {
  children?: React.ReactNode; sel?: boolean; tone?: 'yellow' | 'mint' | 'red' | 'clear' | 'ink'; style?: VS;
  onPress?: () => void; pad?: boolean; row?: boolean;
}) {
  const { c } = useTheme();
  const base: ViewStyle = {
    borderWidth: sel ? 1.5 : 1, borderColor: sel ? c.selBorder : c.line, borderRadius: radius.card,
    paddingVertical: pad ? 11 : 0, paddingHorizontal: pad ? 12 : 0, backgroundColor: sel ? c.selBg : c.card,
  };
  if (tone === 'yellow') Object.assign(base, { backgroundColor: palette.yellow, borderWidth: 0 });
  if (tone === 'mint') Object.assign(base, { backgroundColor: c.mint, borderWidth: 0 });
  if (tone === 'red') Object.assign(base, { borderColor: c.red });
  if (tone === 'clear') Object.assign(base, { backgroundColor: 'transparent' });
  if (tone === 'ink') Object.assign(base, { backgroundColor: palette.ink, borderWidth: 0 });
  const rowStyle: ViewStyle | undefined = row ? { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 } : undefined;
  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [base, rowStyle, style as ViewStyle, pressed && { opacity: 0.85 }]}>
        {children}
      </Pressable>
    );
  }
  return <View style={[base, rowStyle, style]}>{children}</View>;
}

export function Button({ children, onPress, variant = 'primary', style, textStyle, big, disabled, danger, icon }: {
  children: React.ReactNode; onPress?: () => void; variant?: 'primary' | 'outline' | 'yellow' | 'ghost' | 'ghostDark';
  style?: VS; textStyle?: TS; big?: boolean; disabled?: boolean; danger?: boolean; icon?: IconName;
}) {
  const { c, fs } = useTheme();
  const v: Record<string, { bg: string; fg: string; border?: string }> = {
    primary: { bg: palette.green, fg: '#fff' },
    outline: { bg: 'transparent', fg: danger ? c.red : c.accent, border: danger ? c.line : c.accent },
    yellow: { bg: palette.yellow, fg: palette.ink },
    ghost: { bg: 'transparent', fg: c.accent },
    ghostDark: { bg: 'transparent', fg: '#fff', border: '#2d6a5b' },
  };
  const k = v[variant];
  return (
    <Pressable disabled={disabled} onPress={onPress} accessibilityRole="button"
      style={({ pressed }) => [{
        backgroundColor: k.bg, borderRadius: radius.btn, paddingVertical: big ? 17 : 13, paddingHorizontal: 13,
        alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6,
        borderWidth: k.border ? 1.5 : 0, borderColor: k.border, opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
        ...(variant === 'primary' && !disabled ? { boxShadow: '0 6px 12px -8px rgba(11,93,75,.5)' } : {}),
        ...(variant === 'yellow' && !disabled ? { boxShadow: '0 6px 12px -8px rgba(255,201,60,.8)' } : {}),
      } as ViewStyle, style]}>
      {icon && <Icon name={icon} size={16} color={k.fg} fill={icon === 'bolt' || icon === 'star'} />}
      <Text style={[{ fontFamily: font.family, color: k.fg, fontWeight: '700', fontSize: fs(big ? 16 : font.size.btn), textAlign: 'center' }, textStyle]}>{children}</Text>
    </Pressable>
  );
}

/** Selectable chip (.pill). */
export function Pill({ children, sel, onPress, style, s }: { children: React.ReactNode; sel?: boolean; onPress?: () => void; style?: VS; s?: boolean }) {
  const { c, fs } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: !!sel }}
      style={[{ borderWidth: sel ? 1.5 : 1, borderColor: sel ? c.selBorder : c.line, backgroundColor: sel ? c.selBg : c.card, borderRadius: radius.pill, paddingVertical: 9, paddingHorizontal: 4, alignItems: 'center' }, style]}>
      <Text style={{ fontFamily: font.family, fontWeight: '600', fontSize: fs(s ? 11 : 12), color: c.ink, textAlign: 'center' }}>{children}</Text>
    </Pressable>
  );
}

/** Checkbox (.cb). Use with a label via <CheckRow>. */
export function Check({ on, size = 18 }: { on?: boolean; size?: number }) {
  const { c } = useTheme();
  return (
    <View style={{ width: size, height: size, borderRadius: 6, borderWidth: 1.5, borderColor: on ? palette.green : c.line, backgroundColor: on ? palette.green : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
      {on && <Icon name="check" size={size * 0.66} color="#fff" strokeWidth={3} />}
    </View>
  );
}
export function CheckRow({ on, label, onPress, size, done, s }: { on?: boolean; label: string; onPress?: () => void; size?: number; done?: boolean; s?: boolean }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="checkbox" accessibilityState={{ checked: !!on }} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Check on={on} size={size} />
      <T m={done && on} strike={done && on} s={s} size={size && size > 20 ? 13 : undefined}>{label}</T>
    </Pressable>
  );
}

/** Small status chip (.tag): yellow default, g=green, n=mint, x=grey, r=red outline. */
export function Tag({ children, tone = 'y', style }: { children: React.ReactNode; tone?: 'y' | 'g' | 'n' | 'x' | 'r'; style?: VS }) {
  const { c, fs } = useTheme();
  const m = {
    y: { bg: palette.yellow, fg: palette.ink, b: undefined as string | undefined },
    g: { bg: palette.green, fg: '#fff', b: undefined },
    n: { bg: c.mint, fg: palette.greenD, b: undefined },
    x: { bg: c.chip, fg: c.mut, b: undefined },
    r: { bg: c.card, fg: c.red, b: c.red },
  }[tone];
  return (
    <View style={[{ alignSelf: 'flex-start', backgroundColor: m.bg, borderRadius: 20, paddingVertical: 3, paddingHorizontal: 9, borderWidth: m.b ? 1 : 0, borderColor: m.b }, style]}>
      <Text style={{ fontFamily: font.family, fontSize: fs(10), fontWeight: '700', color: tone === 'n' && c.mint !== palette.mint ? c.accent : m.fg }} numberOfLines={1}>{children}</Text>
    </View>
  );
}

/** Mint rounded square with an icon (.ic). */
export function IconTile({ name, onPress, size = 34, color, bg }: { name: IconName; onPress?: () => void; size?: number; color?: string; bg?: string }) {
  const { c } = useTheme();
  const box = <View style={{ width: size, height: size, borderRadius: 10, backgroundColor: bg ?? c.mint, alignItems: 'center', justifyContent: 'center' }}><Icon name={name} color={color ?? c.accent} /></View>;
  return onPress ? <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={name}>{box}</Pressable> : box;
}

/* ---------- inputs ---------- */
export function Input({ value, onChangeText, placeholder, prefix, keyboardType, style, small, multiline, maxLength, secure }: {
  value?: string; onChangeText?: (s: string) => void; placeholder?: string; prefix?: string;
  keyboardType?: 'default' | 'phone-pad' | 'number-pad' | 'email-address'; style?: VS; small?: boolean; multiline?: boolean; maxLength?: number; secure?: boolean;
}) {
  const { c, fs } = useTheme();
  return (
    <View style={[{ borderWidth: 1.5, borderColor: c.line, borderRadius: 12, padding: 12, backgroundColor: c.card, flexDirection: 'row', alignItems: multiline ? 'flex-start' : 'center', gap: 6 }, style]}>
      {prefix && <Text style={{ fontFamily: font.family, color: c.mut, fontSize: fs(15), fontWeight: '600' }}>{prefix}</Text>}
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={c.mut}
        keyboardType={keyboardType} multiline={multiline} maxLength={maxLength} secureTextEntry={secure}
        style={{ flex: 1, minWidth: 0, fontFamily: font.family, fontSize: fs(small ? 13 : 15), fontWeight: small ? '400' : '600', color: c.ink, padding: 0, outlineStyle: 'none', minHeight: multiline ? 46 : undefined } as unknown as TextStyle} />
    </View>
  );
}

/** 4 (or 6) box SMS code input. Calls onComplete when every box is filled. */
export function OtpInput({ length = 4, value, onChange, error }: { length?: number; value: string; onChange: (v: string) => void; error?: boolean }) {
  const { c, fs } = useTheme();
  const refs = React.useRef<({ focus: () => void } | null)[]>([]);
  return (
    <View style={{ flexDirection: 'row', gap: 9 }}>
      {Array.from({ length }).map((_, i) => {
        const active = value.length === i;
        return (
          <TextInput key={i} ref={(r: any) => { refs.current[i] = r; }} value={value[i] ?? ''} maxLength={1} keyboardType="number-pad"
            accessibilityLabel={`Digit ${i + 1}`}
            onChangeText={(d) => {
              const digit = d.replace(/\D/g, '').slice(-1);
              const next = (value.slice(0, i) + digit + value.slice(i + 1)).slice(0, length);
              onChange(next);
              if (digit && i < length - 1) refs.current[i + 1]?.focus();
            }}
            onKeyPress={(e) => { if (e.nativeEvent.key === 'Backspace' && !value[i] && i > 0) { onChange(value.slice(0, i - 1)); refs.current[i - 1]?.focus(); } }}
            style={{
              flex: 1, minWidth: 0, minHeight: 50, textAlign: 'center', fontSize: fs(20), fontWeight: '600', fontFamily: font.family, color: c.ink,
              borderWidth: 1.5, borderRadius: 12, borderColor: error ? c.red : active ? c.selBorder : c.line,
              backgroundColor: active ? c.selBg : c.card, outlineStyle: 'none',
            } as unknown as TextStyle} />
        );
      })}
    </View>
  );
}

export function Toggle({ on, onChange, big }: { on: boolean; onChange?: (v: boolean) => void; big?: boolean }) {
  const { c } = useTheme();
  const w = big ? 46 : 34, h = big ? 26 : 20, k = big ? 20 : 14;
  return (
    <Pressable accessibilityRole="switch" accessibilityState={{ checked: on }} onPress={() => onChange?.(!on)}
      style={{ width: w, height: h, borderRadius: 20, backgroundColor: on ? palette.green : c.line, padding: 3, flexDirection: 'row', justifyContent: on ? 'flex-end' : 'flex-start' }}>
      <View style={{ width: k, height: k, borderRadius: k / 2, backgroundColor: '#fff' }} />
    </Pressable>
  );
}

/** Step progress bar used in sign-up (filled segments of `total`). */
export function Steps({ step, total }: { step: number; total: number }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 5 }}>
      {Array.from({ length: total }).map((_, i) => <View key={i} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: i < step ? palette.green : c.line }} />)}
    </View>
  );
}

/** Chat bubble (.bub, .bub.me). */
export function Bubble({ children, me }: { children: React.ReactNode; me?: boolean }) {
  const { c, fs } = useTheme();
  return (
    <View style={{ maxWidth: '82%', paddingVertical: 9, paddingHorizontal: 12, borderRadius: 14, backgroundColor: me ? palette.green : c.mint, alignSelf: me ? 'flex-end' : 'flex-start' }}>
      <Text style={{ fontFamily: font.family, fontSize: fs(12), color: me ? '#fff' : c.ink }}>{children}</Text>
    </View>
  );
}

/** Star rating. Interactive when onChange is given. */
export function Stars({ value, onChange, size = 16, max = 5 }: { value: number; onChange?: (n: number) => void; size?: number; max?: number }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: size > 20 ? 6 : 2 }} accessibilityLabel={`${value} of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => {
        const on = i < Math.round(value);
        const star = <Icon name="star" size={size} color={on ? palette.yellow : c.line} fill={on} />;
        return onChange ? <Pressable key={i} onPress={() => onChange(i + 1)} accessibilityLabel={`${i + 1} stars`}>{star}</Pressable> : <View key={i}>{star}</View>;
      })}
    </View>
  );
}

/** Bottom tab bar (.tabs). */
export function TabBar<K extends string>({ tabs, active, onChange }: { tabs: { key: K; label: string; icon: IconName; badge?: number }[]; active: K; onChange?: (k: K) => void }) {
  const { c, fs } = useTheme();
  return (
    <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: c.line, paddingTop: 8, paddingBottom: 12, backgroundColor: c.tabBg, boxShadow: '0 -6px 16px -10px rgba(15,31,28,.18)' } as ViewStyle}>
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <Pressable key={t.key} onPress={() => onChange?.(t.key)} accessibilityRole="tab" accessibilityState={{ selected: on }} style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <View style={{ paddingHorizontal: 13, paddingVertical: 3, borderRadius: 12, backgroundColor: on ? c.mint : 'transparent' }}>
              <Icon name={t.icon} color={on ? c.accent : c.mut} />
            </View>
            <Text style={{ fontFamily: font.family, fontSize: fs(10), color: on ? c.accent : c.mut, fontWeight: on ? '700' : '400' }}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Green header (.top) used by the partner app. */
export function TopBar({ children, style }: { children: React.ReactNode; style?: VS }) {
  return <View style={[{ backgroundColor: palette.green, paddingTop: 20, paddingHorizontal: 16, paddingBottom: 14, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }, style]}>{children}</View>;
}

/** "‹ Title" back row used at the top of most inner screens. */
export function BackHeader({ title, onBack, right, color }: { title: string; onBack?: () => void; right?: React.ReactNode; color?: string }) {
  const { c } = useTheme();
  return (
    <Row>
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Back" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }} hitSlop={8}>
        <Icon name="back" color={color ?? c.ink} />
        <H2 color={color}>{title}</H2>
      </Pressable>
      {right}
    </Row>
  );
}

/**
 * Stylised map (.map): pale green with white roads and up to N dots.
 * dots: { x, y, icon, tone: 'green'|'yellow' }. Optional route line between first two dots.
 */
export function MapMock({ height = 230, dots = [], route = true, style, children }: {
  height?: number; style?: VS; route?: boolean; children?: React.ReactNode;
  dots?: { x: number; y: number; icon?: IconName; tone?: 'green' | 'yellow' | 'red'; label?: string }[];
}) {
  const { c, dark } = useTheme();
  const roads: ViewStyle[] = [
    { left: 0, right: 0, top: height * 0.4, height: 14 }, { top: 0, bottom: 0, left: '54%', width: 14 },
    { left: 0, right: 0, top: height * 0.77, height: 10 }, { top: 0, bottom: 0, left: '20%', width: 10 },
  ];
  const [a, b] = dots;
  return (
    <View style={[{ height, backgroundColor: c.mapBg, overflow: 'hidden', position: 'relative' }, style]}>
      {roads.map((r, i) => <View key={i} style={[{ position: 'absolute', backgroundColor: dark ? '#24332f' : '#fff' } as ViewStyle, r]} />)}
      {route && a && b && (
        <View style={{ position: 'absolute', left: Math.min(a.x, b.x) + 15, top: a.y + 14, width: Math.abs(b.x - a.x), height: 3, backgroundColor: palette.green }} />
      )}
      {dots.map((d, i) => (
        <View key={i} style={{ position: 'absolute', left: d.x, top: d.y, width: 30, height: 30, borderRadius: 15, borderWidth: 3, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', backgroundColor: d.tone === 'yellow' ? palette.yellow : d.tone === 'red' ? palette.red : palette.green }}>
          {d.icon ? <Icon name={d.icon} size={14} color={d.tone === 'yellow' ? palette.ink : '#fff'} /> : <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>{d.label}</Text>}
        </View>
      ))}
      {children}
    </View>
  );
}

/** Circular countdown (the "Job in progress" ring). pct 0–1 is the elapsed share. */
export function Ring({ pct, size = 150, children }: { pct: number; size?: number; children?: React.ReactNode }) {
  const { c } = useTheme();
  return (
    <View style={{ alignSelf: 'center', width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center', backgroundImage: `conic-gradient(${palette.green} 0 ${pct * 100}%, ${c.mint} 0)` } as ViewStyle}>
      <View style={{ width: size - 28, height: size - 28, borderRadius: size, backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center' }}>{children}</View>
    </View>
  );
}

/** Simple bar chart (partner earnings). values 0–1. */
export function Bars({ values, highlight, labels, height = 96 }: { values: number[]; highlight?: number; labels?: string[]; height?: number }) {
  const { c } = useTheme();
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 9, height }}>
        {values.map((v, i) => <View key={i} style={{ flex: 1, height: `${Math.max(v, 0.04) * 100}%`, borderRadius: 5, backgroundColor: i === highlight ? palette.green : v < 0.1 ? c.line : c.mint }} />)}
      </View>
      {labels && <View style={{ flexDirection: 'row', gap: 9, marginTop: 6 }}>{labels.map((l, i) => <T key={i} s m center style={{ flex: 1 }}>{l}</T>)}</View>}
    </View>
  );
}

/** A bottom sheet / modal overlay inside the phone. */
export function Sheet({ visible, onClose, children }: { visible: boolean; onClose?: () => void; children: React.ReactNode }) {
  const { c } = useTheme();
  if (!visible) return null;
  return (
    <View style={{ position: 'absolute', inset: 0, zIndex: 50, justifyContent: 'flex-end' } as ViewStyle}>
      <Pressable onPress={onClose} accessibilityLabel="Close" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15,31,28,.45)' } as ViewStyle} />
      <View style={{ backgroundColor: c.surface, borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 16, paddingBottom: 20, gap: 11 }}>{children}</View>
    </View>
  );
}

/** Transient message at the top of the phone. */
export function Toast({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <View style={{ position: 'absolute', top: 12, left: 12, right: 12, zIndex: 60, backgroundColor: palette.ink, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12 }}>
      <Text style={{ color: '#fff', fontFamily: font.family, fontSize: 12, fontWeight: '600' }}>{message}</Text>
    </View>
  );
}
