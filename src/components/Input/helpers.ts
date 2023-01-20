import { StyleSheet } from 'react-native';
import type { TextStyle } from 'react-native/types';

import type { InputProps } from '@src/components/Input';
import type { Colors } from '@src/utils/Colors';
import { Spacing } from '@src/utils/Spacing';

export const getInputStyles = (
  type: InputProps['type'],
  colors: Colors,
  isFocused: boolean,
  hasError: boolean,
): TextStyle | undefined => {
  const baseStyles: TextStyle = {
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.small,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    fontSize: 16,
  };

  const errorStyles: TextStyle = { borderColor: colors.red600 };

  const focusedStyles: TextStyle = { borderColor: colors.blue500 };

  switch (type) {
    case 'regular':
      return {
        ...baseStyles,
        backgroundColor: colors.backgroundPrimary,
        borderColor: colors.shade400,
        color: colors.shade800,

        ...(isFocused ? focusedStyles : undefined),
        ...(hasError ? errorStyles : undefined),
      };

    default:
      return;
  }
};

export const getPlaceholderColor = (
  type: InputProps['type'],
  colors: Colors,
): string | undefined => {
  switch (type) {
    case 'regular':
      return colors.shade500;

    default:
      return;
  }
};
