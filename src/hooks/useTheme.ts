import { useMemo } from 'react';

import { useIsDarkMode } from '@src/hooks/useIsDarkMode';
import type { Colors } from '@src/utils/Colors';
import { DarkColors, LightColors } from '@src/utils/Colors';

interface useThemeReturnValue {
  colors: Colors;
}

export const useTheme = (): useThemeReturnValue => {
  const isDarkMode = useIsDarkMode();

  return useMemo(
    () => ({
      colors: isDarkMode ? DarkColors : LightColors,
    }),
    [isDarkMode],
  );
};
