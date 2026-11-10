import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppButton } from '@/components/app-button';
import { colors, radius, spacing } from '@/constants/app-theme';
import { COURSE_FILTERS, type CourseFilter } from '@/constants/courses';

type Props = {
  searchText: string;
  onSearchChange: (text: string) => void;
  courseFilter: CourseFilter;
  onCourseFilterChange: (filter: CourseFilter) => void;
  onClear: () => void;
  shownCount: number;
  totalCount: number;
};

// Search box, course filter chips and a Clear button for the Menu screen.
export function SearchFilterBar({
  searchText,
  onSearchChange,
  courseFilter,
  onCourseFilterChange,
  onClear,
  shownCount,
  totalCount,
}: Props) {
  const isFiltering = searchText.trim() !== '' || courseFilter !== 'All';

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          accessibilityLabel="Search menu items by name"
          placeholder="Search by dish name"
          placeholderTextColor={colors.muted}
          value={searchText}
          onChangeText={onSearchChange}
          style={styles.searchInput}
          returnKeyType="search"
          autoCorrect={false}
        />
        <AppButton
          label="Clear"
          variant="secondary"
          disabled={!isFiltering}
          onPress={onClear}
          accessibilityLabel="Clear search and filter"
        />
      </View>

      <View style={styles.chipRow}>
        {COURSE_FILTERS.map((filter) => {
          const selected = filter === courseFilter;
          return (
            <Pressable
              key={filter}
              accessibilityRole="button"
              accessibilityLabel={`Filter by ${filter}`}
              accessibilityState={{ selected }}
              onPress={() => onCourseFilterChange(filter)}
              style={[styles.chip, selected && styles.chipSelected]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{filter}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.count}>
        Showing {shownCount} of {totalCount} {totalCount === 1 ? 'item' : 'items'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  searchRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.primary,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: colors.white,
  },
  count: {
    marginTop: spacing.md,
    color: colors.muted,
  },
});
