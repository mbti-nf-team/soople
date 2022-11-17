import { waitFor } from '@testing-library/react';

import { fetchGroups } from '@/services/api/group';
import renderSuspenseHook from '@/test/renderSuspenseHook';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useInfiniteFetchGroups from './useInfiniteFetchGroups';

jest.mock('@/services/api/group');
jest.mock('../auth/useFetchUserProfile');
jest.mock('@/hooks/useIntersectionObserver');

describe('useInfiniteFetchGroups', () => {
  const responseGroups = {
    items: [FIXTURE_GROUP],
    lastUid: '1',
  };

  const useInfiniteFetchGroupsHook = () => renderSuspenseHook(useInfiniteFetchGroups);

  beforeEach(() => {
    jest.clearAllMocks();

    (fetchGroups as jest.Mock).mockImplementation(() => (responseGroups));
  });

  it('groups에 대한 정보를 반환해야만 한다', async () => {
    const { result } = useInfiniteFetchGroupsHook();

    await waitFor(() => result.current.query.isSuccess);

    expect(result.current.query.data.pages).toEqual([responseGroups]);
  });
});
