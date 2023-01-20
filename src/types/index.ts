export interface IBAN {
  iban: string;
  alias: string;
  firstname: string;
  lastname: string;
}

export interface IBANWithID extends IBAN {
  id: string;
}

export type Optional<T> = T | undefined;
