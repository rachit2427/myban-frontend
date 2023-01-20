import type { TextStyle, ViewStyle } from 'react-native/types';

import type { ButtonProps } from '@src/components/Button';
import type { Colors } from '@src/utils/Colors';
import { Spacing } from '@src/utils/Spacing';

export const getButtonStyles = (
  type: ButtonProps['type'],
  colors: Colors,
): [ViewStyle | undefined, TextStyle | undefined, string] => {
  const defaultContainerStyles: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.small,
    borderRadius: 8,
  };

  const defaultTextStyles: TextStyle = {
    color: colors.white,
  };

  switch (type) {
    case 'success':
      return [
        { ...defaultContainerStyles, backgroundColor: colors.green500 },
        { ...defaultTextStyles },
        colors.white,
      ];

    default:
      return [defaultContainerStyles, defaultTextStyles, colors.white];
  }
};
