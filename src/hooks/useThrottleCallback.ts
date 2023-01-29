import { useCallback, useRef } from 'react';

function useThrottleCallback<U extends never[]>(
  callback: (...args: U) => void,
  delay: number,
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttledCallback = useCallback((...args: U) => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        callback(...args);
        timer.current = null;
      }, delay);
    }
  }, [callback, delay]);

  return throttledCallback;
}

export default useThrottleCallback;
