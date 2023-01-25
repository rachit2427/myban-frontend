/* eslint-disable import/no-default-export */
declare module '*.svg' {
  import type React from 'react';
  import type { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-screen-brightness' {
  const setBrightness: (brightness: number) => void;
  const getBrightness: () => Promise<number>;

  export default { setBrightness, getBrightness };
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';

declare function alert(message?: string): string;
