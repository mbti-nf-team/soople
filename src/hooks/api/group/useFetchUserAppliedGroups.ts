import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { Group } from '@/models/group';
import { getUserAppliedGroups } from '@/services/api/applicants';
import { checkEmpty } from '@/utils/utils';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchUserAppliedGroups(userUid?: string) {
  const query = useQuery<Group[], FirestoreError>(['appliedGroups', userUid], () => getUserAppliedGroups(userUid as string), {
    enabled: !!userUid,
  });

  const { error, isError, data } = query;

  useCatchFirestoreErrorWithToast({
    error,
    isError,
    defaultErrorMessage: '신청한 팀을 불러오는데 실패했어요!',
  });

  return {
    ...query,
    data: checkEmpty(data),
  };
}

export default useFetchUserAppliedGroups;
