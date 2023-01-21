import type { RefObject } from 'react';
import React, { useCallback, useRef, useState } from 'react';
import { Pressable } from 'react-native';
import type { TextInput } from 'react-native/types';

import { Button } from '@src/components/Button';
import { validateFormData } from '@src/components/Forms/IBAN/helpers';
import type {
  IBANFormItemState,
  IBANFormState,
} from '@src/components/Forms/IBAN/IBANFormProvider';
import { useIBANFormContext } from '@src/components/Forms/IBAN/IBANFormProvider';
import { Icon } from '@src/components/Icon';
import { Input } from '@src/components/Input';
import { Box } from '@src/components/Layout/Box';
import { Stack } from '@src/components/Layout/Stack';
import { useTheme } from '@src/hooks/useTheme';
import { Spacing } from '@src/utils/Spacing';

interface Props {
  onPressSave?: (s: IBANFormState) => void;
  postSave?: () => void;
}

export const IBANForm: React.FC<Props> = ({ onPressSave, postSave }) => {
  const formState = useIBANFormContext();

  const [saving, setSaving] = useState(false);

  const [iban, setIban] = useState(formState.iban);
  const [alias, setAlias] = useState(formState.alias);
  const [firstname, setFirstname] = useState(formState.firstname);
  const [lastname, setLastname] = useState(formState.lastname);

  const [ibanError, setIbanError] = useState('');

  const ibanRef = useRef<TextInput>(null);
  const aliasRef = useRef<TextInput>(null);
  const firstnameRef = useRef<TextInput>(null);
  const lastnameRef = useRef<TextInput>(null);

  const onChangeText = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<IBANFormItemState>>,
      str: string,
    ) => setter(state => ({ ...state, value: str })),
    [],
  );

  const onChangeIBAN = useCallback(
    (value: string) => {
      setIbanError('');

      onChangeText(setIban, value);
    },
    [onChangeText],
  );

  const onPressEdit = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<IBANFormItemState>>,
      ref?: RefObject<TextInput>,
    ) => {
      setter(state => ({ ...state, disabled: false }));

      ref?.current?.focus ? setTimeout(() => ref.current?.focus(), 0) : null;
    },
    [],
  );

  const onPress = useCallback(async () => {
    setSaving(true);
    const isValidIBAN = await validateFormData(iban.value);

    if (!isValidIBAN) {
      setIbanError('Invalid IBAN. Please try again.');
      setSaving(false);
      return;
    }

    await onPressSave?.({
      iban,
      alias,
      firstname: lastname,
      lastname: firstname,
    });

    setSaving(false);
    postSave?.();
  }, [alias, lastname, iban, firstname, onPressSave, postSave]);

  return (
    <Stack
      pt={Spacing.large}
      spacing={Spacing.large}
      justify="between"
      flex={1}
    >
      <Stack divider={<Divider />}>
        <Input
          autoFocus
          placeholder="ABXXXXXXXX... (required)"
          value={iban.value}
          editable={!iban.disabled}
          onChangeText={onChangeIBAN}
          errorMessage={ibanError}
          accessoryRight={
            iban.disabled ? (
              <AccessoryRight onPress={() => onPressEdit(setIban, ibanRef)} />
            ) : undefined
          }
          ref={ibanRef}
          returnKeyType="next"
          onSubmitEditing={() => aliasRef.current?.focus()}
        />

        <Input
          placeholder="Alias"
          value={alias.value}
          editable={!alias.disabled}
          onChangeText={val => onChangeText(setAlias, val)}
          accessoryRight={
            alias.disabled ? (
              <AccessoryRight onPress={() => onPressEdit(setAlias, aliasRef)} />
            ) : undefined
          }
          ref={aliasRef}
          returnKeyType="next"
          onSubmitEditing={() => firstnameRef.current?.focus()}
        />

        <Stack spacing={Spacing.large} direction="row">
          <Box flex={1}>
            <Input
              placeholder="First Name"
              value={firstname.value}
              editable={!firstname.disabled}
              onChangeText={val => onChangeText(setFirstname, val)}
              accessoryRight={
                firstname.disabled ? (
                  <AccessoryRight
                    onPress={() => onPressEdit(setFirstname, firstnameRef)}
                  />
                ) : undefined
              }
              ref={firstnameRef}
              returnKeyType="next"
              onSubmitEditing={() => lastnameRef.current?.focus()}
              autoComplete="name-given"
            />
          </Box>

          <Box flex={1}>
            <Input
              placeholder="Last Name"
              value={lastname.value}
              editable={!lastname.disabled}
              onChangeText={val => onChangeText(setLastname, val)}
              accessoryRight={
                lastname.disabled ? (
                  <AccessoryRight
                    onPress={() => onPressEdit(setLastname, lastnameRef)}
                  />
                ) : undefined
              }
              ref={lastnameRef}
              returnKeyType="go"
              onSubmitEditing={onPress}
              autoComplete="name-family"
            />
          </Box>
        </Stack>
      </Stack>

      <Button loading={saving} onPress={onPress}>
        Save IBAN
      </Button>
    </Stack>
  );
};

const Divider = () => <Box mb={Spacing.large} />;

const AccessoryRight: React.FC<{ onPress?: () => void }> = ({ onPress }) => {
  const { colors: themeColors } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <Box
        ph={Spacing.small}
        bg={themeColors.shade300}
        flex={1}
        justify="center"
      >
        <Icon name="EditNote" onPress={onPress} />
      </Box>
    </Pressable>
  );
};
