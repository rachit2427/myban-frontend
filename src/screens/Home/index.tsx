import React, { memo } from 'react';

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
      {ibans.map(iban => (
        <IBANCard key={iban.id} {...iban} />
      ))}
    </ScrollView>
  );
};

export const Home = memo(HomeComponent);
