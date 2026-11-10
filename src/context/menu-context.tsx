import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

import type { MenuItem, MenuItemDraft } from '@/types/menu';
import { createId } from '@/utils/format';

export type NoticeType = 'success' | 'error';

export type Notice = {
  id: number;
  type: NoticeType;
  message: string;
};

type MenuContextValue = {
  items: MenuItem[];
  addItem: (draft: MenuItemDraft) => void;
  updateItem: (id: string, draft: MenuItemDraft) => void;
  deleteItem: (id: string) => void;
  notice: Notice | null;
  showNotice: (type: NoticeType, message: string) => void;
  dismissNotice: () => void;
};

const NOTICE_DURATION_MS = 3000;

const MenuContext = createContext<MenuContextValue | null>(null);

// Holds the menu list in one place so every screen (Menu, Add Item, Statistics)
// always shows the same, up-to-date data.
export function MenuProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [notice, setNotice] = useState<Notice | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noticeCount = useRef(0);

  useEffect(() => {
    return () => {
      if (noticeTimer.current) {
        clearTimeout(noticeTimer.current);
      }
    };
  }, []);

  const dismissNotice = () => {
    if (noticeTimer.current) {
      clearTimeout(noticeTimer.current);
      noticeTimer.current = null;
    }
    setNotice(null);
  };

  const showNotice = (type: NoticeType, message: string) => {
    if (noticeTimer.current) {
      clearTimeout(noticeTimer.current);
    }
    noticeCount.current += 1;
    setNotice({ id: noticeCount.current, type, message });
    noticeTimer.current = setTimeout(() => {
      setNotice(null);
      noticeTimer.current = null;
    }, NOTICE_DURATION_MS);
  };

  const addItem = (draft: MenuItemDraft) => {
    setItems((current) => [...current, { id: createId(), ...draft }]);
    showNotice('success', `"${draft.dishName}" was added to the menu.`);
  };

  const updateItem = (id: string, draft: MenuItemDraft) => {
    setItems((current) => current.map((item) => (item.id === id ? { id, ...draft } : item)));
    showNotice('success', `"${draft.dishName}" was updated.`);
  };

  const deleteItem = (id: string) => {
    const target = items.find((item) => item.id === id);
    setItems((current) => current.filter((item) => item.id !== id));
    showNotice('success', target ? `"${target.dishName}" was deleted.` : 'Menu item deleted.');
  };

  return (
    <MenuContext.Provider
      value={{ items, addItem, updateItem, deleteItem, notice, showNotice, dismissNotice }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu(): MenuContextValue {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used inside a MenuProvider');
  }
  return context;
}
