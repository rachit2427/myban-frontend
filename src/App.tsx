/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider as ReduxProvider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import { store } from '@src/state';
import { useAppDispatch, useAppSelector } from '@src/state/hooks';
import { decrement, increment, selectCount } from '@src/state/slices/dummy';

export const App: React.FC = () => (
  <ReduxProvider store={store}>
    <NavigationContainer>
      <AppInner />
    </NavigationContainer>
  </ReduxProvider>
);

const AppInner: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useAppDispatch();
  const counter = useAppSelector(selectCount);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const incrementCounter = useCallback(() => dispatch(increment()), [dispatch]);
  const decrementCounter = useCallback(() => dispatch(decrement()), [dispatch]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text>{counter}</Text>
      <Button title="Increment" onPress={incrementCounter} />
      <Button title="Decrement" onPress={decrementCounter} />
    </SafeAreaView>
  );
};
