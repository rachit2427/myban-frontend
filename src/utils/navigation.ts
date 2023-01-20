import { Routes } from '@src/navigation/routes';
import type { NavigationProps } from '@src/types/navigation';

export const safeGoBack = (navigation: NavigationProps) => {
  if (navigation.canGoBack()) {
    navigation.goBack();
    return;
  }

  navigation.navigate(Routes.Home);
};
