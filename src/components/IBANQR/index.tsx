import React, { memo, useMemo } from 'react';
import { Dimensions, Platform } from 'react-native';
import type { QRCodeProps } from 'react-native-qrcode-svg';
import QRCode from 'react-native-qrcode-svg';

import LogoImage from '@root/assets/icons/logo_square.png';
import { MAX_CONTAINER_WIDTH } from '@src/components/Container';
import { Box } from '@src/components/Layout/Box';
import { useIBANUrl } from '@src/hooks/useIBANUrl';
import { useIsDarkMode } from '@src/hooks/useIsDarkMode';
import { useTheme } from '@src/hooks/useTheme';
import type { IBAN } from '@src/types';
// import LogoNoBg from '@root/assets/icons/logo_no_bg.png';

const windowWidth = Dimensions.get('window').width;

type IBANProps = Partial<Pick<IBAN, 'iban' | 'firstname' | 'lastname'>> &
  Required<Pick<IBAN, 'iban'>>;

interface IBANQRProps extends QRCodeProps, IBANProps {}

const IBANQRComponent: React.FC<IBANQRProps> = ({
  iban,
  firstname,
  lastname,
  ...props
}) => {
  const isDarkMode = useIsDarkMode();
  const { colors: themeColors } = useTheme();

  const { fullUrl: QRUrl } = useIBANUrl({ iban, firstname, lastname });

  const size = useMemo(
    () =>
      (Platform.OS === 'web'
        ? Math.min(windowWidth, MAX_CONTAINER_WIDTH)
        : windowWidth) * 0.7,
    [],
  );

  return (
    <Box radius={8} overflow="hidden">
      <QRCode
        value={QRUrl}
        size={size}
        color={isDarkMode ? themeColors.white : themeColors.black}
        backgroundColor={themeColors.shade0}
        logo={LogoImage}
        logoBorderRadius={8}
        logoBackgroundColor={themeColors.white}
        logoSize={size * 0.25}
        logoMargin={2}
        {...props}
      />
    </Box>
  );
};

export const IBANQR = memo(IBANQRComponent);
