import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/app-button';
import { CourseSelector } from '@/components/course-selector';
import { FormField } from '@/components/form-field';
import { spacing } from '@/constants/app-theme';
import type {
  MenuItem,
  MenuItemDraft,
  MenuItemFormErrors,
  MenuItemFormValues,
} from '@/types/menu';
import { EMPTY_FORM_VALUES } from '@/utils/menu';
import { validateMenuItem } from '@/utils/validation';

type Props = {
  submitLabel: string;
  existingItems: MenuItem[];
  onSubmit: (draft: MenuItemDraft) => void;
  initialValues?: MenuItemFormValues;
  // Set when editing so the item is not treated as a duplicate of itself.
  editingId?: string;
  // Clear the form after a successful save (used when adding).
  resetOnSubmit?: boolean;
  onCancel?: () => void;
};

// The form used for both adding a new menu item and editing an existing one.
export function MenuItemForm({
  submitLabel,
  existingItems,
  onSubmit,
  initialValues = EMPTY_FORM_VALUES,
  editingId,
  resetOnSubmit = false,
  onCancel,
}: Props) {
  const [values, setValues] = useState<MenuItemFormValues>(initialValues);
  const [errors, setErrors] = useState<MenuItemFormErrors>({});

  // Update one field and clear that field's error as soon as the chef starts fixing it.
  const updateField = <K extends keyof MenuItemFormValues>(
    field: K,
    value: MenuItemFormValues[K],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = () => {
    const result = validateMenuItem(values, existingItems, editingId);
    setErrors(result.errors);

    if (!result.draft) {
      return;
    }

    onSubmit(result.draft);

    if (resetOnSubmit) {
      setValues(EMPTY_FORM_VALUES);
      setErrors({});
    }
  };

  return (
    <View>
      <FormField
        label="Dish Name"
        placeholder="Enter dish name"
        value={values.dishName}
        onChangeText={(text) => updateField('dishName', text)}
        error={errors.dishName}
        returnKeyType="next"
      />

      <FormField
        label="Description"
        placeholder="Enter dish description"
        value={values.description}
        onChangeText={(text) => updateField('description', text)}
        error={errors.description}
        multiline
        style={styles.description}
      />

      <CourseSelector
        value={values.course}
        onChange={(course) => updateField('course', course)}
        error={errors.course}
      />

      <FormField
        label="Price (R)"
        placeholder="Enter price, e.g. 45.50"
        value={values.price}
        onChangeText={(text) => updateField('price', text)}
        error={errors.price}
        keyboardType="decimal-pad"
      />

      <View style={styles.actions}>
        {onCancel ? (
          <AppButton label="Cancel" variant="secondary" onPress={onCancel} style={styles.action} />
        ) : null}
        <AppButton label={submitLabel} onPress={handleSubmit} style={styles.action} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    height: 100,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  action: {
    flex: 1,
  },
});
