import React, { ReactElement, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import RecruitPosts from '@/components/home/RecruitPosts';
import useFetchGroups from '@/hooks/api/useFetchGroups';

function RecruitPostsContainer(): ReactElement {
  const { query, replace } = useRouter();
  const { data: groups, isLoading, isError } = useFetchGroups();

  useEffect(() => {
    if (query.error === 'unauthenticated') {
      toast.error('해당 페이지를 볼 수 있는 권한이 없어요!');
      replace('/', undefined, { shallow: true });
    }
  }, [query]);

  useEffect(() => {
    if (isError) {
      toast.error('팀 리스트를 불러오는데 실패했어요! 다시 시도해주세요!');
    }
  }, [isError]);

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
