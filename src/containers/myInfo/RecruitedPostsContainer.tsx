import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import RecruitedPosts from '@/components/myInfo/RecruitedPosts';
import { loadUserRecruitedGroups } from '@/reducers/myInfoSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth, getMyInfo } from '@/utils/utils';

function RecruitedPostsContainer(): ReactElement {
  const router = useRouter();
  const user = useSelector(getAuth('user'));
  const groups = useSelector(getMyInfo('recruitedGroups'));
  const dispatch = useAppDispatch();

  const onClickGroup = (groupId: string) => router.push(`/detail/${groupId}`);

  useEffect(() => {
    if (user) {
      dispatch(loadUserRecruitedGroups(user.uid));
    }
  }, [user]);

  return (
    <RecruitedPosts
      onClickGroup={onClickGroup}
      groups={groups}
    />
  );
}

export default RecruitedPostsContainer;
