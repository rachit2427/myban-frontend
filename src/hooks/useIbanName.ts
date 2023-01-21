import { useCallback, useMemo, useState } from 'react';

/**
 * @param ibanString IBAN string
 * @param masked Is masked by default (defaults to true)
 * @returns `[masked/unmasked IBAN, toggleMasking]`
 */
export const useIBANName = (
  ibanString: string,
  masked = true,
): [string, () => void] => {
  const [isMasked, setIsMasked] = useState(masked);

  const iban = useMemo(() => ibanString, [ibanString]);
  const maskedIBAN = useMemo(() => iban.slice(0, 2) + ' XXXXXX XXXX', [iban]);

  const toggleMasking = useCallback(() => setIsMasked(state => !state), []);

  return [isMasked ? maskedIBAN : iban, toggleMasking];
};
