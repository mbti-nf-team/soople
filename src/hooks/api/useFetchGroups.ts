import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';

import { Group } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';
import { getFilteredGroups } from '@/services/api/group';

import useCatchErrorWithToast from '../useCatchErrorWithToast';

function useFetchGroups() {
  const groupsCondition = useRecoilValue(groupsConditionState);

  const query = useQuery<Group[], FirestoreError>(['groups', groupsCondition], () => getFilteredGroups(groupsCondition));

  const {
    isError, error, data, refetch,
  } = query;

  useCatchErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '팀 리스트를 불러오는데 실패했어요! 다시 시도해주세요!',
  });

  useEffect(() => {
    refetch();
  }, [groupsCondition]);

  return {
    ...query,
    data: data ?? [],
  };
}

export default useFetchGroups;
