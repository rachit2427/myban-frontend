import type { ReactElement } from 'react';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { TextInput } from 'react-native';
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
  accessoryRight?: ReactElement;
  mb?: number;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      mb,
      type = 'regular',
      errorMessage,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      accessoryRight,
      ...props
    },
    ref,
  ) => {
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

    const [containerStyles, inputStyles] = useMemo(
      () =>
        getInputStyles({
          type,
          colors: themeColors,
          disabled: !props.editable,
          isFocused,
          hasError,
        }),
      [hasError, isFocused, props.editable, themeColors, type],
    );

    const placeholderColor = useMemo(
      () => getPlaceholderColor(type, themeColors),
      [themeColors, type],
    );

    return (
      <Stack spacing={Spacing['x-small']} mb={mb}>
        <Box
          radius={4}
          direction="row"
          style={containerStyles}
          overflow="hidden"
        >
          <TextInput
            placeholderTextColor={placeholderColor}
            {...props}
            style={inputStyles}
            onFocus={onFocus}
            onBlur={onBlur}
            autoCorrect={false}
            ref={ref}
          />

          {accessoryRight ? (
            <Box justify="center" align="center">
              {accessoryRight}
            </Box>
          ) : null}
        </Box>

        {hasError ? (
          <Box mb={Spacing.small}>
            <Text type="light" color="red600" size={14}>
              {errorMessage}
            </Text>
          </Box>
        ) : null}
      </Stack>
    );
  },
);
