import { waitFor } from '@testing-library/react';

import { fetchGroups } from '@/services/api/group';
import renderSuspenseHook from '@/test/renderSuspenseHook';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useFetchGroups from './useFetchGroups';

jest.mock('@/services/api/group');

describe('useFetchGroups', () => {
  const useFetchGroupsHook = () => renderSuspenseHook(useFetchGroups);

  beforeEach(() => {
    jest.clearAllMocks();

    (fetchGroups as jest.Mock).mockImplementation(() => (given.groups));
  });

  given('groups', () => [FIXTURE_GROUP]);

  it('groups에 대한 정보를 반환해야만 한다', async () => {
    const { result } = useFetchGroupsHook();

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual([FIXTURE_GROUP]);
  });
});
