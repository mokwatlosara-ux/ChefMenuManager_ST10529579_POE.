import { isCourse } from '@/constants/courses';
import type {
  MenuItem,
  MenuItemDraft,
  MenuItemFormErrors,
  MenuItemFormValues,
} from '@/types/menu';

export const LIMITS = {
  nameMin: 2,
  nameMax: 60,
  descriptionMax: 200,
  priceMax: 10000,
} as const;

// Turns text such as "45,50" or "R45.50" into a number. Returns NaN if it is not a valid price.
export function parsePrice(text: string): number {
  const cleaned = text.trim().replace(/^R\s*/i, '').replace(',', '.');
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) {
    return Number.NaN;
  }
  return Number(cleaned);
}

type ValidationResult = {
  errors: MenuItemFormErrors;
  // The cleaned-up item, or null when there are errors.
  draft: MenuItemDraft | null;
};

// Validates the add/edit form. When editing, pass the item's id so it is not
// flagged as a duplicate of itself.
export function validateMenuItem(
  values: MenuItemFormValues,
  existingItems: MenuItem[],
  editingId?: string,
): ValidationResult {
  const errors: MenuItemFormErrors = {};
  const dishName = values.dishName.trim();
  const description = values.description.trim();
  const course = values.course;
  const price = parsePrice(values.price);

  if (!dishName) {
    errors.dishName = 'Please enter a dish name.';
  } else if (dishName.length < LIMITS.nameMin) {
    errors.dishName = `Dish name must be at least ${LIMITS.nameMin} characters.`;
  } else if (dishName.length > LIMITS.nameMax) {
    errors.dishName = `Dish name must be ${LIMITS.nameMax} characters or fewer.`;
  } else if (
    isCourse(course) &&
    existingItems.some(
      (item) =>
        item.id !== editingId &&
        item.course === course &&
        item.dishName.toLowerCase() === dishName.toLowerCase(),
    )
  ) {
    errors.dishName = `"${dishName}" is already on the menu under ${course}.`;
  }

  if (!description) {
    errors.description = 'Please enter a description.';
  } else if (description.length > LIMITS.descriptionMax) {
    errors.description = `Description must be ${LIMITS.descriptionMax} characters or fewer.`;
  }

  if (!isCourse(course)) {
    errors.course = 'Please select a course.';
  }

  if (!values.price.trim()) {
    errors.price = 'Please enter a price.';
  } else if (Number.isNaN(price)) {
    errors.price = 'Enter a valid price, for example 45 or 45.50.';
  } else if (price <= 0) {
    errors.price = 'Price must be greater than R0.';
  } else if (price > LIMITS.priceMax) {
    errors.price = `Price cannot be more than R${LIMITS.priceMax}.`;
  }

  if (Object.keys(errors).length > 0 || !isCourse(course)) {
    return { errors, draft: null };
  }

  return { errors, draft: { dishName, description, course, price } };
}
