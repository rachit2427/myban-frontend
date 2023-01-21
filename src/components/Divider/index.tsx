import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import { Box } from '@src/components/Layout/Box';
import { useTheme } from '@src/hooks/useTheme';
import type { Colors } from '@src/utils/Colors';

interface DividerProps {
  color?: keyof Colors;
}

const DividerComponent: React.FC<DividerProps> = ({ color = 'shade400' }) => {
  const { colors: themeColors } = useTheme();

  const borderColor = themeColors[color];

  return (
    <Box borderTop={StyleSheet.hairlineWidth} borderTopColor={borderColor} />
  );
};

export const Divider = memo(DividerComponent);
