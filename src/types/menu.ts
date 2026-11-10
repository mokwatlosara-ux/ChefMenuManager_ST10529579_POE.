import type { Course } from '@/constants/courses';

// A saved menu item.
export type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: Course;
  price: number;
};

// A menu item that has passed validation but has no id yet.
export type MenuItemDraft = Omit<MenuItem, 'id'>;

// Raw text typed into the form (everything is a string until validated).
export type MenuItemFormValues = {
  dishName: string;
  description: string;
  course: Course | '';
  price: string;
};

export type MenuItemFormErrors = Partial<Record<keyof MenuItemFormValues, string>>;
