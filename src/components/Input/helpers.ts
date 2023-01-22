import { StyleSheet } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native/types';

import type { InputProps } from '@src/components/Input';
import type { Colors } from '@src/utils/Colors';
import { Spacing } from '@src/utils/Spacing';

interface Options {
  type: InputProps['type'];
  colors: Colors;
  isFocused: boolean;
  hasError: boolean;
  disabled: boolean;
}

export const getInputStyles = ({
  type,
  colors,
  disabled,
  hasError,
  isFocused,
}: Options): [ViewStyle | undefined, TextStyle | undefined] => {
  const baseContainerStyles: TextStyle = {
    borderWidth: StyleSheet.hairlineWidth,
    height: 42,
    flex: 1,
    padding: 0,
  };

  const baseInputStyles: TextStyle = {
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.small,
    borderWidth: 0,
    backgroundColor: 'transparent',
    fontSize: 16,
    height: '100%',
    width: '100%',
    flex: 1,
  };

  const disabledContainerStyles: ViewStyle = {
    backgroundColor: colors.backgroundSecondary,
  };

  const errorContainerStyles: ViewStyle = { borderColor: colors.red500 };

  const focusedContainerStyles: ViewStyle = { borderColor: colors.blue500 };

  switch (type) {
    case 'regular':
      return [
        {
          ...baseContainerStyles,
          backgroundColor: colors.backgroundPrimary,
          borderColor: colors.shade200,

          ...(isFocused ? focusedContainerStyles : undefined),
          ...(hasError ? errorContainerStyles : undefined),
          ...(disabled ? disabledContainerStyles : undefined),
        },
        {
          ...baseInputStyles,
          color: colors.shade800,
        },
      ];

    default:
      return [undefined, undefined];
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
