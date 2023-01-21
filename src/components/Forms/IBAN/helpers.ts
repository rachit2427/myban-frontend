import IBAN from 'iban';

export const validateFormData = (iban: string) => IBAN.isValid(iban);
