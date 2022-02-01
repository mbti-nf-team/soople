import { renderHook } from '@testing-library/react-hooks';

import { getUserAppliedGroups } from '@/services/api/applicants';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useFetchUserAppliedGroups from './useFetchUserAppliedGroups';

jest.mock('@/services/api/applicants');

describe('useFetchUserAppliedGroups', () => {
  const useFetchUserAppliedGroupsHook = () => renderHook(() => useFetchUserAppliedGroups('userUid'), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (getUserAppliedGroups as jest.Mock).mockImplementation(() => (given.groups));
  });

  context('useQuery 반환값이 존재하지 않는 경우', () => {
    given('groups', () => null);

    it('빈 배열을 반환해야만 한다', async () => {
      const { result, waitFor } = useFetchUserAppliedGroupsHook();

      await waitFor(() => !!result.current.data);

      expect(result.current.data).toEqual([]);
    });
  });

  context('useQuery 반환값이 존재하는 경우', () => {
    given('groups', () => [FIXTURE_GROUP]);

    it('groups에 대한 정보를 반환해야만 한다', async () => {
      const { result, waitFor } = useFetchUserAppliedGroupsHook();

      await waitFor(() => !!result.current.data);

      expect(result.current.data).toEqual([FIXTURE_GROUP]);
    });
  });
});
