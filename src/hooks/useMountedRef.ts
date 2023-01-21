import { useRef } from 'react';

import { useMount } from '@src/hooks/useMount';

export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useMount(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
