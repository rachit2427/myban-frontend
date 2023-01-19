import type { ComponentProps } from 'react';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native/types';
import { Stack as StackBase } from 'react-native-flex-layout';

interface StackProps
  extends Omit<ComponentProps<typeof StackBase>, 'fill' | 'items'> {
  flex?: ViewStyle['flex'];
  align?: ViewStyle['alignItems'];
}

const StackComponent: React.FC<StackProps> = ({
  flex,
  style: styleProp,
  align,
  ...props
}) => {
  const style = StyleSheet.flatten([{ flex, alignItems: align }, styleProp]);

  return <StackBase {...props} style={style} />;
};

export const Stack = memo(StackComponent);
