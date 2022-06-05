import { act, renderHook } from '@testing-library/react-hooks';

import { getInfiniteUserRecruitedGroups } from '@/services/api/group';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useInfiniteFetchUserRecruitedGroups from './useInfiniteFetchUserRecruitedGroups';

jest.mock('@/services/api/group');

describe('useInfiniteFetchUserRecruitedGroups', () => {
  const useInfiniteFetchUserRecruitedGroupsHook = () => renderHook(
    () => useInfiniteFetchUserRecruitedGroups({ perPage: 10, userUid: 'userUid' }),
    { wrapper },
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (getInfiniteUserRecruitedGroups as jest.Mock).mockImplementation(() => (given.groups));
  });

  context('lastUid가 존재하는 경우', () => {
    const responseGroups = {
      items: [FIXTURE_GROUP],
      lastUid: '1',
    };

    given('groups', () => (responseGroups));

    it('groups를 반환해야 한다.', async () => {
      const { result } = useInfiniteFetchUserRecruitedGroupsHook();

      await act(async () => {
        await result.current.fetchNextPage();
      });

      expect(getInfiniteUserRecruitedGroups).toBeCalled();
      expect(result.current.data.pages).toEqual([responseGroups]);
    });
  });

  context('lastUid가 존재하지 않는 경우', () => {
    const responseGroups = {
      items: [FIXTURE_GROUP],
      lastUid: null,
    };

    given('groups', () => (responseGroups));

    it('groups를 반환해야 한다.', async () => {
      const { result, waitFor } = useInfiniteFetchUserRecruitedGroupsHook();

      await waitFor(() => result.current.isSuccess);

      expect(getInfiniteUserRecruitedGroups).toBeCalled();
      expect(result.current.data.pages).toEqual([responseGroups]);
    });
  });
});
