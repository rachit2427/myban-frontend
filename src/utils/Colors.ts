import invert from 'invert-color';

/**
 * Material UI Colors
 * [@link](https://mui.com/material-ui/customization/color/#color-palette)
 */
const Colors = {
  black: '#000000',
  white: '#ffffff',

  red50: '#ffebee',
  red100: '#ffcdd2',
  red200: '#ef9a9a',
  red300: '#e57373',
  red400: '#ef5350',
  red500: '#f44336',
  red600: '#e53935',
  red700: '#d32f2f',
  red800: '#c62828',
  red900: '#b71c1c',

  blue50: '#e3f2fd',
  blue100: '#bbdefb',
  blue200: '#90caf9',
  blue300: '#64b5f6',
  blue400: '#42a5f5',
  blue500: '#2196f3',
  blue600: '#1e88e5',
  blue700: '#1976d2',
  blue800: '#1565c0',
  blue900: '#0d47a1',

  green50: '#e8f5e9',
  green100: '#c8e6c9',
  green200: '#a5d6a7',
  green300: '#81c784',
  green400: '#66bb6a',
  green500: '#4caf50',
  green600: '#43a047',
  green700: '#388e3c',
  green800: '#2e7d32',
  green900: '#1b5e20',

  yellow50: '#fffde7',
  yellow100: '#fff9c4',
  yellow200: '#fff59d',
  yellow300: '#fff176',
  yellow400: '#ffee58',
  yellow500: '#ffeb3b',
  yellow600: '#fdd835',
  yellow700: '#fbc02d',
  yellow800: '#f9a825',
  yellow900: '#f57f17',

  grey50: '#fafafa',
  grey100: '#f5f5f5',
  grey200: '#eeeeee',
  grey300: '#e0e0e0',
  grey400: '#bdbdbd',
  grey500: '#9e9e9e',
  grey600: '#757575',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#212121',
};

const InvertibleColors = {
  backgroundPrimary: '#ffffff',
  backgroundSecondary: '#eeeeee',

  shade50: '#fafafa',
  shade100: '#f5f5f5',
  shade200: '#eeeeee',
  shade300: '#e0e0e0',
  shade400: '#bdbdbd',
  shade500: '#9e9e9e',
  shade600: '#757575',
  shade700: '#616161',
  shade800: '#424242',
  shade900: '#212121',

  primary50: '#e3f2fd',
  primary100: '#bbdefb',
  primary200: '#90caf9',
  primary300: '#64b5f6',
  primary400: '#42a5f5',
  primary500: '#2196f3',
  primary600: '#1e88e5',
  primary700: '#1976d2',
  primary800: '#1565c0',
  primary900: '#0d47a1',

  secondary50: '#e8f5e9',
  secondary100: '#c8e6c9',
  secondary200: '#a5d6a7',
  secondary300: '#81c784',
  secondary400: '#66bb6a',
  secondary500: '#4caf50',
  secondary600: '#43a047',
  secondary700: '#388e3c',
  secondary800: '#2e7d32',
  secondary900: '#1b5e20',
};

const DarkInvertibleColors = Object.fromEntries(
  Object.entries(InvertibleColors).map(([key, value]) => [key, invert(value)]),
) as Record<keyof typeof InvertibleColors, string>;

export type Colors = typeof Colors & typeof InvertibleColors;

export const LightColors: Colors = {
  ...Colors,
  ...InvertibleColors,
};

export const DarkColors: Colors = {
  ...Colors,
  ...DarkInvertibleColors,
};
