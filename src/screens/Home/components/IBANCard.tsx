import React, { memo, useCallback, useMemo } from 'react';
import { Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Card } from '@src/components/Card';
import { Icon } from '@src/components/Icon';
import { Box } from '@src/components/Layout/Box';
import { Stack } from '@src/components/Layout/Stack';
import { Text } from '@src/components/Text';
import { useIBANName } from '@src/hooks/useIbanName';
import { useIsDarkMode } from '@src/hooks/useIsDarkMode';
import { useTheme } from '@src/hooks/useTheme';
import { Routes } from '@src/navigation/routes';
import type { IBANWithID } from '@src/types';
import type { NavigationProps } from '@src/types/navigation';
import { Spacing } from '@src/utils/Spacing';
import { getName } from '@src/utils/string';

interface Props extends IBANWithID {}

const IBANCardComponent: React.FC<Props> = ({
  id,
  alias,
  iban,
  firstname,
  lastname,
}) => {
  const isDarkMode = useIsDarkMode();
  const { colors: themeColors } = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const [ibanName, toggleMasking] = useIBANName(iban);

  const name = useMemo(
    () => getName(firstname, lastname),
    [firstname, lastname],
  );

  const onPress = useCallback(() => {
    navigation.navigate(Routes.Edit, { id });
  }, [id, navigation]);

  return (
    <Box mt={Spacing.large}>
      <Pressable onPress={onPress}>
        <Card
          ph={Spacing.large}
          pv={Spacing.large}
          offset={{ x: 0, y: 1 }}
          bg={isDarkMode ? themeColors.backgroundPrimary : themeColors.white}
        >
          <Stack spacing={Spacing.medium} direction="row">
            <Stack
              flex={1}
              spacing={Spacing['x-small']}
              align="flex-start"
              justify="center"
            >
              <Pressable
                onPress={toggleMasking}
                hitSlop={{ top: 8, bottom: 8 }}
              >
                <Text type="medium" color="shade900">
                  {alias || ibanName}
                </Text>
              </Pressable>

              {name ? <Text color="yellow700">{name}</Text> : null}
            </Stack>

            <Box justify="center">
              <Icon name="ChevronRight" size={30} color="blue300" />
            </Box>
          </Stack>
        </Card>
      </Pressable>
    </Box>
  );
};

export const IBANCard = memo(IBANCardComponent);
