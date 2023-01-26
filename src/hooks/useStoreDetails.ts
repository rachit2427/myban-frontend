import { Platform } from 'react-native';

import { APPLE_APP_STORE_LINK, GOOGLE_PLAY_STORE_LINK } from '@env';

export const useStoreDetails = () => {
  switch (Platform.OS) {
    case 'android':
      return {
        name: 'Google Play Store',
        url: GOOGLE_PLAY_STORE_LINK,
      };

    case 'ios':
      return {
        name: 'Apple App Store',
        url: APPLE_APP_STORE_LINK,
      };

    default:
      return {};
  }
};
