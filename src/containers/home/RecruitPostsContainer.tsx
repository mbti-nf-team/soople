import React, { ReactElement, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import RecruitPosts from '@/components/home/RecruitPosts';
import useFetchGroups from '@/hooks/api/useFetchGroups';

function RecruitPostsContainer(): ReactElement {
  const { query, replace } = useRouter();
  const { data: groups, isLoading } = useFetchGroups();

  useEffect(() => {
    if (query.error === 'unauthenticated') {
      toast.error('해당 페이지를 볼 수 있는 권한이 없어요!');
      replace('/', undefined, { shallow: true });
    }
  }, [query]);

  if (isLoading) {
    return <>로딩중...</>;
  }

  return (
    <RecruitPosts
      groups={groups}
    />
  );
}

export default RecruitPostsContainer;
