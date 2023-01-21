import React, { memo, useMemo } from 'react';
import { Dimensions } from 'react-native';
import type { QRCodeProps } from 'react-native-qrcode-svg';
import QRCode from 'react-native-qrcode-svg';

import { useIsDarkMode } from '@src/hooks/useIsDarkMode';
import { useTheme } from '@src/hooks/useTheme';
import type { IBANWithID } from '@src/types';

const windowWidth = Dimensions.get('window').width;

interface QrCodeProps extends QRCodeProps, Pick<IBANWithID, 'iban'> {}

const QrCodeComponent: React.FC<QrCodeProps> = ({ iban, ...props }) => {
  const isDarkMode = useIsDarkMode();
  const { colors: themeColors } = useTheme();

  const value = useMemo(() => `https://google.com/?i=${iban}`, [iban]);
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

export const QrCode = memo(QrCodeComponent);
