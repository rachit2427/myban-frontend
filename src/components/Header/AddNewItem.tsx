import React, { useCallback } from 'react';
import { Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Icon } from '@src/components/Icon';
import { Stack } from '@src/components/Layout/Stack';
import { Text } from '@src/components/Text';
import { Routes } from '@src/navigation/routes';
import type { NavigationProps } from '@src/types/navigation';
import { Spacing } from '@src/utils/Spacing';

export const AddNewItem: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const onPress = useCallback(() => {
    navigation.navigate(Routes.AddNew);
  }, [navigation]);

  return (
    <Pressable onPress={onPress}>
      <Stack spacing={Spacing['x-small']} direction="row" align="center">
        <Text size={14} color="blue600">
          Add New IBAN
        </Text>
        <Icon name="Plus" size={18} color="blue600" />
      </Stack>
    </Pressable>
  );
};
