import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import type {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native/types';

import {
  getInputStyles,
  getPlaceholderColor,
} from '@src/components/Input/helpers';
import { Box } from '@src/components/Layout/Box';
import { Stack } from '@src/components/Layout/Stack';
import { Text } from '@src/components/Text';
import { useTheme } from '@src/hooks/useTheme';
import { Spacing } from '@src/utils/Spacing';

export interface InputProps extends TextInputProps {
  type?: 'regular';
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'regular',
  errorMessage,
  style: styleProp,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  ...props
}) => {
  const { colors: themeColors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocusProp?.(e);
    },
    [onFocusProp],
  );

  const onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlurProp?.(e);
    },
    [onBlurProp],
  );

  const hasError = Boolean(errorMessage && errorMessage.length !== 0);

  const styles = useMemo(
    () =>
      StyleSheet.flatten([
        getInputStyles(type, themeColors, isFocused, hasError),
        styleProp,
      ]),
    [hasError, isFocused, styleProp, themeColors, type],
  );

  const placeholderColor = useMemo(
    () => getPlaceholderColor(type, themeColors),
    [themeColors, type],
  );

  return (
    <Stack spacing={Spacing['x-small']}>
      <TextInput
        placeholderTextColor={placeholderColor}
        {...props}
        style={styles}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {hasError ? (
        <Box mb={Spacing.small}>
          <Text type="light" color="red600" size={14}>
            {errorMessage}
          </Text>
        </Box>
      ) : null}
    </Stack>
  );
};
