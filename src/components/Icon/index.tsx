import React, { memo } from 'react';

import * as SVGs from '@src/assets/svgs';
import { useTheme } from '@src/hooks/useTheme';
import type { Colors } from '@src/utils/Colors';

interface IconProps {
  name: keyof typeof SVGs;
  color?: keyof Colors;
  size?: number;
}

const IconComponent: React.FC<IconProps> = ({
  name = 'ArrowBack',
  color = 'shade800',
  size = 20,
}) => {
  const { colors: themeColors } = useTheme();
  const Component = SVGs[name];

  return (
    <Component
      color={themeColors[color]}
      style={{ height: size, width: size }}
    />
  );
};

export const Icon = memo(IconComponent);
