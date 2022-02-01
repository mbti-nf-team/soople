import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import MyGroups from '@/components/myInfo/MyGroups';
import useFetchUserAppliedGroups from '@/hooks/api/group/useFetchUserAppliedGroups';
import { DetailLayout } from '@/styles/Layout';
import { getAuth } from '@/utils/utils';

function AppliedGroupsContainer(): ReactElement {
  const router = useRouter();
  const user = useSelector(getAuth('user'));
  const { data: groups, isLoading } = useFetchUserAppliedGroups(user?.uid);

  const onClickGroup = (groupId: string) => router.push(`/detail/${groupId}`);

  if (isLoading) {
    return <DetailLayout>로딩중...</DetailLayout>;
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
