import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddNewItem } from '@src/components/Header/AddNewItem';
import type { RouteParamList } from '@src/navigation/routes';
import { Routes } from '@src/navigation/routes';
import { defaultScreenOptions } from '@src/navigation/screenOptions';

const Stack = createNativeStackNavigator<RouteParamList>();

export const AppNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen
      name={Routes.Home}
      getComponent={() => require('./screens/Home').Home}
      options={{
        headerTitle: '',
        headerRight: AddNewItem,
        headerBackVisible: false,
      }}
    />

    <Stack.Group
      screenOptions={{
        presentation: 'modal',
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen
        name={Routes.AddNew}
        getComponent={() => require('./screens/AddNew').AddNew}
        options={{ headerTitle: 'Add New IBAN' }}
      />

      <Stack.Screen
        name={Routes.Edit}
        getComponent={() => require('./screens/Edit').Edit}
        options={{ headerTitle: '' }}
      />

      <Stack.Screen
        name={Routes.View}
        getComponent={() => require('./screens/View').ViewScreen}
        options={{ headerTitle: '' }}
      />
    </Stack.Group>
  </Stack.Navigator>
);
