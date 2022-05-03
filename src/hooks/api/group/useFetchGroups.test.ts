import { renderHook, waitFor } from '@testing-library/react';

import { getFilteredGroups } from '@/services/api/group';
import wrapper from '@/test/InjectMockProviders';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useFetchGroups from './useFetchGroups';

jest.mock('@/services/api/group');

describe('useFetchGroups', () => {
  const useFetchGroupsHook = () => renderHook(() => useFetchGroups(), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (getFilteredGroups as jest.Mock).mockImplementation(() => (given.groups));
  });

  context('useQuery반환값이 존재하지 않는 경우', () => {
    given('groups', () => null);

    it('빈 배열을 반환해야만 한다', async () => {
      const { result } = useFetchGroupsHook();

      await waitFor(() => expect(result.current.data).toEqual([]));
    });
  });

  context('useQuery반환값이 존재하는 경우', () => {
    given('groups', () => [FIXTURE_GROUP]);

    it('groups에 대한 정보를 반환해야만 한다', async () => {
      const { result } = useFetchGroupsHook();

      await waitFor(() => expect(result.current.data).toEqual([FIXTURE_GROUP]));
    });
  });
});
