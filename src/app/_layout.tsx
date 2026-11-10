import { DefaultTheme, ThemeProvider } from 'expo-router';
import { View } from 'react-native';

import { MenuTabs } from '@/components/menu-tabs';
import { Toast } from '@/components/toast';
import { MenuProvider } from '@/context/menu-context';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <MenuProvider>
        <View style={{ flex: 1 }}>
          <MenuTabs />
          <Toast />
        </View>
      </MenuProvider>
    </ThemeProvider>
  );
}
