import React, { memo } from 'react';
import { Pressable } from 'react-native';
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
  size = 20,
  ...pressableProps
}) => {
  const { colors: themeColors } = useTheme();
  const Component = SVGs[name];

  return (
    <Pressable {...pressableProps}>
      <Component
        color={themeColors[color]}
        style={{ height: size, width: size }}
      />
    </Pressable>
  );
};

export const Icon = memo(IconComponent);
