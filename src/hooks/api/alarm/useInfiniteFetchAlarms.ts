import { useMemo } from 'react';

import { checkEmpty } from '@nf-team/core';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { InfiniteResponse } from '@/models';
import { Alarm } from '@/models/alarm';
import { getUserAlarms } from '@/services/api/alarm';

function useInfiniteFetchAlarms({ userUid }: { userUid?: string }) {
  const query = useInfiniteQuery<InfiniteResponse<Alarm>, FirestoreError>(['alarms'], ({
    pageParam,
  }) => getUserAlarms(userUid as string, {
    perPage: 15,
    lastUid: pageParam as string,
  }), {
    getNextPageParam: ({ lastUid }) => lastUid,
    enabled: !!userUid,
    suspense: true,
    useErrorBoundary: true,
  });

  const { hasNextPage, fetchNextPage } = query;

  const refState = useIntersectionObserver<HTMLAnchorElement>({
    intersectionOptions: {
      rootMargin: '20px',
    },
    isRoot: true,
    fetchNextPage,
    hasNextPage,
  });

  return useMemo(() => ({
    query: {
      ...query,
      data: {
        ...query.data,
        pages: checkEmpty(query.data?.pages),
      },
    },
    refState,
  }), [query, refState]);
}

export default useInfiniteFetchAlarms;
