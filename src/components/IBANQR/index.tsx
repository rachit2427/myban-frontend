import React, { memo, useMemo } from 'react';
import { Dimensions } from 'react-native';
import type { QRCodeProps } from 'react-native-qrcode-svg';
import QRCode from 'react-native-qrcode-svg';

import { useIsDarkMode } from '@src/hooks/useIsDarkMode';
import { useTheme } from '@src/hooks/useTheme';
import type { IBAN } from '@src/types';

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

  const value = useMemo(
    () => `https://google.com/?i=${iban}&fn=${firstname}&ln=${lastname}`,
    [firstname, iban, lastname],
  );
  const size = windowWidth * 0.7;

  return (
    <QRCode
      value={value}
      size={size}
      color={isDarkMode ? themeColors.white : themeColors.black}
      backgroundColor={'transparent'}
      {...props}
    />
  );
};

export const IBANQR = memo(IBANQRComponent);
