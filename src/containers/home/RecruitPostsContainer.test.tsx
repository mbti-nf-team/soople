import { toast } from 'react-toastify';

import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

import useFetchGroups from '@/hooks/api/useFetchGroups';

import GROUP_FIXTURE from '../../../fixtures/group';

import RecruitPostsContainer from './RecruitPostsContainer';

jest.mock('@/hooks/api/useFetchGroups');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

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

    it('"로딩중..."문구가 보여야만 한다', () => {
      const { container } = renderRecruitPostsContainer();

      expect(container).toHaveTextContent('로딩중...');
    });
  });

  describe('신청현황 페이지에서 권한이 없어서 Redirect여부에 따라 메시지가 보인다', () => {
    context('query에 error가 "unauthenticated"인 경우', () => {
      given('error', () => ('unauthenticated'));

      it('toast.error가 호출되어야만 한다', () => {
        renderRecruitPostsContainer();

        expect(toast.error).toBeCalledWith('해당 페이지를 볼 수 있는 권한이 없어요!');
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
