import { useInView } from 'react-intersection-observer';

import { waitFor } from '@testing-library/react';

import { getUserAppliedGroups } from '@/services/api/applicants';
import renderSuspenseHook from '@/test/renderSuspenseHook';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useInfiniteFetchUserAppliedGroups from './useInfiniteFetchUserAppliedGroups';

jest.mock('@/services/api/applicants');

describe('useInfiniteFetchUserAppliedGroups', () => {
  const responseGroups = {
    items: [FIXTURE_GROUP],
    lastUid: '1',
  };

  const useInfiniteFetchUserAppliedGroupsHook = () => renderSuspenseHook(
    () => useInfiniteFetchUserAppliedGroups({ perPage: 10, userUid: 'userUid' }),
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (useInView as jest.Mock).mockImplementation(() => ({
      ref: jest.fn(),
      inView: false,
    }));

    (getUserAppliedGroups as jest.Mock).mockImplementation(() => (responseGroups));
  });

  it('getUserAppliedGroups를 한 번 호출 후 반환해야만 한다', async () => {
    const { result } = useInfiniteFetchUserAppliedGroupsHook();

    await waitFor(() => result.current.query.isSuccess);

    expect(getUserAppliedGroups).toHaveBeenCalledTimes(1);
    expect(result.current.query.data?.pages).toEqual([responseGroups]);
  });
});
