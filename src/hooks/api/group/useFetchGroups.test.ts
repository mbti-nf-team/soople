import { renderHook } from '@testing-library/react-hooks';

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

  given('groups', () => [FIXTURE_GROUP]);

  it('groups에 대한 정보를 반환해야만 한다', async () => {
    const { result, waitFor } = useFetchGroupsHook();

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual([FIXTURE_GROUP]);
  });
});
