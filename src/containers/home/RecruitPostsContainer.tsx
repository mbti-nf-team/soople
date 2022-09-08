import React, { ReactElement, useCallback } from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import RecruitPosts from '@/components/home/RecruitPosts';
import RecruitPostsSkeletonLoader from '@/components/home/RecruitPostsSkeletonLoader';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchGroups from '@/hooks/api/group/useFetchGroups';
import useRenderErrorToast from '@/hooks/useRenderErrorToast';
import { signInModalVisibleState } from '@/recoil/modal/atom';

function RecruitPostsContainer(): ReactElement {
  const { push } = useRouter();
  const { data: groups, isLoading } = useFetchGroups();
  const { data: user } = useFetchUserProfile();
  const setSignInModalVisible = useSetRecoilState(signInModalVisibleState);

  useRenderErrorToast({
    errorStatus: 'unauthenticated',
    errorMessage: '접근 권한이 없는 페이지에요.',
    replaceUrl: '/',
  });

  const onClickEmptyButton = useCallback(() => {
    if (user) {
      push('/write');
      return;
    }

    setSignInModalVisible(true);
  }, [user]);

  if (isLoading) {
    return (
      <RecruitPostsWrapper>
        <RecruitPostsSkeletonLoader />
      </RecruitPostsWrapper>
    );
  }

  return (
    <RecruitPostsWrapper>
      <RecruitPosts
        groups={groups}
        onClickEmptyButton={onClickEmptyButton}
      />
    </RecruitPostsWrapper>
  );
}

export default RecruitPostsContainer;

const RecruitPostsWrapper = styled.main`
  flex: 1 1 0%;
  margin-bottom: 3rem;
`;
