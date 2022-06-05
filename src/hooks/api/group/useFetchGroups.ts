import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';

import { Group } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';
import { getFilteredGroups } from '@/services/api/group';
import { checkEmpty } from '@/utils/utils';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchGroups() {
  const groupsCondition = useRecoilValue(groupsConditionState);

  const query = useQuery<Group[], FirestoreError>(['groups', groupsCondition], () => getFilteredGroups(groupsCondition));

  const {
    isError, error, data, refetch,
  } = query;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '팀 리스트를 불러오는데 실패했어요! 다시 시도해주세요!',
  });

  useEffect(() => {
    refetch();
  }, [groupsCondition]);

  return {
    ...query,
    data: checkEmpty(data),
  };
}

export default useFetchGroups;
