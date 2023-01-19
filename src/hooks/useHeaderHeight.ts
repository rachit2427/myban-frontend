import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@src/utils/Spacing';

const DEFAULT_HEADER_CONTAINER_HEIGHT = 30;

export const useHeaderHeight = (
  includeInsetTop = false,
): {
  headerHeight: number;
  headerPaddingTop: number;
  headerPaddingBottom: number;
} => {
  const insets = useSafeAreaInsets();

  const insetTop = includeInsetTop ? insets.top : 0;

  const paddingTop = insetTop + Spacing.medium;
  const paddingBottom = Spacing.medium;

  const headerHeight =
    DEFAULT_HEADER_CONTAINER_HEIGHT + paddingTop + paddingBottom;

  return useMemo(
    () => ({
      headerHeight,
      headerPaddingTop: paddingTop,
      headerPaddingBottom: paddingBottom,
    }),
    [headerHeight, paddingBottom, paddingTop],
  );
};
