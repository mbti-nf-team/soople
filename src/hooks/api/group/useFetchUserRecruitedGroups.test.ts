import { renderHook } from '@testing-library/react-hooks';

import { getUserRecruitedGroups } from '@/services/api/group';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useFetchUserRecruitedGroups from './useFetchUserRecruitedGroups';

jest.mock('@/services/api/group');

describe('useFetchUserRecruitedGroups', () => {
  const useFetchUserRecruitedGroupsHook = () => renderHook(() => useFetchUserRecruitedGroups('userUid'), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (getUserRecruitedGroups as jest.Mock).mockImplementation(() => (given.groups));
  });

  context('useQuery 반환값이 존재하지 않는 경우', () => {
    given('groups', () => null);

    it('빈 배열을 반환해야만 한다', async () => {
      const { result, waitFor } = useFetchUserRecruitedGroupsHook();

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual([]);
    });
  });

  context('useQuery 반환값이 존재하는 경우', () => {
    given('groups', () => [FIXTURE_GROUP]);

    it('groups에 대한 정보를 반환해야만 한다', async () => {
      const { result, waitFor } = useFetchUserRecruitedGroupsHook();

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual([FIXTURE_GROUP]);
    });
  });
});
