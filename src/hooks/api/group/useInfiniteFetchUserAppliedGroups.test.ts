import { useInView } from 'react-intersection-observer';

import { renderHook } from '@testing-library/react-hooks';

import { getUserAppliedGroups } from '@/services/api/applicants';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useInfiniteFetchUserAppliedGroups from './useInfiniteFetchUserAppliedGroups';

jest.mock('@/services/api/applicants');

describe('useInfiniteFetchUserAppliedGroups', () => {
  const responseGroups = {
    items: [FIXTURE_GROUP],
    lastUid: '1',
  };

  const useInfiniteFetchUserAppliedGroupsHook = () => renderHook(
    () => useInfiniteFetchUserAppliedGroups({ perPage: 10, userUid: 'userUid' }),
    { wrapper },
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (useInView as jest.Mock).mockImplementation(() => ({
      ref: jest.fn(),
      inView: given.inView,
    }));

    (getUserAppliedGroups as jest.Mock).mockImplementation(() => (responseGroups));
  });

  context('inView가 true인 경우', () => {
    given('inView', () => true);

    it('getUserAppliedGroups가 두 번 호출 후 반환해야만 한다', async () => {
      const { result, waitFor } = useInfiniteFetchUserAppliedGroupsHook();

      await waitFor(() => result.current.query.isSuccess);

      expect(getUserAppliedGroups).toBeCalledTimes(2);
      expect(result.current.query.data?.pages).toEqual([
        responseGroups, responseGroups,
      ]);
    });
  });

  context('inView가 false인 경우', () => {
    given('inView', () => false);

    it('getUserAppliedGroups를 한 번 호출 후 반환해야만 한다', async () => {
      const { result, waitFor } = useInfiniteFetchUserAppliedGroupsHook();

      await waitFor(() => result.current.query.isSuccess);

      expect(getUserAppliedGroups).toBeCalledTimes(1);
      expect(result.current.query.data?.pages).toEqual([responseGroups]);
    });
  });
});
