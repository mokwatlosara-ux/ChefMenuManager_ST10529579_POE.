import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MenuItemForm } from '@/components/menu-item-form';
import { ScreenHeader } from '@/components/screen-header';
import { colors, radius, spacing } from '@/constants/app-theme';
import { useMenu } from '@/context/menu-context';

// Add Item screen: create a new menu item.
export default function AddItemScreen() {
  const { items, addItem } = useMenu();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <ScreenHeader title="Chef's Menu Manager" subtitle="Add a dish to your menu" />

          <View style={styles.card}>
            <Text accessibilityRole="header" style={styles.heading}>
              Add New Menu Item
            </Text>
            <MenuItemForm
              submitLabel="Save Menu Item"
              existingItems={items}
              onSubmit={addItem}
              resetOnSubmit
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  card: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: radius.md,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
});
