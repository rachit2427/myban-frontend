/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import { AppEntry } from '@src/AppEntry';
import { store } from '@src/state';

export const App: React.FC = () => (
  <ReduxProvider store={store}>
    <NavigationContainer>
      <AppEntry />
    </NavigationContainer>
  </ReduxProvider>
);
