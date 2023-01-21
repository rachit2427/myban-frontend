import React, { forwardRef } from 'react';
import { ScrollView as ScrollViewBase, StyleSheet } from 'react-native';
import type { ScrollViewProps } from 'react-native/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@src/hooks/useTheme';
import { Spacing } from '@src/utils/Spacing';

export const ScrollView = forwardRef<ScrollViewBase, ScrollViewProps>(
  (props, ref) => {
    const insets = useSafeAreaInsets();
    const { colors: themeColors } = useTheme();

    const contentContainerStyle = StyleSheet.flatten([
      {
        flexGrow: 1,
        paddingBottom: Math.max(insets.bottom, Spacing['x-large']),
        paddingHorizontal: Spacing.large,
        backgroundColor: themeColors.backgroundSecondary,
      },
      props.contentContainerStyle,
    ]);

    const style = StyleSheet.flatten([
      { backgroundColor: themeColors.backgroundPrimary },
      props.style,
    ]);

    return (
      <ScrollViewBase
        {...props}
        contentContainerStyle={contentContainerStyle}
        style={style}
        ref={ref}
        keyboardShouldPersistTaps="handled"
      />
    );
  },
);
