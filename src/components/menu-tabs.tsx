import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { colors } from '@/constants/app-theme';
import { useMenu } from '@/context/menu-context';

// Bottom tab bar: Menu, Add Item and Statistics. The Menu tab shows how many items there are.
export function MenuTabs() {
  const { items } = useMenu();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu',
          tabBarBadge: items.length > 0 ? items.length : undefined,
          tabBarIcon: ({ color }) => (
            <SymbolView
              tintColor={color}
              size={24}
              name={{ ios: 'fork.knife', android: 'restaurant', web: 'restaurant' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add Item',
          tabBarIcon: ({ color }) => (
            <SymbolView
              tintColor={color}
              size={24}
              name={{ ios: 'plus.circle', android: 'add_circle', web: 'add_circle' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ color }) => (
            <SymbolView
              tintColor={color}
              size={24}
              name={{ ios: 'chart.bar', android: 'bar_chart', web: 'bar_chart' }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
