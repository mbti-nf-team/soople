import { createRef } from 'react';

import { render } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useInfiniteFetchUserAppliedGroups from '@/hooks/api/group/useInfiniteFetchUserAppliedGroups';

import FIXTURE_GROUP from '../../../fixtures/group';

import AppliedPage from './applied.page';

jest.mock('@/hooks/api/group/useInfiniteFetchUserAppliedGroups');
jest.mock('@/hooks/api/auth/useFetchUserProfile');

describe('AppliedPage', () => {
  beforeEach(() => {
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: {
        uid: '1',
      },
    }));
    (useInfiniteFetchUserAppliedGroups as jest.Mock).mockImplementation(() => ({
      query: {
        data: {
          pages: [{
            items: [FIXTURE_GROUP],
          }],
        },
        isLoading: given.isLoading,
        isIdle: false,
      },
      refState: {
        lastItemRef: jest.fn(),
        wrapperRef: createRef(),
      },
    }));
  });

  const renderAppliedPage = () => render((
    <AppliedPage />
  ));

  it('신청한 팀 페이지에 대한 내용이 보여야만 한다', () => {
    const { container } = renderAppliedPage();

    expect(container).toHaveTextContent(FIXTURE_GROUP.title);
  });
});
