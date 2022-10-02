import { createRef } from 'react';

import { render, screen } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useInfiniteFetchUserRecruitedGroups from '@/hooks/api/group/useInfiniteFetchUserRecruitedGroups';

import FIXTURE_GROUP from '../../../fixtures/group';
import FIXTURE_PROFILE from '../../../fixtures/profile';

import RecruitedGroupsContainer from './RecruitedGroupsContainer';

jest.mock('@/hooks/api/group/useInfiniteFetchUserRecruitedGroups');
jest.mock('@/hooks/api/auth/useFetchUserProfile');

describe('RecruitedGroupsContainer', () => {
  beforeEach(() => {
    (useInfiniteFetchUserRecruitedGroups as jest.Mock).mockImplementation(() => ({
      query: {
        data: {
          pages: [{
            items: [FIXTURE_GROUP],
          }],
        },
        isLoading: given.isLoading,
        fetchStatus: 'idle',
      },
      refState: {
        lastItemRef: jest.fn(),
        wrapperRef: createRef(),
      },
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));
  });

  const renderRecruitedGroupsContainer = () => render((
    <RecruitedGroupsContainer />
  ));

  context('로딩중인 경우', () => {
    given('isLoading', () => true);

    it('로딩 스켈레톤이 나타나야만 한다', () => {
      renderRecruitedGroupsContainer();

      expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
    });
  });

  context('로딩중이 아닌 경우', () => {
    given('isLoading', () => false);

    it('모집한 팀에 대한 리스트가 나타나야만 한다', () => {
      const { container } = renderRecruitedGroupsContainer();

      expect(container).toHaveTextContent(FIXTURE_GROUP.title);
    });
  });
});
