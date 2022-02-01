import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import useFetchUserAppliedGroups from '@/hooks/api/group/useFetchUserAppliedGroups';

import FIXTURE_GROUP from '../../../fixtures/group';

import AppliedPage from './applied.page';

jest.mock('@/hooks/api/group/useFetchUserAppliedGroups');

describe('AppliedPage', () => {
  beforeEach(() => {
    (useFetchUserAppliedGroups as jest.Mock).mockImplementation(() => ({
      data: [FIXTURE_GROUP],
      isLoading: false,
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: null,
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
