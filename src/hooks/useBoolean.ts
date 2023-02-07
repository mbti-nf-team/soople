import { useCallback, useState } from 'react';

function useBoolean(
  initialValue = false,
): [boolean, () => void, () => void, (nextValue?: boolean) => void] {
  const [state, setState] = useState(initialValue);

  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);
  const onToggle = useCallback(() => setState((prevState) => !prevState), []);

  return [state, setTrue, setFalse, onToggle];
}

export default useBoolean;
