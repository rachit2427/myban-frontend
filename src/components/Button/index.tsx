import type { PropsWithChildren } from 'react';
import React, { memo, useMemo } from 'react';
import type { ActivityIndicatorProps } from 'react-native';
import { ActivityIndicator, Pressable } from 'react-native';

import { getButtonStyles } from '@src/components/Button/helpers';
import { Text } from '@src/components/Text';
import { useTheme } from '@src/hooks/useTheme';

export interface ButtonProps {
  type?: 'success';
  onPress?: () => void;
  loading?: boolean;
  loaderSize?: ActivityIndicatorProps['size'];
}

const ButtonComponent: React.FC<PropsWithChildren<ButtonProps>> = ({
  type = 'success',
  children,
  loading,
  loaderSize = 'small',
  ...props
}) => {
  const { colors: themeColors } = useTheme();

  const [buttonContainerStyles, buttonTextStyles, activityIndicatorColor] =
    useMemo(() => getButtonStyles(type, themeColors), [themeColors, type]);

  return (
    <Pressable {...props} style={buttonContainerStyles}>
      {loading ? (
        <ActivityIndicator
          animating={loading}
          color={activityIndicatorColor}
          size={loaderSize}
        />
      ) : typeof children === 'string' ? (
        <Text style={buttonTextStyles}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

export const Button = memo(ButtonComponent);
