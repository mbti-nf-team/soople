import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { Group } from '@/models/group';
import { getUserRecruitedGroups } from '@/services/api/group';
import { checkEmpty } from '@/utils/utils';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchUserRecruitedGroups(userUid?: string) {
  const query = useQuery<Group[], FirestoreError>(['recruitedGroups', userUid], () => getUserRecruitedGroups(userUid as string), {
    enabled: !!userUid,
  });

  const { error, isError, data } = query;

  useCatchFirestoreErrorWithToast({
    error,
    isError,
    defaultErrorMessage: '모집한 팀을 불러오는데 실패했어요!',
  });

  return {
    ...query,
    data: checkEmpty(data),
  };
}

export default useFetchUserRecruitedGroups;
