import { useCallback } from 'react';

import { Routes } from '@src/navigation/routes';
import { useAppNavigation } from '@src/types/navigation';

export const useGoBack = () => {
  const navigation = useAppNavigation();

  return useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    navigation.navigate(Routes.Home);
  }, [navigation]);
};
