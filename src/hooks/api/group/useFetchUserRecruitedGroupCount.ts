import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { getUserRecruitedGroupCount } from '@/services/api/group';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchUserRecruitedGroupCount(userUid?: string) {
  const query = useQuery<number, FirestoreError>(['recruitedGroupCount', userUid], () => getUserRecruitedGroupCount(userUid as string), {
    enabled: !!userUid,
  });

  const { error, isError } = query;

  useCatchFirestoreErrorWithToast({
    error,
    isError,
    defaultErrorMessage: '모집한 팀을 불러오는데 실패했어요!',
  });

  return query;
}

export default useFetchUserRecruitedGroupCount;
