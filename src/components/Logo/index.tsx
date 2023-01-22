import React from 'react';
import { Image } from 'react-native';
import type { ImageProps } from 'react-native/types';

import LogoImage from '@root/assets/icons/logo.png';
import LogoNoBg from '@root/assets/icons/logo_no_bg.png';

interface LogoProps extends Omit<ImageProps, 'source'> {
  height?: number;
  width?: number;
  background?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  background = true,
  height = 50,
  width = 50,
  ...props
}) => {
  return (
    <Image
      style={[{ height, width }, props.style]}
      resizeMode="contain"
      {...props}
      source={background ? LogoImage : LogoNoBg}
    />
  );
};
