// The three courses a menu item can belong to.
export const COURSES = ['Starter', 'Main Course', 'Dessert'] as const;

export type Course = (typeof COURSES)[number];

// Options shown in the course filter chips on the Menu screen.
export const COURSE_FILTERS = ['All', ...COURSES] as const;

export type CourseFilter = (typeof COURSE_FILTERS)[number];

export function isCourse(value: string): value is Course {
  return (COURSES as readonly string[]).includes(value);
}
