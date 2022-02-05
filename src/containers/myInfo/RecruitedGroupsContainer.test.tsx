import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import useGetUser from '@/hooks/api/auth/useGetUser';
import useFetchUserRecruitedGroups from '@/hooks/api/group/useFetchUserRecruitedGroups';

import FIXTURE_GROUP from '../../../fixtures/group';
import FIXTURE_PROFILE from '../../../fixtures/profile';

import RecruitedGroupsContainer from './RecruitedGroupsContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/group/useFetchUserRecruitedGroups');
jest.mock('@/hooks/api/auth/useGetUser');

describe('RecruitedGroupsContainer', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    mockPush.mockClear();

    (useFetchUserRecruitedGroups as jest.Mock).mockImplementation(() => ({
      data: [FIXTURE_GROUP],
      isLoading: given.isLoading,
    }));
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
    (useGetUser as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));
  });

  const renderRecruitedGroupsContainer = () => render((
    <RecruitedGroupsContainer />
  ));

  context('로딩중인 경우', () => {
    given('isLoading', () => true);

    it('"로딩중..." 문구가 나타나야만 한다', () => {
      const { container } = renderRecruitedGroupsContainer();

      expect(container).toHaveTextContent('로딩중...');
    });
  });

  context('로딩중이 아닌 경우', () => {
    given('isLoading', () => false);

    describe('group을 클릭한다', () => {
      it('router.push가 해당 글 url과 함께 호출되어야만 한다', () => {
        renderRecruitedGroupsContainer();

        fireEvent.click(screen.getByText(FIXTURE_GROUP.title));

        expect(mockPush).toBeCalledWith(`/detail/${FIXTURE_GROUP.groupId}`);
      });
    });
  });
});
