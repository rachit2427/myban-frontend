import type { PropsWithChildren } from 'react';
import React, { createContext, useContext } from 'react';

interface FormItemState {
  value: string;
  disabled?: boolean;
}

interface FormState {
  iban: FormItemState;
  alias: FormItemState;
  firstname: FormItemState;
  lastname: FormItemState;
}

export type IBANFormState = FormState;
export type IBANFormItemState = FormItemState;

const defaultState: FormState = {
  iban: { value: '' },
  alias: { value: '' },
  firstname: { value: '' },
  lastname: { value: '' },
};

const IBANFormContext = createContext<FormState>(defaultState);

interface ProviderProps {
  value?: FormState;
}

export const IBANFormProvider: React.FC<PropsWithChildren<ProviderProps>> = ({
  value = defaultState,
  children,
}) => {
  return (
    <IBANFormContext.Provider value={value}>
      {children}
    </IBANFormContext.Provider>
  );
};

export const useIBANFormContext = () => useContext(IBANFormContext);
