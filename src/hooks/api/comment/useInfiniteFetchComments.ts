import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { useInfiniteQuery } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { GroupQuery, InfiniteRequest, InfiniteResponse } from '@/models';
import { Comment } from '@/models/group';
import { getGroupComments } from '@/services/api/comment';
import { checkEmpty } from '@/utils/utils';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useInfiniteFetchComments({ perPage }: InfiniteRequest) {
  const router = useRouter();

  const { id } = router.query as GroupQuery;

  const query = useInfiniteQuery<InfiniteResponse<Comment>, FirestoreError>(
    ['comments', { id, perPage }],
    ({ pageParam }) => getGroupComments(id, {
      perPage,
      lastUid: pageParam,
    }),
    {
      getNextPageParam: ({ lastUid }) => lastUid,
      enabled: !!id && !!perPage,
      suspense: true,
    },
  );

  const {
    isError, error, hasNextPage, fetchNextPage,
  } = query;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '해당 글의 댓글을 불러오는데 실패하였습니다.',
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

export default useInfiniteFetchComments;
