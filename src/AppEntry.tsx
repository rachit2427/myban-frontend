import React, { memo, useEffect } from 'react';
import { StatusBar } from 'react-native';

import { AppNavigator } from '@src/AppNavigator';
import { Container } from '@src/components/Container';
import { useIsDarkMode } from '@src/hooks/useIsDarkMode';
import { useKeyboardShown } from '@src/hooks/useKeyboardShown';
import { useMount } from '@src/hooks/useMount';
import { useAppDispatch } from '@src/state/hooks';
import { keyboardHidden, keyboardShown } from '@src/state/slices/keyboard';
import { loadIBAN } from '@src/state/thunk/iban';

const AppEntryComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const isKeyboardShown = useKeyboardShown();
  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    if (isKeyboardShown) {
      dispatch(keyboardShown());
      return;
    }

    dispatch(keyboardHidden());
  }, [dispatch, isKeyboardShown]);

  useMount(() => {
    dispatch(loadIBAN());
  });

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  }, [isDarkMode]);

  return (
    <Container>
      <AppNavigator />
    </Container>
  );
};

export const AppEntry = memo(AppEntryComponent);
