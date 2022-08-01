import { useQuery } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import { getGroupCommentCount } from '@/services/api/comment';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchCommentCount(groupId?: string) {
  const query = useQuery<number, FirestoreError>(['commentCount', groupId], () => getGroupCommentCount(groupId as string), {
    enabled: !!groupId,
  });

  const { error, isError } = query;

  useCatchFirestoreErrorWithToast({
    error,
    isError,
    defaultErrorMessage: '댓글의 개수를 불러오는데 실패했어요!',
  });

  return query;
}

export default useFetchCommentCount;
