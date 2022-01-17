import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

import GROUP_FIXTURE from '../../../fixtures/group';

import RecruitPostsContainer from './RecruitPostsContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('RecruitPostsContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    jest.clearAllMocks();

    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      groupReducer: {
        groups: given.groups,
      },
    }));
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        error: given.error,
      },
    }));
  });

  const renderRecruitPostsContainer = () => render((
    <RecruitPostsContainer />
  ));

  it('초기 렌더링에 dispatch 액션이 호출되어야만 한다', () => {
    renderRecruitPostsContainer();

    expect(dispatch).toBeCalledTimes(1);
  });

  context('그룹 리스트가 존재하지 않는 경우', () => {
    given('groups', () => []);

    it('"로딩중..."문구가 보여야만 한다', () => {
      const { container } = renderRecruitPostsContainer();

      expect(container).toHaveTextContent('로딩중...');
    });
  });

  context('그룹 리스트가 존재하는 경우', () => {
    given('groups', () => [GROUP_FIXTURE]);

    it('그룹 리스트가 보여야만 한다', () => {
      const { container } = renderRecruitPostsContainer();

      expect(container).toHaveTextContent('title');
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

    context('query에 error가 없을 경우', () => {
      given('error', () => (''));

      it('toast.error가 호출되지 않아야만 한다', () => {
        renderRecruitPostsContainer();

        expect(toast.error).not.toBeCalled();
      });
    });
  });
});
