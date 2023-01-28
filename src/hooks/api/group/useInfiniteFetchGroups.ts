import { useMemo } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { InfiniteResponse } from '@/models';
import { Group } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';
import { fetchGroups } from '@/services/api/group';
import { checkEmpty } from '@/utils/utils';

function useInfiniteFetchGroups() {
  const groupsCondition = useRecoilValue(groupsConditionState);

  const query = useInfiniteQuery<InfiniteResponse<Group>, FirestoreError>(['groups', groupsCondition], ({
    pageParam,
  }) => fetchGroups(groupsCondition, {
    perPage: 20,
    lastUid: pageParam as string,
  }), {
    getNextPageParam: ({ lastUid }) => lastUid,
    suspense: true,
    useErrorBoundary: true,
  });

  const { hasNextPage, fetchNextPage } = query;

  const refState = useIntersectionObserver<HTMLDivElement>({
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

export default useInfiniteFetchGroups;
