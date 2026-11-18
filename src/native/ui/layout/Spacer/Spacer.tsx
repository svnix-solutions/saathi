import React from 'react';
import { StyleSheet, View } from 'react-native';

/** Pushes the following content to the bottom of a Screen (the design's `.end` = margin-top:auto). */
export const Spacer = () => <View style={styles.spacer} />;

const styles = StyleSheet.create({ spacer: { flex: 1, minHeight: 8 } });
