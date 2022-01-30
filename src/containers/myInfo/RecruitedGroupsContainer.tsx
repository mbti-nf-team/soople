import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import MyGroups from '@/components/myInfo/MyGroups';
import useFetchUserRecruitedGroups from '@/hooks/api/useFetchUserRecruitedGroups';
import { DetailLayout } from '@/styles/Layout';
import { getAuth } from '@/utils/utils';

function RecruitedGroupsContainer(): ReactElement {
  const router = useRouter();
  const user = useSelector(getAuth('user'));
  const { data: groups, isLoading } = useFetchUserRecruitedGroups(user?.uid);

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
        emptyText="모집한 팀이 없어요."
        buttonText="팀 모집하기"
        href="/"
        marginTop="80px"
      />
    </MyGroups>
  );
}

export default RecruitedGroupsContainer;
