import React, { memo, useCallback } from 'react';
import { Clipboard, Platform, Share as NativeShare } from 'react-native';

import { Icon } from '@src/components/Icon';
import { useIBANUrl } from '@src/hooks/useIBANUrl';
import type { IBAN } from '@src/types';

const ShareComponent: React.FC<IBAN> = ({ iban, firstname, lastname }) => {
  const { fullUrl: shareURL } = useIBANUrl({ iban, firstname, lastname });

  const onPress = useCallback(async () => {
    try {
      if (Platform.OS === 'web') {
        Clipboard.setString(shareURL);

        globalThis.alert(
          'Shareable URL to your IBAN has been copied to clipboard',
        );
      } else {
        await NativeShare.share({
          title: 'Find My IBAN on MyBAN App',
          message: `Find My IBAN on MyBAN App:\n${shareURL}`,
          url: shareURL,
        });
      }
    } catch {
      // Share cancelled.
    }
  }, [shareURL]);

  return <Icon name="Share" color="grey50" onPress={onPress} />;
};

export const Share = memo(ShareComponent);
