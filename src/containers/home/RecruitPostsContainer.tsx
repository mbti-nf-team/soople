import React, { ReactElement, useEffect } from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import RecruitPosts from '@/components/home/RecruitPosts';
import useFetchGroups from '@/hooks/api/group/useFetchGroups';
import { errorToast } from '@/utils/toast';

function RecruitPostsContainer(): ReactElement {
  const { query, replace } = useRouter();
  const { data: groups, isLoading } = useFetchGroups();

  useEffect(() => {
    if (query.error === 'unauthenticated') {
      errorToast('접근 권한이 없는 페이지에요.');
      replace('/', undefined, { shallow: true });
    }
  }, [query]);

  if (isLoading) {
    return <>로딩중...</>;
  }

  return (
    <RecruitPostsWrapper>
      <RecruitPosts
        groups={groups}
      />
    </RecruitPostsWrapper>
  );
}

export default RecruitPostsContainer;

const RecruitPostsWrapper = styled.main`
  flex: 1 1 0%;
  margin-bottom: 3rem;
`;
