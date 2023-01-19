import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';

import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { Box } from '@src/components/layout/Box';
import { Stack } from '@src/components/layout/Stack';
import { Text } from '@src/components/Text';
import { useTheme } from '@src/hooks/useTheme';
import { Spacing } from '@src/utils/Spacing';

export const HEADER_HEIGHT = 60;

export const Header = ({
  options,
  navigation,
}: NativeStackHeaderProps): React.ReactNode => {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();

  const title =
    typeof options.headerTitle === 'string'
      ? options.headerTitle
      : options.title || '';

  return (
    <Shadow
      distance={3}
      sides={{
        start: false,
        end: false,
        top: false,
        bottom: true,
      }}
      stretch>
      <Stack
        pt={insets.top + Spacing.medium}
        pb={Spacing.medium}
        ph={Spacing.large}
        h={insets.top + HEADER_HEIGHT}
        bg={themeColors.red50}
        direction="row"
        spacing={Spacing.large}>
        <Box
          bg={themeColors.blue400}
          w={Spacing['xx-large']}
          justify="center"
        />

        <Box bg={themeColors.green300} flex={1} justify="center">
          <Text type="medium" size={18} numberOfLines={1}>
            {title}
          </Text>
        </Box>

        <Box
          bg={themeColors.yellow400}
          w={Spacing['xx-large']}
          justify="center">
          {options.headerRight?.({ canGoBack: navigation.canGoBack() })}
        </Box>
      </Stack>
    </Shadow>
  );
};
