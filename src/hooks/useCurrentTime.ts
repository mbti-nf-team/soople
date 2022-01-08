import { useState } from 'react';
import { useInterval } from 'react-use';

const useCurrentTime = (isCompleted: boolean) => {
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const delay = isCompleted ? null : 1000;

  useInterval(() => setCurrentTime(Date.now()), delay);

  return currentTime;
};

export default useCurrentTime;
