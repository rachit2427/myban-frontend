import React, { memo } from 'react';

import type { BoxProps } from '@src/components/Layout/Box';
import { Box } from '@src/components/Layout/Box';
import type { SurfaceProps } from '@src/components/Surface';
import { Surface } from '@src/components/Surface';
import { useTheme } from '@src/hooks/useTheme';

interface CardProps extends BoxProps {
  radius?: number;
  offset?: Partial<{ x?: string | number; y?: string | number }>;
  surfaceProps?: SurfaceProps;
}

const CardComponent: React.FC<CardProps> = ({
  radius = 8,
  offset,
  surfaceProps,
  ...props
}) => {
  const { colors: themeColors } = useTheme();

  return (
    <Surface
      distance={1}
      offset={[offset?.x || 0, offset?.y || 0]}
      style={{ borderRadius: radius }}
      {...surfaceProps}
    >
      <Box bg={themeColors.backgroundPrimary} radius={radius} {...props} />
    </Surface>
  );
};

export const Card = memo(CardComponent);
