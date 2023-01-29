import { PropsWithChildren, useEffect, useRef } from 'react';

import useBoolean from '@/hooks/useBoolean';

interface Props {
  isVisible: boolean;
  initialRenderState?: boolean;
  delay?: number;
}

function DelayRenderComponent({
  isVisible, delay = 400, initialRenderState = false, children,
}: PropsWithChildren<Props>) {
  const [isRender, onRender, unRender] = useBoolean(initialRenderState);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isVisible) {
      onRender();
    }
  }, [onRender, isVisible]);

  useEffect(() => {
    if (!isVisible) {
      timer.current = setTimeout(() => {
        unRender();
        timer.current = null;
      }, delay);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [unRender, delay, isVisible]);

  if (!isRender) {
    return null;
  }

  return (
    <>{children}</>
  );
}

export default DelayRenderComponent;
