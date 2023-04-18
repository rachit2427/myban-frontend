import React, { memo } from 'react';
import { Platform } from 'react-native';

import { BuyMeACoffee } from '@src/components/BuyMeACoffee';
import { Github } from '@src/components/Github';
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

      {/* iOS doesn't allow donations outside the app. @todo - support in app purchases */}
      {Platform.OS === 'ios' ? <Github /> : <BuyMeACoffee />}
    </ScrollView>
  );
};

export const Home = memo(HomeComponent);
