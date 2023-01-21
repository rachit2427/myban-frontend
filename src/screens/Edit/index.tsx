import React, { memo, useCallback, useEffect, useMemo } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import { IBANForm } from '@src/components/Forms/IBAN';
import type { IBANFormState } from '@src/components/Forms/IBAN/IBANFormProvider';
import { IBANFormProvider } from '@src/components/Forms/IBAN/IBANFormProvider';
import { KeyboardAwareView } from '@src/components/KeyboardAwareView';
import { ScrollView } from '@src/components/ScrollView';
import { useIBANName } from '@src/hooks/useIbanName';
import type { Routes } from '@src/navigation/routes';
import { useAppDispatch, useAppSelector } from '@src/state/hooks';
import { selectIBANs } from '@src/state/slices/iban';
import { replaceIBAN } from '@src/state/thunk/iban';
import type { RouteProps } from '@src/types/navigation';
import { Spacing } from '@src/utils/Spacing';

const getFormState = (key: string) => ({
  value: key,
  disabled: true,
});

const EditComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute<RouteProps<Routes.Edit>>();

  const allIBANs = useAppSelector(selectIBANs);

  const ibanWithId = useMemo(
    () => allIBANs[route.params.index],
    [allIBANs, route.params.index],
  );

  const [iban] = useIBANName(ibanWithId.iban);

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

  if (!iban) return null;

  return (
    <IBANFormProvider value={formState}>
      <KeyboardAwareView offset={{ android: Spacing['x-large'] }}>
        <ScrollView>
          <IBANForm onPressSave={onPressSave} />
        </ScrollView>
      </KeyboardAwareView>
    </IBANFormProvider>
  );
};

export const Edit = memo(EditComponent);