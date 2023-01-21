import React, { memo, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { IBANForm } from '@src/components/Forms/IBAN';
import type { IBANFormState } from '@src/components/Forms/IBAN/IBANFormProvider';
import { IBANFormProvider } from '@src/components/Forms/IBAN/IBANFormProvider';
import { KeyboardAwareView } from '@src/components/KeyboardAwareView';
import { ScrollView } from '@src/components/ScrollView';
import { useAppDispatch } from '@src/state/hooks';
import { addIBAN } from '@src/state/thunk/iban';
import type { NavigationProps } from '@src/types/navigation';
import { safeGoBack } from '@src/utils/navigation';
import { Spacing } from '@src/utils/Spacing';

const AddNewComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  const onPressSave = useCallback(
    async ({ iban, alias, firstname, lastname }: IBANFormState) => {
      await dispatch(
        addIBAN({
          iban: iban.value,
          alias: alias.value,
          firstname: firstname.value,
          lastname: lastname.value,
        }),
      );
    },
    [dispatch],
  );

  const postSave = useCallback(() => {
    safeGoBack(navigation);
  }, [navigation]);

  return (
    <IBANFormProvider>
      <KeyboardAwareView offset={{ android: Spacing['x-large'] }}>
        <ScrollView contentContainerStyle={{ paddingTop: Spacing.large }}>
          <IBANForm onPressSave={onPressSave} postSave={postSave} />
        </ScrollView>
      </KeyboardAwareView>
    </IBANFormProvider>
  );
};

export const AddNew = memo(AddNewComponent);
