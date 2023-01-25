import React from 'react';
import { Platform } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddNewItem } from '@src/components/Header/AddNewItem';
import { Logo } from '@src/components/Logo';
import type { RouteParamList } from '@src/navigation/routes';
import { Routes } from '@src/navigation/routes';
import { defaultScreenOptions } from '@src/navigation/screenOptions';

const Stack = createNativeStackNavigator<RouteParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultScreenOptions}
      initialRouteName={Platform.OS === 'web' ? Routes.NotFound : Routes.Home}
    >
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      >
        {Platform.OS === 'web' ? undefined : nativeScreens().modals}
        {commonScreens().modals}
      </Stack.Group>

      {Platform.OS === 'web' ? undefined : nativeScreens().screens}
      {commonScreens().screens}
    </Stack.Navigator>
  );
};

const HomeHeaderLeft = () => (
  <Logo height={100} width={100} background={false} />
);

const HomeHeaderRight = () => <AddNewItem />;

const commonScreens = () => ({
  screens: (
    <Stack.Screen
      name={Routes.NotFound}
      getComponent={() => require('./screens/NotFound').NotFound}
      options={{ headerShown: false }}
    />
  ),
  modals: (
    <Stack.Screen
      name={Routes.View}
      getComponent={() => require('./screens/View').ViewScreen}
      options={{ headerTitle: '' }}
    />
  ),
});

const nativeScreens = () => ({
  screens: (
    <Stack.Screen
      name={Routes.Home}
      getComponent={() => require('./screens/Home').Home}
      options={{
        headerTitle: '',
        headerRight: HomeHeaderRight,
        headerLeft: HomeHeaderLeft,
        headerBackVisible: false,
      }}
    />
  ),
  modals: (
    <>
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
    </>
  ),
});
