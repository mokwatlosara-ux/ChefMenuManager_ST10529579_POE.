# Chef's Menu Manager

## Project Description

Chef's Menu Manager is a React Native (Expo) mobile application that helps restaurant chefs manage their menu from a mobile device. Chefs can add, edit and delete dishes, search and filter the menu, and see an overview of the menu in a statistics screen.

**GitHub repository:** https://github.com/mokwatlosara-ux/ChefMenuManager_ST10529579_POE.
**Demo video (YouTube, unlisted):** https://youtu.be/vDSNpfNemJU?si=vZC99nssEqe_-HaB

## Features

### Part 2 (original features)

* Add a new menu item (dish name, description, course, price)
* Select a course: Starter, Main Course or Dessert
* Validation with error messages for missing or invalid information
* Success message after adding a menu item
* Display all menu items, with a message when the menu is empty

### Part 3 (new features)

* **Manage menu items** – edit and update any menu item, and delete items with a confirmation pop-up. Changes show immediately everywhere in the app.
* **Search and filter** – search by dish name, filter by course (All / Starter / Main Course / Dessert), combine both, and clear them with one button.
* **Menu statistics** – total number of items, average price, and number of items in each course (with a simple bar for each course).
* **Improved user experience** – three-tab navigation (Menu, Add Item, Statistics), success/error messages on every screen, consistent look and feel.

## Technologies Used

* React Native
* Expo (Expo Router, `expo-symbols`)
* TypeScript
* Visual Studio Code
* Git and GitHub

## How to Run

1. Install dependencies: `npm install`
2. Start the app: `npx expo start`
3. Scan the QR code with Expo Go (or press `a` for Android / `i` for iOS simulator).

## Project Structure

```
src/
  app/                    Screens (Expo Router)
    _layout.tsx           Provides the menu data + tab bar + message banner
    index.tsx             Menu tab: list, search, filter, edit, delete
    add.tsx               Add Item tab
    statistics.tsx        Statistics tab
  components/             Reusable UI components
    app-button.tsx        One button used everywhere (primary / secondary / danger)
    form-field.tsx        Labelled text input with its own error message
    course-selector.tsx   Course dropdown
    menu-item-form.tsx    Form used for BOTH adding and editing
    menu-item-card.tsx    One menu item with Edit / Delete buttons
    search-filter-bar.tsx Search box, course chips and Clear button
    edit-item-modal.tsx   Edit screen shown over the menu list
    confirm-dialog.tsx    "Are you sure?" pop-up before deleting
    stat-card.tsx         Number + label card for statistics
    screen-header.tsx     Title block used on every screen
    toast.tsx             Success / error message banner
    menu-tabs.tsx         Bottom tab navigation
  context/menu-context.tsx  Shared menu list + add / update / delete + messages
  constants/              Courses list and theme (colours, spacing)
  types/menu.ts           TypeScript types
  utils/                  Validation, filtering, statistics and formatting functions
```

## Change Log

### Changes implemented since Part 2

**1. Manage menu items**
* Added an **Edit** button on every menu item. It opens an edit screen pre-filled with the item's current details.
* Added **update** support: changes are validated and saved, and the list, search results, statistics and tab badge update immediately.
* Added a **Delete** button with a confirmation pop-up so items are not removed by accident.

**2. Search and filter**
* Added a search box that finds menu items by dish name (not case sensitive, ignores extra spaces).
* Added course filter buttons: All, Starter, Main Course and Dessert.
* Search and filter work together, and a **Clear** button resets both.
* Added a "Showing X of Y items" counter and a helpful message when nothing matches.

**3. Menu statistics**
* Added a **Statistics** screen showing the total number of items, the average price, and the number of items in each course.
* Statistics are calculated from the live menu data, so they are always correct after adding, editing or deleting.

**4. Navigation and user experience**
* Replaced the single scrolling screen and the template "Explore" tab with three clear tabs: **Menu**, **Add Item** and **Statistics**. The Menu tab shows a badge with the number of items.
* Replaced the pop-up alert after adding with a **message banner** at the top of the screen that shows for every success (added, updated, deleted).
* Error messages now clear as soon as the chef starts fixing the field, and invalid fields get a red border.
* The keyboard no longer covers the form, and buttons have accessibility labels.
* The app now uses a light theme consistently (`userInterfaceStyle` set to `light` in `app.json`).

### Changes made during refactoring

* **Split one 400-line file into reusable components.** All screen code was previously in `index.tsx`. It is now broken into small components (`AppButton`, `FormField`, `CourseSelector`, `MenuItemForm`, `MenuItemCard`, `SearchFilterBar`, `ConfirmDialog`, `EditItemModal`, `StatCard`, `ScreenHeader`, `Toast`).
* **One form for adding and editing.** `MenuItemForm` is reused for both, so the validation and layout cannot get out of sync.
* **Moved logic out of the screens into functions** in `src/utils`: `validateMenuItem`, `parsePrice`, `filterMenuItems`, `calculateMenuStats`, `formatPrice`, `toFormValues`.
* **Shared state with React Context.** `MenuProvider` holds the menu list so all three screens use the same data instead of each keeping its own.
* **Centralised constants and theme.** Courses live in one list (`COURSES`) and colours/spacing in `app-theme.ts`, replacing repeated values and hard-coded course names.
* **Stronger TypeScript types.** Course is now a union type (`"Starter" | "Main Course" | "Dessert"`) instead of a plain `string`. Added types for drafts, form values and form errors.
* **Meaningful names.** For example `addMenuItem` → `onSubmit`/`addItem`, `courseMenuOpen` → `isOpen`, `newErrors` → `errors`, and `Index` → `MenuScreen`.
* **Improved validation.** Dish names must be 2–60 characters, descriptions at most 200, prices must have at most two decimals and be between R0 and R10 000 (a comma such as `45,50` is accepted), and duplicate dish names in the same course are rejected.
* **Removed the unused template "Explore" screen** and its tab.
* **Safer unique ids.** New items get their id from a `createId` function instead of only `Date.now()`.

## Menu Item Information

Each menu item contains:

* Dish Name
* Description
* Course (Starter, Main Course or Dessert)
* Price (in rand)

## Notes

* Menu items are stored in memory while the app is open. Closing the app clears the menu.
