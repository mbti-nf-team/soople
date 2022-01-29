import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import FIXTURE_GROUP from '../../../fixtures/group';
import FIXTURE_PROFILE from '../../../fixtures/profile';

import RecruitedGroupsContainer from './RecruitedGroupsContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('RecruitedGroupsContainer', () => {
  const dispatch = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockPush.mockClear();

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: FIXTURE_PROFILE,
      },
      myInfoReducer: {
        recruitedGroups: [FIXTURE_GROUP],
      },
    }));
  });

  const renderRecruitedGroupsContainer = () => render((
    <RecruitedGroupsContainer />
  ));

  it('렌더링 시 dispatch 액션이 호출되어야만 한다', () => {
    renderRecruitedGroupsContainer();

    expect(dispatch).toBeCalledTimes(1);
  });

  describe('group을 클릭한다', () => {
    it('router.push가 해당 글 url과 함께 호출되어야만 한다', () => {
      renderRecruitedGroupsContainer();

      fireEvent.click(screen.getByText(FIXTURE_GROUP.title));

      expect(mockPush).toBeCalledWith(`/detail/${FIXTURE_GROUP.groupId}`);
    });
  });
});
