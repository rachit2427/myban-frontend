import React, { memo, useCallback, useEffect } from 'react';
import { Alert, Linking, Platform, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from '@src/AppNavigator';
import { Container } from '@src/components/Container';
import { useIsDarkMode } from '@src/hooks/useIsDarkMode';
import { useKeyboardShown } from '@src/hooks/useKeyboardShown';
import { useMount } from '@src/hooks/useMount';
import { useStoreDetails } from '@src/hooks/useStoreDetails';
import { linkingConfig } from '@src/navigation/linkingConfig';
import { useAppDispatch, useAppSelector } from '@src/state/hooks';
import {
  selectShouldHardPushVersion,
  selectShouldSoftPushVersion,
} from '@src/state/slices/app';
import { keyboardHidden, keyboardShown } from '@src/state/slices/keyboard';
import { loadIBAN } from '@src/state/thunk/iban';
import { compareVersion } from '@src/state/thunk/version';

const AppEntryComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const isKeyboardShown = useKeyboardShown();
  const isDarkMode = useIsDarkMode();

  const shouldSoftPushVersion = useAppSelector(selectShouldSoftPushVersion);
  const shouldHardPushVersion = useAppSelector(selectShouldHardPushVersion);

  const { name: storeName, url: storeUrl } = useStoreDetails();

  useEffect(() => {
    if (isKeyboardShown) {
      dispatch(keyboardShown());
      return;
    }

    dispatch(keyboardHidden());
  }, [dispatch, isKeyboardShown]);

  useMount(() => {
    dispatch(loadIBAN());
    dispatch(compareVersion());
  });

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  }, [isDarkMode]);

  const takeToStore = useCallback(() => {
    if (!storeName || !storeUrl) return;

    try {
      Linking.openURL(storeUrl);
    } catch {
      Alert.alert('Could not open the store.');
    }
  }, [storeName, storeUrl]);

  useEffect(() => {
    if (!shouldHardPushVersion && !shouldSoftPushVersion) return;

    if (!storeName || !storeUrl) return;

    Alert.alert(
      'New version available',
      `There is a new version available on the ${storeName}`,
      [
        { text: 'Cancel' },
        {
          isPreferred: true,
          text: 'Update',
          onPress: takeToStore,
        },
      ],
    );
  }, [
    shouldHardPushVersion,
    shouldSoftPushVersion,
    storeName,
    storeUrl,
    takeToStore,
  ]);

  const onReady = useCallback(
    () => Platform.OS !== 'web' && SplashScreen.hide(),
    [],
  );

  return (
    <NavigationContainer onReady={onReady} linking={linkingConfig}>
      <Container>
        <AppNavigator />
      </Container>
    </NavigationContainer>
  );
};

export const AppEntry = memo(AppEntryComponent);
