import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import useFetchGroups from '@/hooks/api/group/useFetchGroups';
import { errorToast } from '@/utils/toast';

import GROUP_FIXTURE from '../../../fixtures/group';

import RecruitPostsContainer from './RecruitPostsContainer';

jest.mock('@/hooks/api/group/useFetchGroups');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/utils/toast');

describe('RecruitPostsContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchGroups as jest.Mock).mockImplementation(() => ({
      data: [GROUP_FIXTURE],
      isLoading: given.isLoading,
    }));
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        error: given.error,
      },
      replace: jest.fn(),
    }));
  });

  const renderRecruitPostsContainer = () => render((
    <RecruitPostsContainer />
  ));

  context('로딩중인 경우', () => {
    given('isLoading', () => true);

    it('로딩 스켈레톤이 나타나야만 한다', () => {
      renderRecruitPostsContainer();

      expect(screen.getByTitle('loading...')).toBeInTheDocument();
    });
  });

  describe('신청현황 페이지에서 권한이 없어서 Redirect여부에 따라 메시지가 보인다', () => {
    context('query에 error가 "unauthenticated"인 경우', () => {
      given('error', () => ('unauthenticated'));

      it('errorToast가 호출되어야만 한다', () => {
        renderRecruitPostsContainer();

        expect(errorToast).toBeCalledWith('접근 권한이 없는 페이지에요.');
      });
    });
  });

  context('그룹 리스트가 존재하는 경우', () => {
    it('그룹 리스트가 보여야만 한다', () => {
      const { container } = renderRecruitPostsContainer();

      expect(container).toHaveTextContent('title');
    });
  });
});
