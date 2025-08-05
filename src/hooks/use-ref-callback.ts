import { useCallback, useRef } from 'react';

export function useRefCallback(callback: (...args: any) => any) {
  const ref = useRef(callback);
  ref.current = callback;
  const fn = useCallback((...args: any) => {
    return ref.current(...args);
  }, []);
  return fn;
}
