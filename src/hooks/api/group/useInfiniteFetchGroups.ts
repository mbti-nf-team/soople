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

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useInfiniteFetchGroups() {
  const groupsCondition = useRecoilValue(groupsConditionState);

  const query = useInfiniteQuery<InfiniteResponse<Group>, FirestoreError>(['groups', groupsCondition], ({
    pageParam,
  }) => fetchGroups(groupsCondition, {
    perPage: 20,
    lastUid: pageParam,
  }), {
    getNextPageParam: ({ lastUid }) => lastUid,
    suspense: true,
  });

  const {
    isError, error, hasNextPage, fetchNextPage,
  } = query;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '팀 리스트를 불러오는데 실패했어요! 다시 시도해주세요!',
  });

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
