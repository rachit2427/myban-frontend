import React, { forwardRef, useMemo } from 'react';
import { StyleSheet, Text as TextBase } from 'react-native';
import type { TextProps as TextBaseProps } from 'react-native/types';

import { useTheme } from '@src/hooks/useTheme';
import type { Colors } from '@src/utils/Colors';

interface TextProps extends TextBaseProps {
  type?: 'light' | 'regular' | 'medium';
  color?: keyof Colors;
  size?: number;
}

export const Text = forwardRef<TextBase, TextProps>(
  (
    {
      type = 'regular',
      color: colorProp = 'grey900',
      style: styleProp,
      size = 16,
      ...props
    },
    ref,
  ) => {
    const { colors: themeColors } = useTheme();
    const fontFamily = useMemo(() => getFontFamily(type), [type]);
    const color = useMemo(
      () => themeColors[colorProp],
      [colorProp, themeColors],
    );

    const style = StyleSheet.flatten([
      styleProp,
      {
        fontFamily,
        color,
        fontSize: size,
      },
    ]);

    return <TextBase ref={ref} {...props} style={style} />;
  },
);

const getFontFamily = (type: TextProps['type']): string => {
  switch (type) {
    case 'light':
      return 'Roboto-Light';

    case 'medium':
      return 'Roboto-Medium';

    case 'regular':
      return 'Roboto-Regular';

    default:
      return 'Roboto-Regular';
  }
};
