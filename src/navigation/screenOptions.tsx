import React from 'react';

import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { Header } from '@src/components/Header';

export const defaultScreenOptions: NativeStackNavigationOptions = {
  header: props => <Header {...props} />,
  animation: 'slide_from_right',
};
