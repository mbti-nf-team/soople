import { useEffect, useRef } from 'react';

import { checkNumNull } from '@/utils/utils';

import useBoolean from './useBoolean';

function useDelayVisible(isVisible: boolean, delay?: number) {
  const [isOpen, onOpen, onClose] = useBoolean(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isVisible) {
      onOpen();
    }
  }, [onOpen, isVisible]);

  useEffect(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        onClose();
        timer.current = null;
      }, checkNumNull(delay));
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [onClose, delay]);

  return isOpen;
}

export default useDelayVisible;
