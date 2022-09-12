import { KeyboardEvent, KeyboardEventHandler, useCallback } from 'react';

// NOTE: keyboard event code - https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values
function useActionKeyEvent<T = Element>(
  targetKey?: string,
  callback?: () => void,
): KeyboardEventHandler<T> {
  const onKeyEvent: KeyboardEventHandler<T> = useCallback((e: KeyboardEvent<T>) => {
    if (e.code === targetKey) {
      callback?.();
    }
  }, [targetKey, callback]);

  return onKeyEvent;
}

export default useActionKeyEvent;
