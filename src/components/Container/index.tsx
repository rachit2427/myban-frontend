import type { PropsWithChildren } from 'react';
import React, { memo } from 'react';
import { Platform } from 'react-native';

import { Box } from '@src/components/Layout/Box';
import { useTheme } from '@src/hooks/useTheme';

export const MAX_CONTAINER_WIDTH = 720;

const ContainerComponent: React.FC<PropsWithChildren> = ({ children }) => {
  const { colors: themeColors } = useTheme();

  if (Platform.OS !== 'web') return <>{children}</>;

  return (
    <Box bg={themeColors.shade100} flex={1} align="center">
      <Box flex={1} w="100%" maxW={MAX_CONTAINER_WIDTH}>
        {children}
      </Box>
    </Box>
  );
};

export const Container = memo(ContainerComponent);
