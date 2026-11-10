import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/app-theme';

type Props = {
  label: string;
  value: string;
};

// A big number with a label underneath, used on the Statistics screen.
export function StatCard({ label, value }: Props) {
  return (
    <View style={styles.card} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  value: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.primary,
  },
  label: {
    marginTop: spacing.xs,
    color: colors.muted,
    textAlign: 'center',
  },
});
