import React from 'react';

import { Icon } from '@src/components/Icon';
import { Stack } from '@src/components/Layout/Stack';
import { Text } from '@src/components/Text';
import { Spacing } from '@src/utils/Spacing';

export const AddNewItem: React.FC = () => {
  return (
    <Stack spacing={Spacing['x-small']} direction="row" align="center">
      <Text size={14} color="blue600">
        Add New IBAN
      </Text>
      <Icon name="Plus" size={18} color="blue600" />
    </Stack>
  );
};
