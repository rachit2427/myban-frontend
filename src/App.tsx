/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { Provider as ReduxProvider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import { AppEntry } from '@src/AppEntry';
import { store } from '@src/state';

export const App: React.FC = () => {
  const onReady = useCallback(() => {
    Platform.OS !== 'web' && SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <NavigationContainer onReady={onReady}>
          <AppEntry />
        </NavigationContainer>
      </ReduxProvider>
    </SafeAreaProvider>
  );
};
