import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { Header } from '@src/components/Header';

export const defaultScreenOptions: NativeStackNavigationOptions = {
  header: Header,
  animation: 'slide_from_right',
};
