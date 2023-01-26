/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import { AppEntry } from '@src/AppEntry';
import { store } from '@src/state';

export const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <AppEntry />
      </ReduxProvider>
    </SafeAreaProvider>
  );
};
