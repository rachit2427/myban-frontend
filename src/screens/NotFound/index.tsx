import React, { memo } from 'react';
import { Platform } from 'react-native';
import { Spacer } from 'react-native-flex-layout';

import { Button } from '@src/components/Button';
import { Stack } from '@src/components/Layout/Stack';
import { Text } from '@src/components/Text';
import { useTheme } from '@src/hooks/useTheme';
import { Spacing } from '@src/utils/Spacing';

interface NotFoundProps {}

const NotFoundComponent: React.FC<NotFoundProps> = ({}) => {
  const { colors: themeColors } = useTheme();

  return (
    <Stack
      flex={1}
      justify="center"
      align="center"
      ph={Spacing['xxx-large']}
      spacing={Spacing['x-large']}
      bg={themeColors.backgroundSecondary}
    >
      <Text size={42} type="medium" color="shade800">
        404
      </Text>

      <Text align="center" size={24} color="shade800">
        {'Whoops!\nThe page you are looking for was not found!'}
      </Text>

      <Spacer fill={false} />

      {Platform.OS !== 'web' ? <Button>Go Home</Button> : null}
    </Stack>
  );
};

export const NotFound = memo(NotFoundComponent);
