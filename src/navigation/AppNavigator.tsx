import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RouteParamList } from '@src/navigation/routes';
import { Routes } from '@src/navigation/routes';

const Stack = createNativeStackNavigator<RouteParamList>();

export const AppNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Routes.Home}
      getComponent={() => require('../screens/Home').Home}
    />
  </Stack.Navigator>
);
