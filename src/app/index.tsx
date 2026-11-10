import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/app-button';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { EditItemModal } from '@/components/edit-item-modal';
import { MenuItemCard } from '@/components/menu-item-card';
import { ScreenHeader } from '@/components/screen-header';
import { SearchFilterBar } from '@/components/search-filter-bar';
import { colors, radius, spacing } from '@/constants/app-theme';
import type { CourseFilter } from '@/constants/courses';
import { useMenu } from '@/context/menu-context';
import type { MenuItem, MenuItemDraft } from '@/types/menu';
import { filterMenuItems } from '@/utils/menu';

// Menu screen: view, search, filter, edit and delete menu items.
export default function MenuScreen() {
  const { items, updateItem, deleteItem } = useMenu();

  const [searchText, setSearchText] = useState('');
  const [courseFilter, setCourseFilter] = useState<CourseFilter>('All');
  const [itemBeingEdited, setItemBeingEdited] = useState<MenuItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  const visibleItems = filterMenuItems(items, searchText, courseFilter);

  const clearSearchAndFilter = () => {
    setSearchText('');
    setCourseFilter('All');
  };

  const saveEditedItem = (id: string, draft: MenuItemDraft) => {
    updateItem(id, draft);
    setItemBeingEdited(null);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete.id);
    }
    setItemToDelete(null);
  };

  const emptyMessage =
    items.length === 0 ? (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No menu items have been added yet.</Text>
        <Text style={styles.emptyHint}>Open the Add Item tab to create your first dish.</Text>
      </View>
    ) : (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No menu items match your search or filter.</Text>
        <AppButton
          label="Clear search and filter"
          variant="secondary"
          onPress={clearSearchAndFilter}
          style={styles.emptyButton}
        />
      </View>
    );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.top}>
        <ScreenHeader title="Chef's Menu Manager" subtitle="Manage your restaurant menu" />
        <SearchFilterBar
          searchText={searchText}
          onSearchChange={setSearchText}
          courseFilter={courseFilter}
          onCourseFilterChange={setCourseFilter}
          onClear={clearSearchAndFilter}
          shownCount={visibleItems.length}
          totalCount={items.length}
        />
      </View>

      <FlatList
        data={visibleItems}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        ListEmptyComponent={emptyMessage}
        renderItem={({ item }) => (
          <MenuItemCard item={item} onEdit={setItemBeingEdited} onDelete={setItemToDelete} />
        )}
      />

      <EditItemModal
        item={itemBeingEdited}
        existingItems={items}
        onSave={saveEditedItem}
        onClose={() => setItemBeingEdited(null)}
      />

      <ConfirmDialog
        visible={itemToDelete !== null}
        title="Delete menu item?"
        message={
          itemToDelete
            ? `"${itemToDelete.dishName}" will be removed from the menu. This cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  top: {
    paddingHorizontal: spacing.xl,
  },
  list: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 40,
    flexGrow: 1,
  },
  empty: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.muted,
  },
  emptyHint: {
    marginTop: spacing.xs,
    textAlign: 'center',
    color: colors.muted,
  },
  emptyButton: {
    marginTop: spacing.md,
  },
});
