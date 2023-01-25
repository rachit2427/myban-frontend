import React, { memo } from 'react';

import { BuyMeACoffee } from '@src/components/BuyMeACoffee';
import { Box } from '@src/components/Layout/Box';
import { ScrollView } from '@src/components/ScrollView';
import { useTheme } from '@src/hooks/useTheme';
import { IBANCard } from '@src/screens/Home/components/IBANCard';
import { useAppSelector } from '@src/state/hooks';
import { selectIBANs } from '@src/state/slices/iban';

const HomeComponent: React.FC = () => {
  const { colors: themeColors } = useTheme();
  const ibans = useAppSelector(selectIBANs);

  return (
    <ScrollView style={{ backgroundColor: themeColors.backgroundSecondary }}>
      <Box flex={1}>
        {ibans.map(iban => (
          <IBANCard key={iban.id} {...iban} />
        ))}
      </Box>

      <BuyMeACoffee />
    </ScrollView>
  );
};

export const Home = memo(HomeComponent);
