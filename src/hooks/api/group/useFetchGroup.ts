import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { GroupQuery } from '@/models';
import { Group } from '@/models/group';
import { getGroupDetail } from '@/services/api/group';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchGroup() {
  const router = useRouter();

  const { id } = router.query as GroupQuery;

  const query = useQuery<Group | null, FirestoreError>(['group', id], () => getGroupDetail(id), {
    enabled: !!id,
  });

  const { isError, error, data } = query;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '해당 팀 상세글을 조회하는데 실패했어요!',
  });

  return {
    ...query,
    // NOTE - SSR 사용
    data: data as Group,
  };
}

export default useFetchGroup;
