import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import GROUP_FIXTURE from '../../../fixtures/group';

import RecruitPostsContainer from './RecruitPostsContainer';

describe('RecruitPostsContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      groupReducer: {
        groups: given.groups,
      },
    }));
  });

  const renderRecruitPostsContainer = () => render((
    <RecruitPostsContainer />
  ));

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
});
