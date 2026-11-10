import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MenuItemForm } from '@/components/menu-item-form';
import { colors, radius, spacing } from '@/constants/app-theme';
import type { MenuItem, MenuItemDraft } from '@/types/menu';
import { toFormValues } from '@/utils/menu';

type Props = {
  // The item being edited, or null when the editor is closed.
  item: MenuItem | null;
  existingItems: MenuItem[];
  onSave: (id: string, draft: MenuItemDraft) => void;
  onClose: () => void;
};

// Full-screen editor that opens when the chef taps Edit on a menu item.
export function EditItemModal({ item, existingItems, onSave, onClose }: Props) {
  return (
    <Modal visible={item !== null} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.screen}>
        <KeyboardAvoidingView
          style={styles.screen}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            {item ? (
              <View style={styles.card}>
                <Text accessibilityRole="header" style={styles.heading}>
                  Edit Menu Item
                </Text>
                <MenuItemForm
                  key={item.id}
                  initialValues={toFormValues(item)}
                  editingId={item.id}
                  existingItems={existingItems}
                  submitLabel="Save Changes"
                  onSubmit={(draft) => onSave(item.id, draft)}
                  onCancel={onClose}
                />
              </View>
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
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
