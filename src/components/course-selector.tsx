import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fieldStyles } from '@/components/form-field';
import { colors, radius, spacing } from '@/constants/app-theme';
import { COURSES, type Course } from '@/constants/courses';

type Props = {
  value: Course | '';
  onChange: (course: Course) => void;
  error?: string;
};

// Dropdown for choosing Starter, Main Course or Dessert.
export function CourseSelector({ value, onChange, error }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Text style={fieldStyles.label}>Course</Text>

      <View style={[styles.picker, error ? styles.pickerError : null]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Course, ${value || 'none selected'}`}
          style={styles.button}
          onPress={() => setIsOpen((open) => !open)}>
          <Text style={value ? styles.text : styles.placeholder}>{value || 'Select a course'}</Text>
          <Text style={styles.arrow}>{isOpen ? '^' : 'v'}</Text>
        </Pressable>

        {isOpen && (
          <View style={styles.options}>
            {COURSES.map((course) => (
              <Pressable
                key={course}
                accessibilityRole="button"
                accessibilityState={{ selected: course === value }}
                style={[styles.option, course === value && styles.optionSelected]}
                onPress={() => {
                  onChange(course);
                  setIsOpen(false);
                }}>
                <Text style={styles.text}>{course}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {error ? (
        <Text accessibilityLiveRegion="polite" style={fieldStyles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  pickerError: {
    borderColor: colors.error,
  },
  button: {
    minHeight: 50,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
  placeholder: {
    color: colors.muted,
    fontSize: 16,
  },
  arrow: {
    color: colors.muted,
    fontSize: 16,
  },
  options: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  option: {
    padding: spacing.md,
  },
  optionSelected: {
    backgroundColor: colors.primaryLight,
  },
});
