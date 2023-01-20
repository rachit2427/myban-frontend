import React, { memo, useEffect } from 'react';

import { useKeyboardShown } from '@src/hooks/useKeyboardShown';
import { useMount } from '@src/hooks/useMount';
import { AppNavigator } from '@src/navigation/AppNavigator';
import { useAppDispatch } from '@src/state/hooks';
import { keyboardHidden, keyboardShown } from '@src/state/slices/keyboard';
import { loadIBAN } from '@src/state/thunk/iban';

const AppEntryComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const isKeyboardShown = useKeyboardShown();

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

  return <AppNavigator />;
};

export const AppEntry = memo(AppEntryComponent);
