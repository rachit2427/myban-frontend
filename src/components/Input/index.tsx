import React, { useMemo } from 'react';
import type { TextInputProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';

import {
  getInputStyles,
  getPlaceholderColor,
} from '@src/components/Input/helpers';
import { useTheme } from '@src/hooks/useTheme';

export interface InputProps extends TextInputProps {
  type?: 'regular';
}

export const Input: React.FC<InputProps> = ({
  type = 'regular',
  style: styleProp,
  ...props
}) => {
  const { colors: themeColors } = useTheme();

  const styles = useMemo(
    () => StyleSheet.flatten([getInputStyles(type, themeColors), styleProp]),
    [styleProp, themeColors, type],
  );

  const placeholderColor = useMemo(
    () => getPlaceholderColor(type, themeColors),
    [themeColors, type],
  );

  return (
    <TextInput
      placeholderTextColor={placeholderColor}
      {...props}
      style={styles}
    />
  );
};
