import { useMemo } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { InfiniteRequest, InfiniteResponse } from '@/models';
import { Group } from '@/models/group';
import { getUserRecruitedGroups } from '@/services/api/group';
import { checkEmpty } from '@/utils/utils';

interface UserRecruitedGroupsRequest extends InfiniteRequest {
  userUid?: string;
}

function useInfiniteFetchUserRecruitedGroups({ userUid, perPage }: UserRecruitedGroupsRequest) {
  const query = useInfiniteQuery<InfiniteResponse<Group>, FirestoreError>(
    ['recruitedGroups', { userUid, perPage }],
    ({ pageParam }) => getUserRecruitedGroups(userUid as string, {
      perPage,
      lastUid: pageParam as string,
    }),
    {
      getNextPageParam: ({ lastUid }) => lastUid,
      enabled: !!userUid && !!perPage,
      suspense: true,
      useErrorBoundary: true,
    },
  );

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

export default useInfiniteFetchUserRecruitedGroups;
