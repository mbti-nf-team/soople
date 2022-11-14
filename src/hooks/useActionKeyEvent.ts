import { KeyboardEvent, KeyboardEventHandler, useCallback } from 'react';

// NOTE: keyboard event code - https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
function useActionKeyEvent<T = Element>(
  targetKeys: string | string[],
  callback?: (event: KeyboardEvent<T>) => void,
): KeyboardEventHandler<T> {
  const onKeyEvent: KeyboardEventHandler<T> = useCallback((event: KeyboardEvent<T>) => {
    const isArray = Array.isArray(targetKeys);
    const isMultipleKeyEvent = isArray && (
      targetKeys.includes(event.code) || targetKeys.includes(event.key)
    );

    const isKeyEvent = !isArray && (event.code === targetKeys || event.key === targetKeys);

    if (isMultipleKeyEvent || isKeyEvent) {
      callback?.(event);
    }
  }, [targetKeys, callback]);

  return onKeyEvent;
}

export default useActionKeyEvent;
