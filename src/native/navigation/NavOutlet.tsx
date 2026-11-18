import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNav } from './useNav';
import type { RouteMap } from './types';

/** Renders the current route's screen. */
export function NavOutlet({ routes }: { routes: RouteMap }) {
  const nav = useNav();
  const Screen = routes[nav.route.name];
  return <View style={styles.fill}>{Screen ? <Screen params={nav.route.params ?? {}} /> : null}</View>;
}

const styles = StyleSheet.create({ fill: { flex: 1 } });
