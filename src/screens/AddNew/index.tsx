import React, { memo, useCallback, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Button } from '@src/components/Button';
import { Input } from '@src/components/Input';
import { KeyboardAwareView } from '@src/components/KeyboardAwareView';
import { Box } from '@src/components/Layout/Box';
import { Stack } from '@src/components/Layout/Stack';
import { ScrollView } from '@src/components/ScrollView';
import { validateFormData } from '@src/screens/AddNew/helpers';
import { useAppDispatch } from '@src/state/hooks';
import { addIBAN } from '@src/state/thunk/iban';
import type { NavigationProps } from '@src/types/navigation';
import { safeGoBack } from '@src/utils/navigation';
import { Spacing } from '@src/utils/Spacing';

const AddNewComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  const [saving, setSaving] = useState(false);

  const [iban, setIban] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [ibanError, setIbanError] = useState('');

  const onPress = useCallback(async () => {
    setSaving(true);
    const isValidIBAN = await validateFormData(iban);

    if (!isValidIBAN) {
      setIbanError('Invalid IBAN. Please try again.');
      setSaving(false);
      return;
    }

    await dispatch(
      addIBAN({
        iban,
        firstname: firstName,
        lastname: lastName,
      }),
    );

    setSaving(false);
    safeGoBack(navigation);
  }, [dispatch, firstName, iban, lastName, navigation]);

  const onChangeIBAN = useCallback((value: string) => {
    setIbanError('');
    setIban(value);
  }, []);

  return (
    <KeyboardAwareView offset={{ android: Spacing['x-large'] }}>
      <ScrollView>
        <Stack
          pt={Spacing.large}
          spacing={Spacing.large}
          justify="between"
          flex={1}
        >
          <Stack spacing={Spacing.large}>
            <Input
              autoFocus
              placeholder="ABXXXXXXXX... (required)"
              value={iban}
              onChangeText={onChangeIBAN}
              errorMessage={ibanError}
            />

            <Stack spacing={Spacing.large} direction="row">
              <Box flex={1}>
                <Input
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </Box>

              <Box flex={1}>
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </Box>
            </Stack>
          </Stack>

          <Button loading={saving} onPress={onPress}>
            Save IBAN
          </Button>
        </Stack>
      </ScrollView>
    </KeyboardAwareView>
  );
};

export const AddNew = memo(AddNewComponent);
