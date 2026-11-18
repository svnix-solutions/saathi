import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, H2, Icon, Lft, T, palette, useT, useTheme } from '@/native/ui';

/** The red "Emergency" card at the top of Help and safety. */
export function EmergencyCard({ onPress }: { onPress: () => void }) {
  const t = useT();
  const { c } = useTheme();
  return (
    <Card onPress={onPress} style={{ backgroundColor: c.red, borderWidth: 0 }}>
      <Lft>
        <Icon name="shield" size={26} color={palette.white} />
        <View>
          <H2 color={palette.white} style={styles.title}>{t('Emergency', 'आपातकाल')}</H2>
          <T s color={palette.white}>{t('Calls our safety team right now', 'हमारी सुरक्षा टीम को अभी कॉल करता है')}</T>
        </View>
      </Lft>
    </Card>
  );
}

const styles = StyleSheet.create({ title: { fontSize: 15 } });
