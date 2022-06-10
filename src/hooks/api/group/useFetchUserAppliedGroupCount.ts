import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { getUserAppliedGroupCount } from '@/services/api/applicants';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchUserAppliedGroupCount(userUid?: string) {
  const query = useQuery<number, FirestoreError>(['appliedGroupCount', userUid], () => getUserAppliedGroupCount(userUid as string), {
    enabled: !!userUid,
  });

  const { error, isError } = query;

  useCatchFirestoreErrorWithToast({
    error,
    isError,
    defaultErrorMessage: '신청한 팀을 불러오는데 실패했어요!',
  });

  return query;
}

export default useFetchUserAppliedGroupCount;
