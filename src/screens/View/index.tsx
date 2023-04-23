import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

import { GetOnStores } from '@src/components/GetOnStores';
import { IBANQR } from '@src/components/IBANQR';
import { Icon } from '@src/components/Icon';
import { Input } from '@src/components/Input';
import { Box } from '@src/components/Layout/Box';
import { Stack } from '@src/components/Layout/Stack';
import { ScrollView } from '@src/components/ScrollView';
import { Text } from '@src/components/Text';
import { useIBANName } from '@src/hooks/useIbanName';
import { useMountedRef } from '@src/hooks/useMountedRef';
import { useTheme } from '@src/hooks/useTheme';
import type { Routes } from '@src/navigation/routes';
import { useAppNavigation, useAppRoute } from '@src/types/navigation';
import { Spacing } from '@src/utils/Spacing';
import { getName } from '@src/utils/string';

const ViewScreenComponent: React.FC = () => {
  const route = useAppRoute<Routes.View>();
  const navigation = useAppNavigation();

  const { iban, firstname, lastname } = route.params;

  const [maskedIBAN] = useIBANName(iban);

  const name = useMemo(
    () => getName(firstname, lastname),
    [firstname, lastname],
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name ? `${name}'s IBAN` : maskedIBAN,
    });
  }, [maskedIBAN, name, navigation]);

  return (
    <ScrollView>
      <Stack flex={1} justify="between">
        <Stack pt={Spacing.large} spacing={Spacing['xx-large']} justify="start">
          <Box align="center">
            <IBANQR iban={iban} firstname={firstname} lastname={lastname} />
          </Box>

          <Stack spacing={Spacing.medium}>
            {name.length !== 0 ? (
              <Box mt={Spacing.large}>
                <Text type="medium" size={24} color="shade800">
                  {name}'s IBAN
                </Text>
              </Box>
            ) : null}

            <Box w="100%">
              <Input
                value={iban}
                editable={false}
                accessoryRight={<CopyToClipboard text={iban} />}
              />
            </Box>
          </Stack>
        </Stack>

        <GetOnStores />
      </Stack>
    </ScrollView>
  );
};

const CopyToClipboard: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const mountedRef = useMountedRef();
  const { colors: themeColors } = useTheme();

  const onCopy = useCallback(() => {
    setCopied(true);

    Clipboard.setString(text);

    setTimeout(async () => {
      mountedRef.current && setCopied(false);
    }, 3000);
  }, [mountedRef, text]);

  return (
    <Pressable onPress={onCopy} style={styles.flex}>
      <Box
        bg={copied ? themeColors.green600 : themeColors.blue400}
        flex={1}
        justify="center"
        ph={Spacing.medium}
      >
        <Icon name={copied ? 'Check' : 'Copy'} color="white" size={24} />
      </Box>
    </Pressable>
  );
};

export const ViewScreen = memo(ViewScreenComponent);

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
