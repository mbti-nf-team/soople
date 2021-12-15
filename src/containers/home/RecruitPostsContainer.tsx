import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import RecruitPosts from '@/components/home/RecruitPosts';
import { loadGroups } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getGroup } from '@/utils/utils';

function RecruitPostsContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const groups = useSelector(getGroup('groups'));

  useEffect(() => {
    dispatch(loadGroups());
  }, []);

  if (!groups || !groups.length) {
    return <div>로딩중...</div>;
  }

  return (
    <RecruitPosts
      groups={groups}
    />
  );
}

export default RecruitPostsContainer;
