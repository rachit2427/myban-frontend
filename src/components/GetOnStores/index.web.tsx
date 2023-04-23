import React, { memo, useCallback } from 'react';
import { Alert, Image, Linking, Pressable, StyleSheet } from 'react-native';

import { APPLE_APP_STORE_LINK, GOOGLE_PLAY_STORE_LINK } from '@env';

import DownloadOnAppStore from '@src/assets/img/download-on-app-store.svg';
import GetOnPlayStore from '@src/assets/img/get-on-google-play.png';
import { Stack } from '@src/components/Layout/Stack';

const GetOnStoresComponent: React.FC = () => {
  const openOnStore = useCallback((storeLink: string) => {
    if (!storeLink) {
      return;
    }

    Linking.openURL(storeLink).catch(() => {
      Alert.alert(
        'Something went wrong!',
        'Could not open store link. Please inform the developer.',
      );
    });
  }, []);

  const getOnAppStore = useCallback(
    () => openOnStore(APPLE_APP_STORE_LINK),
    [openOnStore],
  );

  const getOnPlayStore = useCallback(
    () => openOnStore(GOOGLE_PLAY_STORE_LINK),
    [openOnStore],
  );

  return (
    <Stack direction="row">
      <Pressable style={styles.storeContainer} onPress={getOnAppStore}>
        <DownloadOnAppStore height={40} width={120} />
      </Pressable>

      <Pressable style={styles.storeContainer} onPress={getOnPlayStore}>
        <Image
          source={{ uri: GetOnPlayStore }}
          style={styles.playStoreImage}
          resizeMode="contain"
        />
      </Pressable>
    </Stack>
  );
};

export const GetOnStores = memo(GetOnStoresComponent);

const styles = StyleSheet.create({
  playStoreImage: {
    height: '150%',
    width: '150%',
  },
  storeContainer: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
