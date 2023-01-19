import React, { memo, useMemo } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import type {
  KeyboardAvoidingViewProps,
  PlatformOSType,
} from 'react-native/types';
import { useSelector } from 'react-redux';

import { useHeaderHeight } from '@src/hooks/useHeaderHeight';
import { selectIsKeyboardShown } from '@src/state/slices/keyboard';

interface KeyboardAwareViewProps extends KeyboardAvoidingViewProps {
  flex?: number;
  offset?: Partial<Record<PlatformOSType, number>>;
  includeHeader?: boolean;
}

const KeyboardAwareViewComponent: React.FC<KeyboardAwareViewProps> = ({
  flex = 1,
  includeHeader = true,
  offset: offsetProp,
  style: styleProp,
  ...props
}) => {
  const isKeyboardShown = useSelector(selectIsKeyboardShown);
  const style = StyleSheet.flatten([{ flex }, styleProp]);

  const { headerHeight } = useHeaderHeight(true);

  const offset = useMemo(() => {
    const headerOffset = includeHeader ? headerHeight : 0;
    const givenOffset = isKeyboardShown ? offsetProp?.[Platform.OS] || 0 : 0;

    return headerOffset + givenOffset;
  }, [headerHeight, includeHeader, isKeyboardShown, offsetProp]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={offset}
      {...props}
      style={style}
    />
  );
};

export const KeyboardAwareView = memo(KeyboardAwareViewComponent);
