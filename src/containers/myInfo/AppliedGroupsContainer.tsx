import React, { ReactElement } from 'react';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import MyGroups from '@/components/myInfo/MyGroups';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useInfiniteFetchUserAppliedGroups from '@/hooks/api/group/useInfiniteFetchUserAppliedGroups';

function AppliedGroupsContainer(): ReactElement {
  const { data: user } = useFetchUserProfile({ suspense: true, useErrorBoundary: true });
  const { query, refState } = useInfiniteFetchUserAppliedGroups({
    userUid: user?.uid,
    perPage: 10,
  });

  return (
    <MyGroups
      refState={refState}
      groups={query.data.pages}
      isLoading={query.isFetchingNextPage}
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
