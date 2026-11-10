import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/app-theme';

type Props = {
  title: string;
  subtitle: string;
};

// Title block shown at the top of every screen.
export function ScreenHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.muted,
    textAlign: 'center',
  },
});
