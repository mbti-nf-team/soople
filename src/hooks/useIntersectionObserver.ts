import { useEffect, useMemo, useRef } from 'react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

import { targetFalseThenValue } from '@/utils/utils';

interface UseIntersectionObserverProps {
  intersectionOptions?: IntersectionOptions;
  isRoot?: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
}

function useIntersectionObserver({
  intersectionOptions, isRoot, hasNextPage, fetchNextPage,
}: UseIntersectionObserverProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const checkRoot = targetFalseThenValue(isRoot);

  const { ref, inView } = useInView({
    ...intersectionOptions,
    root: checkRoot(wrapperRef.current),
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return useMemo(() => ({
    lastItemRef: ref,
    wrapperRef: checkRoot(wrapperRef),
  }), [ref, wrapperRef]);
}

export default useIntersectionObserver;
