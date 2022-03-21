import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import MyGroups from '@/components/myInfo/MyGroups';
import MyGroupsSkeletonLoader from '@/components/myInfo/MyGroupsSkeletonLoader';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchUserAppliedGroups from '@/hooks/api/group/useFetchUserAppliedGroups';

function AppliedGroupsContainer(): ReactElement {
  const router = useRouter();
  const { data: user } = useFetchUserProfile();
  const { data: groups, isLoading, isIdle } = useFetchUserAppliedGroups(user?.uid);

  const onClickGroup = (groupId: string) => router.push(`/detail/${groupId}`);

  if (isLoading || isIdle) {
    return <MyGroupsSkeletonLoader />;
  }

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
