import React, { forwardRef } from 'react';
import { ScrollView as ScrollViewBase, StyleSheet } from 'react-native';
import type { ScrollViewProps } from 'react-native/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@src/utils/Spacing';

export const ScrollView = forwardRef<ScrollViewBase, ScrollViewProps>(
  (props, ref) => {
    const insets = useSafeAreaInsets();

    const contentContainerStyle = StyleSheet.flatten([
      {
        flexGrow: 1,
        paddingBottom: Math.max(insets.bottom, Spacing['x-large']),
      },
      props.contentContainerStyle,
    ]);

    return (
      <ScrollViewBase
        {...props}
        contentContainerStyle={contentContainerStyle}
        ref={ref}
      />
    );
  },
);
