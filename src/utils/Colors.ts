import invert from 'invert-color';

const Colors = {
  black: '#000000',
  white: '#ffffff',

  brandPrimary: '#004AAD',
  brandSecondary: '#ffde59',

  red50: '#f7dce1',
  red100: '#efbac3',
  red200: '#e897a5',
  red300: '#e07488',
  red400: '#d8526a',
  red500: '#D02F4C',
  red600: '#a6263d',
  red700: '#7d1c2e',
  red800: '#53131e',
  red900: '#2a090f',

  blue50: '#c7dfff',
  blue100: '#8fbfff',
  blue200: '#579fff',
  blue300: '#1e7eff',
  blue400: '#0062e5',
  blue500: '#004AAD',
  blue600: '#003b8a',
  blue700: '#002c68',
  blue800: '#001e45',
  blue900: '#000f23',

  green50: '#d8fbe3',
  green100: '#b1f8c6',
  green200: '#8bf4aa',
  green300: '#64f08e',
  green400: '#3ded71',
  green500: '#16E955',
  green600: '#12ba44',
  green700: '#0d8c33',
  green800: '#095d22',
  green900: '#042f11',

  yellow50: '#fffae3',
  yellow100: '#fff4c8',
  yellow200: '#ffefac',
  yellow300: '#ffe990',
  yellow400: '#ffe475',
  yellow500: '#FFDE59',
  yellow600: '#ffd014',
  yellow700: '#cea500',
  yellow800: '#8a6e00',
  yellow900: '#453700',

  grey50: '#eaeaea',
  grey100: '#d5d5d5',
  grey200: '#c0c0c0',
  grey300: '#aaaaaa',
  grey400: '#959595',
  grey500: '#808080',
  grey600: '#666666',
  grey700: '#4d4d4d',
  grey800: '#333333',
  grey900: '#1a1a1a',
};

const InvertibleColors = {
  backgroundPrimary: '#ffffff',
  backgroundSecondary: '#eaeaea',

  shade0: '#ffffff',
  shade50: '#eaeaea',
  shade100: '#d5d5d5',
  shade200: '#c0c0c0',
  shade300: '#aaaaaa',
  shade400: '#959595',
  shade500: '#808080',
  shade600: '#666666',
  shade700: '#4d4d4d',
  shade800: '#333333',
  shade900: '#1a1a1a',
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
