import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/app-button';
import { colors, radius, spacing } from '@/constants/app-theme';
import type { MenuItem } from '@/types/menu';
import { formatPrice } from '@/utils/format';

type Props = {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
};

// One menu item in the list, with Edit and Delete buttons.
export function MenuItemCard({ item, onEdit, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.course}</Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.actions}>
        <AppButton
          label="Edit"
          variant="secondary"
          accessibilityLabel={`Edit ${item.dishName}`}
          onPress={() => onEdit(item)}
          style={styles.action}
        />
        <AppButton
          label="Delete"
          variant="danger"
          accessibilityLabel={`Delete ${item.dishName}`}
          onPress={() => onDelete(item)}
          style={styles.action}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  dishName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
  },
  badgeText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  description: {
    marginTop: spacing.sm,
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  action: {
    flex: 1,
  },
});
