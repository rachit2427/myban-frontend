import type { TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import type { InputProps } from '@src/components/Input';
import type { Colors } from '@src/utils/Colors';
import { Spacing } from '@src/utils/Spacing';

export const getInputStyles = (
  type: InputProps['type'],
  colors: Colors,
): TextStyle | undefined => {
  const baseStyles: TextStyle = {
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.small,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    fontSize: 16,
  };

  switch (type) {
    case 'regular':
      return {
        ...baseStyles,
        backgroundColor: colors.backgroundPrimary,
        borderColor: colors.shade400,
        color: colors.shade800,
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
