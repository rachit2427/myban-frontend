import React, { memo } from 'react';
import { Box } from 'react-native-flex-layout';

import { ScrollView } from '@src/components/ScrollView';
import { Text } from '@src/components/Text';
import { useTheme } from '@src/hooks/useTheme';
import { useAppSelector } from '@src/state/hooks';
import { selectIBANs } from '@src/state/slices/iban';
import { Spacing } from '@src/utils/Spacing';

const HomeComponent: React.FC = () => {
  const ibans = useAppSelector(selectIBANs);
  const { colors: themeColors } = useTheme();

  return (
    <ScrollView>
      {ibans.map(iban => (
        <Box
          key={iban.id}
          bg={themeColors.backgroundPrimary}
          mt={Spacing.large}
        >
          <Text type="light" color="primary500">
            IBAN: {iban.iban}
          </Text>
          <Text type="regular" color="secondary400">
            First Name: {iban.firstname}
          </Text>
          <Text type="medium">Last Name: {iban.lastname}</Text>
        </Box>
      ))}
    </ScrollView>
  );
};

export const Home = memo(HomeComponent);
