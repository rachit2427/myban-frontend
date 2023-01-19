import { useCallback, useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import type { EmitterSubscription } from 'react-native/types';

/**
 * Determines if the keyboard is shown or not.
 *
 * Use `selectIsKeyboardShown` from state instead
 */
export const useKeyboardShown = (): boolean => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const showKeyboard = useCallback(() => setIsKeyboardShown(true), []);
  const hideKeyboard = useCallback(() => setIsKeyboardShown(false), []);

  useEffect(() => {
    let showSubscription: EmitterSubscription;
    let hideSubscription: EmitterSubscription;

    if (Platform.OS === 'android') {
      showSubscription = Keyboard.addListener('keyboardDidShow', showKeyboard);
      hideSubscription = Keyboard.addListener('keyboardDidHide', hideKeyboard);
    } else {
      showSubscription = Keyboard.addListener('keyboardWillShow', showKeyboard);
      hideSubscription = Keyboard.addListener('keyboardWillHide', hideKeyboard);
    }

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [hideKeyboard, showKeyboard]);

  return isKeyboardShown;
};
