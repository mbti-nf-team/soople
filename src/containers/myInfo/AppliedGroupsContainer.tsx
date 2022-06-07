import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import MyGroups from '@/components/myInfo/MyGroups';
import MyGroupsSkeletonLoader from '@/components/myInfo/MyGroupsSkeletonLoader';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useInfiniteFetchUserAppliedGroups from '@/hooks/api/group/useInfiniteFetchUserAppliedGroups';

function AppliedGroupsContainer(): ReactElement {
  const router = useRouter();
  const { data: user } = useFetchUserProfile();
  const { query, refState } = useInfiniteFetchUserAppliedGroups({
    userUid: user?.uid,
    perPage: 10,
  });

  const onClickGroup = (groupId: string) => router.push(`/detail/${groupId}`);

  if (query.isLoading || query.isIdle) {
    return <MyGroupsSkeletonLoader />;
  }

  return (
    <MyGroups
      onClickGroup={onClickGroup}
      groups={query.data.pages}
      refState={refState}
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
