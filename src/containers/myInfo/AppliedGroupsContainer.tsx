import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import MyGroups from '@/components/myInfo/MyGroups';
import { loadUserAppliedGroups } from '@/reducers/myInfoSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth, getMyInfo } from '@/utils/utils';

function AppliedGroupsContainer(): ReactElement {
  const router = useRouter();
  const user = useSelector(getAuth('user'));
  const groups = useSelector(getMyInfo('appliedGroups'));
  const dispatch = useAppDispatch();

  const onClickGroup = (groupId: string) => router.push(`/detail/${groupId}`);

  useEffect(() => {
    if (user) {
      dispatch(loadUserAppliedGroups(user.uid));
    }
  }, [user]);

  return (
    <MyGroups
      onClickGroup={onClickGroup}
      groups={groups}
    >
      <EmptyStateArea
        emptyText="신청한 팀이 없어요."
        buttonText="팀 살펴보기"
        href="/"
        marginTop="80px"
      />
    </MyGroups>
  );
}

export default AppliedGroupsContainer;
