import { Pressable, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing } from '@/constants/app-theme';
import { useMenu } from '@/context/menu-context';

// Short success / error message that appears at the top of any screen. Tap to dismiss.
export function Toast() {
  const { notice, dismissNotice } = useMenu();
  const insets = useSafeAreaInsets();

  if (!notice) {
    return null;
  }

  return (
    <Pressable
      accessibilityRole="alert"
      accessibilityLabel={notice.message}
      onPress={dismissNotice}
      style={[
        styles.toast,
        { top: insets.top + spacing.sm },
        notice.type === 'success' ? styles.success : styles.error,
      ]}>
      <Text style={styles.text}>{notice.message}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.sm,
    zIndex: 10,
    elevation: 6,
  },
  success: {
    backgroundColor: colors.success,
  },
  error: {
    backgroundColor: colors.error,
  },
  text: {
    color: colors.white,
    fontWeight: '600',
    textAlign: 'center',
  },
});
