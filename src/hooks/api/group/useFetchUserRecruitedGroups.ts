import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { Group } from '@/models/group';
import { getUserRecruitedGroups } from '@/services/api/group';

import useCatchErrorWithToast from '../useCatchErrorWithToast';

function useFetchUserRecruitedGroups(userUid?: string) {
  const query = useQuery<Group[], FirestoreError>(['recruitedGroups', userUid], () => getUserRecruitedGroups(userUid as string), {
    enabled: !!userUid,
  });

  const { error, isError, data } = query;

  useCatchErrorWithToast({
    error,
    isError,
    defaultErrorMessage: '모집한 팀을 불러오는데 실패했어요!',
  });

  return {
    ...query,
    data: data ?? [],
  };
}

export default useFetchUserRecruitedGroups;
