import { useMemo } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { InfiniteRequest, InfiniteResponse } from '@/models';
import { Group } from '@/models/group';
import { getUserRecruitedGroups } from '@/services/api/group';
import { checkEmpty } from '@/utils/utils';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

interface UserRecruitedGroupsRequest extends InfiniteRequest {
  userUid?: string;
}

function useInfiniteFetchUserRecruitedGroups({ userUid, perPage }: UserRecruitedGroupsRequest) {
  const query = useInfiniteQuery<InfiniteResponse<Group>, FirestoreError>(
    ['recruitedGroups', { userUid, perPage }],
    ({ pageParam }) => getUserRecruitedGroups(userUid as string, {
      perPage,
      lastUid: pageParam,
    }),
    {
      getNextPageParam: ({ lastUid }) => lastUid,
      enabled: !!userUid && !!perPage,
      suspense: true,
    },
  );

  const {
    error, isError, hasNextPage, fetchNextPage,
  } = query;

  useCatchFirestoreErrorWithToast({
    error,
    isError,
    defaultErrorMessage: '모집한 팀을 불러오는데 실패했어요!',
  });

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
