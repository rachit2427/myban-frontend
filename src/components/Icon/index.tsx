import React, { memo, useMemo } from 'react';
import { Platform, Pressable } from 'react-native';
import type { PressableProps } from 'react-native/types';

import * as SVGs from '@src/assets/svgs';
import { useTheme } from '@src/hooks/useTheme';
import type { Colors } from '@src/utils/Colors';

interface IconProps extends PressableProps {
  name: keyof typeof SVGs;
  color?: keyof Colors;
  size?: number;
}

const IconComponent: React.FC<IconProps> = ({
  name,
  color = 'shade800',
  size: sizeProp = 20,
  ...pressableProps
}) => {
  const { colors: themeColors } = useTheme();
  const Component = SVGs[name];

  const size = useMemo(() => {
    if (Platform.OS !== 'web') return sizeProp;

    return Math.max(sizeProp, 24);
  }, [sizeProp]);

  return (
    <Wrapper {...pressableProps}>
      <Component
        color={themeColors[color]}
        style={{ height: size, width: size }}
      />
    </Wrapper>
  );
};

const Wrapper: React.FC<PressableProps> = pressableProps => {
  if (pressableProps.onPress) {
    return <Pressable {...pressableProps} />;
  }

  return <>{pressableProps.children}</>;
};

export const Icon = memo(IconComponent);
