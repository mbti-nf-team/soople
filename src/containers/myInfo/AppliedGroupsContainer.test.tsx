import { createRef } from 'react';

import { render } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useInfiniteFetchUserAppliedGroups from '@/hooks/api/group/useInfiniteFetchUserAppliedGroups';

import FIXTURE_GROUP from '../../../fixtures/group';
import FIXTURE_PROFILE from '../../../fixtures/profile';

import AppliedGroupsContainer from './AppliedGroupsContainer';

jest.mock('@/hooks/api/group/useInfiniteFetchUserAppliedGroups');
jest.mock('@/hooks/api/auth/useFetchUserProfile');

describe('AppliedGroupsContainer', () => {
  beforeEach(() => {
    (useInfiniteFetchUserAppliedGroups as jest.Mock).mockImplementation(() => ({
      query: {
        data: {
          pages: [{
            items: [FIXTURE_GROUP],
          }],
        },
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

  const renderAppliedGroupsContainer = () => render((
    <AppliedGroupsContainer />
  ));

  it('신청한 팀에 대한 리스트가 나타나야만 한다', () => {
    const { container } = renderAppliedGroupsContainer();

    expect(container).toHaveTextContent(FIXTURE_GROUP.title);
  });
});
