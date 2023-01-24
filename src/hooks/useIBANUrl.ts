import { useMemo } from 'react';

import { BASE_URL } from '@env';

import type { IBAN } from '@src/types';

type UseIBANUrlProps = Partial<Pick<IBAN, 'iban' | 'firstname' | 'lastname'>> &
  Required<Pick<IBAN, 'iban'>>;

export const useIBANUrl = ({ iban, firstname, lastname }: UseIBANUrlProps) => {
  return useMemo(() => {
    const baseUrl = BASE_URL + '/view';

    const params = Object.fromEntries(
      Object.entries({
        i: iban,
        fn: firstname,
        ln: lastname,
      }).filter(([_, v]) => v),
    ) as Record<string, string>;

    const searchParams = new URLSearchParams(params);

    const fullUrl = `${baseUrl}?${searchParams.toString()}`;

    return {
      baseUrl,
      searchParams: params,
      fullUrl,
    };
  }, [firstname, iban, lastname]);
};
