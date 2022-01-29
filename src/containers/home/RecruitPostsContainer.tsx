import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffectOnce } from 'react-use';

import { useRouter } from 'next/router';

import RecruitPosts from '@/components/home/RecruitPosts';
import { loadGroups } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getGroup } from '@/utils/utils';

function RecruitPostsContainer(): ReactElement {
  const { query, replace } = useRouter();
  const dispatch = useAppDispatch();
  const groups = useSelector(getGroup('groups'));

  useEffectOnce(() => dispatch(loadGroups({
    category: ['study', 'project'],
    isFilterCompleted: false,
  })));

  useEffect(() => {
    if (query.error === 'unauthenticated') {
      toast.error('해당 페이지를 볼 수 있는 권한이 없어요!');
      replace('/', undefined, { shallow: true });
    }
  }, [query]);

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
