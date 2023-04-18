import React, { memo, useCallback } from 'react';
import { Linking } from 'react-native';

import { Stack } from '@src/components/Layout/Stack';
import { ScrollView } from '@src/components/ScrollView';
import { Text } from '@src/components/Text';
import { Spacing } from '@src/utils/Spacing';

const SupportComponent: React.FC = () => {
  const mailToSupport = useCallback(async () => {
    try {
      Linking.openURL(`mailto:rachit.estonia@gmail.com`);
    } catch {}
  }, []);

  return (
    <ScrollView>
      <Stack pt={Spacing.large} spacing={Spacing.medium}>
        <Text color="shade900" type="medium">
          Contact Us
        </Text>

        <Text color="shade800">
          Have any questions? Please contact us at{' '}
          <Text color="blue500" onPress={mailToSupport}>
            rachit.estonia@gmail.com
          </Text>{' '}
          and we will do our best to address your concerns as quickly as
          possible.
        </Text>
      </Stack>
    </ScrollView>
  );
};

export const Support = memo(SupportComponent);
