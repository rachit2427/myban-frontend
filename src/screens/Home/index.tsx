import React, { memo } from 'react';
import { Box } from 'react-native-flex-layout';

import { Text } from '@src/components/Text';
import { useTheme } from '@src/hooks/useTheme';

interface HomeProps {}

const HomeComponent: React.FC<HomeProps> = ({}) => {
  const { colors: themeColors } = useTheme();

  return (
    <>
      <Box bg={themeColors.backgroundPrimary}>
        <Text type="light" color="primary500">
          Hello
        </Text>
        <Text type="regular" color="secondary400">
          Hello
        </Text>
        <Text type="medium">Hello</Text>
      </Box>

      <Box bg={themeColors.backgroundSecondary}>
        <Text type="light" color="primary500">
          Hello
        </Text>
        <Text type="regular" color="secondary400">
          Hello
        </Text>
        <Text type="medium">Hello</Text>
      </Box>
    </>
  );
};

export const Home = memo(HomeComponent);
