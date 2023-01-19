import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RouteParamList } from '@src/navigation/routes';
import { Routes } from '@src/navigation/routes';
import { defaultScreenOptions } from '@src/navigation/screenOptions';

const Stack = createNativeStackNavigator<RouteParamList>();

export const AppNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen
      name={Routes.Home}
      getComponent={() => require('../screens/Home').Home}
      options={{
        headerTitle: 'Home',
      }}
    />
  </Stack.Navigator>
);
