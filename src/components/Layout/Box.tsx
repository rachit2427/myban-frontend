import type { ComponentProps } from 'react';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native/types';
import { Box as BoxBase } from 'react-native-flex-layout';

interface BoxProps extends ComponentProps<typeof BoxBase> {
  flex?: ViewStyle['flex'];
  justify?: ViewStyle['justifyContent'];
  align?: ViewStyle['alignItems'];
}

export const BoxComponent: React.FC<BoxProps> = ({
  flex,
  justify,
  align,
  style: styleProp,
  ...props
}) => {
  const style = StyleSheet.flatten([
    { flex, justifyContent: justify, alignItems: align },
    styleProp,
  ]);

  return <BoxBase {...props} style={style} />;
};

export const Box = memo(BoxComponent);
