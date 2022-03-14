import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { GroupQuery } from '@/models';
import { Comment } from '@/models/group';
import { getGroupComments } from '@/services/api/comment';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchComments() {
  const router = useRouter();

  const { id } = router.query as GroupQuery;

  const query = useQuery<Comment[], FirestoreError>(['comments', id], () => getGroupComments(id), {
    enabled: !!id,
  });

  const { isError, error, data } = query;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '해당 글의 댓글을 불러오는데 실패하였습니다.',
  });

  return {
    ...query,
    data: data ?? [],
  };
}

export default useFetchComments;
