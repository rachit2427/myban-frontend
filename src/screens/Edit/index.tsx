import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Spacer } from 'react-native-flex-layout';
import ScreenBrightness from 'react-native-screen-brightness';

import { useNavigation, useRoute } from '@react-navigation/native';

import { IBANForm } from '@src/components/Forms/IBAN';
import type { IBANFormState } from '@src/components/Forms/IBAN/IBANFormProvider';
import { IBANFormProvider } from '@src/components/Forms/IBAN/IBANFormProvider';
import { IBANQR } from '@src/components/IBANQR';
import { KeyboardAwareView } from '@src/components/KeyboardAwareView';
import { Box } from '@src/components/Layout/Box';
import { Stack } from '@src/components/Layout/Stack';
import { ScrollView } from '@src/components/ScrollView';
import { useIBANName } from '@src/hooks/useIbanName';
import { useMount } from '@src/hooks/useMount';
import type { Routes } from '@src/navigation/routes';
import { useAppDispatch, useAppSelector } from '@src/state/hooks';
import { selectIBANs } from '@src/state/slices/iban';
import { removeIBAN, replaceIBAN } from '@src/state/thunk/iban';
import type { IBANWithID } from '@src/types';
import type { NavigationProps, RouteProps } from '@src/types/navigation';
import { safeGoBack } from '@src/utils/navigation';
import { Spacing } from '@src/utils/Spacing';

const getFormState = (key: string) => ({
  value: key,
  disabled: true,
});

const EditComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps<Routes.Edit>>();

  const allIBANs = useAppSelector(selectIBANs);

  const ibanWithId = useMemo(
    () => allIBANs.find(iban => iban.id === route.params.id),
    [allIBANs, route.params.id],
  ) as IBANWithID;

  const [iban] = useIBANName(ibanWithId.iban || '');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: ibanWithId.alias || iban,
    });
  });

  const formState = useMemo<IBANFormState>(
    () => ({
      iban: getFormState(ibanWithId.iban),
      alias: getFormState(ibanWithId.alias),
      firstname: getFormState(ibanWithId.firstname),
      lastname: getFormState(ibanWithId.lastname),
    }),
    [
      ibanWithId.alias,
      ibanWithId.firstname,
      ibanWithId.iban,
      ibanWithId.lastname,
    ],
  );

  const onPressSave = useCallback(
    async (formData: IBANFormState) => {
      await dispatch(
        replaceIBAN({
          id: ibanWithId.id,
          iban: formData.iban.value,
          alias: formData.alias.value,
          firstname: formData.firstname.value,
          lastname: formData.lastname.value,
        }),
      );
    },
    [dispatch, ibanWithId.id],
  );

  const onPressDelete = useCallback(() => {
    dispatch(removeIBAN(ibanWithId.id));
    safeGoBack(navigation);
  }, [dispatch, ibanWithId.id, navigation]);

  useMount(() => {
    let defaultBrightness = 0.5;
    (async () => {
      try {
        defaultBrightness = await ScreenBrightness.getBrightness();
        ScreenBrightness.setBrightness(Math.max(defaultBrightness, 0.75));
      } catch {
        // Don't handle errors
      }
    })();

    return () => {
      try {
        ScreenBrightness.setBrightness(defaultBrightness);
      } catch {
        // Don't handle errors
      }
    };
  });

  return (
    <IBANFormProvider value={formState}>
      <KeyboardAwareView offset={{ android: Spacing['x-large'] }}>
        <ScrollView contentContainerStyle={{ paddingTop: Spacing.large }}>
          <Stack flex={1} spacing={Spacing.large}>
            <Box align="center">
              <IBANQR iban={ibanWithId.iban} />
            </Box>

            <Spacer fill={false} />

            <IBANForm onPressSave={onPressSave} onPressDelete={onPressDelete} />
          </Stack>
        </ScrollView>
      </KeyboardAwareView>
    </IBANFormProvider>
  );
};

export const Edit = memo(EditComponent);
