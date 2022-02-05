import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import MyGroups from '@/components/myInfo/MyGroups';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useFetchUserAppliedGroups from '@/hooks/api/group/useFetchUserAppliedGroups';
import { DetailLayout } from '@/styles/Layout';

function AppliedGroupsContainer(): ReactElement {
  const router = useRouter();
  const { data: user } = useGetUser();
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
