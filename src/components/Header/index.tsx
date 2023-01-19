import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';

import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { Icon } from '@src/components/Icon';
import { Box } from '@src/components/Layout/Box';
import { Stack } from '@src/components/Layout/Stack';
import { Text } from '@src/components/Text';
import { Routes } from '@src/navigation/routes';
import { Spacing } from '@src/utils/Spacing';

export const HEADER_HEIGHT = 60;

export const Header = ({
  options,
  navigation,
}: NativeStackHeaderProps): React.ReactNode => {
  const insets = useSafeAreaInsets();

  const title =
    typeof options.headerTitle === 'string'
      ? options.headerTitle
      : options.title || '';

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate(Routes.Home);
  };

  const canGoBack = navigation.canGoBack();

  return (
    <Shadow
      stretch
      distance={3}
      sides={{
        start: false,
        end: false,
        top: false,
        bottom: true,
      }}
    >
      <Stack
        pt={insets.top + Spacing.medium}
        pb={Spacing.medium}
        ph={Spacing.large}
        h={insets.top + HEADER_HEIGHT}
        direction="row"
        spacing={Spacing.large}
      >
        <Box
          minW={Spacing['xx-large']}
          justify="center"
          pt={Spacing['xx-small']}
        >
          {options.headerBackVisible !== false && canGoBack ? (
            <Icon name="ArrowBack" onPress={goBack} size={24} />
          ) : null}
        </Box>

        <Box flex={1} justify="center">
          <Text type="medium" size={18} numberOfLines={1}>
            {title}
          </Text>
        </Box>

        <Box minW={Spacing['xx-large']} justify="center">
          {options.headerRight?.({ canGoBack })}
        </Box>
      </Stack>
    </Shadow>
  );
};
