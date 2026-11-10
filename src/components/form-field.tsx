import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors, radius, spacing } from '@/constants/app-theme';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

// A labelled text box that shows its own validation message underneath.
export function FormField({ label, error, style, ...inputProps }: Props) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.muted}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...inputProps}
      />
      {error ? (
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export const fieldStyles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: spacing.md,
    marginBottom: 6,
    color: colors.text,
  },
  error: {
    color: colors.error,
    marginTop: 5,
  },
});

const styles = StyleSheet.create({
  label: fieldStyles.label,
  error: fieldStyles.error,
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.error,
  },
});
