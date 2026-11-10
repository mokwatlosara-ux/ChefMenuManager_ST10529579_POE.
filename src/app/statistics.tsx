import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { StatCard } from '@/components/stat-card';
import { colors, radius, spacing } from '@/constants/app-theme';
import { COURSES } from '@/constants/courses';
import { useMenu } from '@/context/menu-context';
import { formatPrice } from '@/utils/format';
import { calculateMenuStats } from '@/utils/menu';

// Statistics screen: an overview of the whole menu.
export default function StatisticsScreen() {
  const { items } = useMenu();
  const stats = calculateMenuStats(items);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Menu Statistics" subtitle="An overview of your menu" />

        <View style={styles.row}>
          <StatCard label="Total menu items" value={String(stats.totalItems)} />
          <StatCard label="Average price" value={formatPrice(stats.averagePrice)} />
        </View>

        <View style={styles.card}>
          <Text accessibilityRole="header" style={styles.heading}>
            Items per course
          </Text>

          {COURSES.map((course) => {
            const count = stats.courseCounts[course];
            const share = stats.totalItems === 0 ? 0 : (count / stats.totalItems) * 100;

            return (
              <View
                key={course}
                style={styles.courseRow}
                accessible
                accessibilityLabel={`${course}: ${count} ${count === 1 ? 'item' : 'items'}`}>
                <View style={styles.courseHeader}>
                  <Text style={styles.courseName}>{course}</Text>
                  <Text style={styles.courseCount}>{count}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${share}%` }]} />
                </View>
              </View>
            );
          })}
        </View>

        {stats.totalItems === 0 ? (
          <Text style={styles.hint}>Add menu items to see your statistics grow.</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  card: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: radius.md,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  courseRow: {
    marginTop: spacing.md,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  courseCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  barTrack: {
    height: 10,
    marginTop: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  hint: {
    marginTop: spacing.lg,
    textAlign: 'center',
    color: colors.muted,
  },
});
