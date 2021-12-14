import { useState } from 'react';
import { useInterval } from 'react-use';

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  useInterval(() => setCurrentTime(Date.now()), 1000);

  return currentTime;
};

export default useCurrentTime;
