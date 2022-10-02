import React, { ReactElement } from 'react';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import MyGroups from '@/components/myInfo/MyGroups';
import MyGroupsSkeletonLoader from '@/components/myInfo/MyGroupsSkeletonLoader';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useInfiniteFetchUserRecruitedGroups from '@/hooks/api/group/useInfiniteFetchUserRecruitedGroups';

function RecruitedGroupsContainer(): ReactElement {
  const { data: user } = useFetchUserProfile();
  const { query, refState } = useInfiniteFetchUserRecruitedGroups({
    userUid: user?.uid,
    perPage: 10,
  });

  if (query.isLoading && ['fetching', 'idle'].includes(query.fetchStatus)) {
    return <MyGroupsSkeletonLoader />;
  }

  return (
    <MyGroups
      refState={refState}
      groups={query.data.pages}
      isLoading={query.isFetchingNextPage}
    >
      <EmptyStateArea
        emptyText="모집한 팀이 없어요."
        buttonText="팀 모집하기"
        href="/"
        marginTop="80px"
      />
    </MyGroups>
  );
}

export default RecruitedGroupsContainer;
