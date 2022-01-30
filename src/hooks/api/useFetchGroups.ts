import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';

import { Group } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';
import { getFilteredGroups } from '@/services/api/group';

function useFetchGroups() {
  const groupsCondition = useRecoilValue(groupsConditionState);

  const query = useQuery<Group[], FirestoreError>(['groups', groupsCondition], () => getFilteredGroups(groupsCondition));

  useEffect(() => {
    query.refetch();
  }, [groupsCondition]);

  return {
    ...query,
    data: query?.data ?? [],
  };
}

export default useFetchGroups;
