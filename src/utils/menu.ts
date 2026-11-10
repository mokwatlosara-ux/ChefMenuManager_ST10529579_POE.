import { COURSES, type Course, type CourseFilter } from '@/constants/courses';
import type { MenuItem, MenuItemFormValues } from '@/types/menu';

export type MenuStats = {
  totalItems: number;
  averagePrice: number;
  courseCounts: Record<Course, number>;
};

// Returns the items that match the search text (dish name) and the selected course.
export function filterMenuItems(
  items: MenuItem[],
  searchText: string,
  courseFilter: CourseFilter,
): MenuItem[] {
  const query = searchText.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCourse = courseFilter === 'All' || item.course === courseFilter;
    const matchesName = query === '' || item.dishName.toLowerCase().includes(query);
    return matchesCourse && matchesName;
  });
}

// Totals, average price and the number of items in each course.
export function calculateMenuStats(items: MenuItem[]): MenuStats {
  const courseCounts = COURSES.reduce(
    (counts, course) => ({ ...counts, [course]: 0 }),
    {} as Record<Course, number>,
  );

  let totalPrice = 0;
  for (const item of items) {
    courseCounts[item.course] += 1;
    totalPrice += item.price;
  }

  const averagePrice =
    items.length === 0 ? 0 : Math.round((totalPrice / items.length) * 100) / 100;

  return { totalItems: items.length, averagePrice, courseCounts };
}

// Converts a saved item back into the text values the form edits.
export function toFormValues(item: MenuItem): MenuItemFormValues {
  return {
    dishName: item.dishName,
    description: item.description,
    course: item.course,
    price: item.price.toString(),
  };
}

export const EMPTY_FORM_VALUES: MenuItemFormValues = {
  dishName: '',
  description: '',
  course: '',
  price: '',
};
