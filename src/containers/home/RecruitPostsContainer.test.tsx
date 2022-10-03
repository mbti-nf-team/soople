import { useRouter } from 'next/router';

import { fireEvent, render, screen } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchGroups from '@/hooks/api/group/useFetchGroups';
import { signInModalVisibleState } from '@/recoil/modal/atom';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';
import RecoilObserver from '@/test/RecoilObserver';
import { errorToast } from '@/utils/toast';

import GROUP_FIXTURE from '../../../fixtures/group';
import FIXTURE_PROFILE from '../../../fixtures/profile';

import RecruitPostsContainer from './RecruitPostsContainer';

jest.mock('@/hooks/api/group/useFetchGroups');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/utils/toast');

describe('RecruitPostsContainer', () => {
  const mockPush = jest.fn();
  const handleSignInModalVisible = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: given.user,
    }));

    (useFetchGroups as jest.Mock).mockImplementation(() => ({
      data: given.groups,
      isLoading: given.isLoading,
    }));

    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        error: given.error,
      },
      replace: jest.fn(),
      push: mockPush,
    }));
  });

  const renderRecruitPostsContainer = () => render((
    <InjectTestingRecoilState>
      <>
        <RecoilObserver node={signInModalVisibleState} onChange={handleSignInModalVisible} />
        <RecruitPostsContainer />
      </>
    </InjectTestingRecoilState>
  ));

  context('로딩중인 경우', () => {
    given('isLoading', () => true);
    given('groups', () => []);

    it('로딩 스켈레톤이 나타나야만 한다', () => {
      renderRecruitPostsContainer();

      expect(screen.getByTitle('loading...')).toBeInTheDocument();
    });
  });

  describe('신청현황 페이지에서 권한이 없어서 Redirect여부에 따라 메시지가 보인다', () => {
    given('groups', () => []);

    context('query에 error가 "unauthenticated"인 경우', () => {
      given('error', () => ('unauthenticated'));

      it('errorToast가 호출되어야만 한다', () => {
        renderRecruitPostsContainer();

        expect(errorToast).toBeCalledWith('접근 권한이 없는 페이지에요.');
      });
    });
  });

  context('그룹 리스트가 존재하지 않는 경우', () => {
    given('groups', () => []);

    it('"모집 중인 팀이 없어요." 문구가 나타나야만 한다', () => {
      const { container } = renderRecruitPostsContainer();

      expect(container).toHaveTextContent('모집 중인 팀이 없어요.');
    });

    context('user가 존재하는 경우', () => {
      given('user', () => FIXTURE_PROFILE);

      describe('"팀 모집하기" 버튼을 클릭한다', () => {
        it('push가 "/write"와 함께 호출되어야만 한다', () => {
          renderRecruitPostsContainer();

          fireEvent.click(screen.getByText('팀 모집하기'));

          expect(mockPush).toBeCalledWith('/write');
        });
      });
    });

    context('user가 존재하는 경우', () => {
      given('user', () => null);

      describe('"팀 모집하기" 버튼을 클릭한다', () => {
        it('signInModalVisible 액션이 발생해야만 한다', () => {
          renderRecruitPostsContainer();

          fireEvent.click(screen.getByText('팀 모집하기'));

          expect(handleSignInModalVisible).toBeCalledWith(true);
        });
      });
    });
  });

  context('그룹 리스트가 존재하는 경우', () => {
    given('groups', () => [GROUP_FIXTURE]);

    it('그룹 리스트가 보여야만 한다', () => {
      const { container } = renderRecruitPostsContainer();

      expect(container).toHaveTextContent('title');
    });
  });
});
