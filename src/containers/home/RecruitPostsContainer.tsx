import { ReactElement, Suspense, useCallback } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { ClientOnly } from '@nft-team/react';
import { useSetRecoilState } from 'recoil';

import ErrorBoundary from '@/components/common/errorBoundary/ErrorBoundary';
import RecruitPostsSkeletonLoader from '@/components/home/RecruitPostsSkeletonLoader';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useRenderErrorToast from '@/hooks/useRenderErrorToast';
import { signInModalVisibleState } from '@/recoil/modal/atom';

const RecruitPosts = dynamic(() => import('@/components/home/RecruitPosts'), { ssr: true });

function RecruitPostsContainer(): ReactElement | null {
  const { push } = useRouter();
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

  return (
    <ClientOnly>
      <RecruitPostsWrapper>
        <ErrorBoundary>
          <Suspense fallback={<RecruitPostsSkeletonLoader length={12} />}>
            <RecruitPosts
              onClickEmptyButton={onClickEmptyButton}
            />
          </Suspense>
        </ErrorBoundary>
      </RecruitPostsWrapper>
    </ClientOnly>
  );
}

export default RecruitPostsContainer;

const RecruitPostsWrapper = styled.main`
  flex: 1 1 0%;
  margin-bottom: 3rem;
`;
