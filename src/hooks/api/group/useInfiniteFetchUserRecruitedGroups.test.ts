import { useInView } from 'react-intersection-observer';

import { waitFor } from '@testing-library/react';

import { getUserRecruitedGroups } from '@/services/api/group';
import renderSuspenseHook from '@/test/renderSuspenseHook';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useInfiniteFetchUserRecruitedGroups from './useInfiniteFetchUserRecruitedGroups';

jest.mock('@/services/api/group');

describe('useInfiniteFetchUserRecruitedGroups', () => {
  const responseGroups = {
    items: [FIXTURE_GROUP],
    lastUid: '1',
  };

  const useInfiniteFetchUserRecruitedGroupsHook = () => renderSuspenseHook(
    () => useInfiniteFetchUserRecruitedGroups({ perPage: 10, userUid: 'userUid' }),
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (useInView as jest.Mock).mockImplementation(() => ({
      ref: jest.fn(),
      inView: false,
    }));

    (getUserRecruitedGroups as jest.Mock).mockImplementation(() => (responseGroups));
  });

  it('getUserRecruitedGroups를 한 번 호출 후 반환해야만 한다', async () => {
    const { result } = useInfiniteFetchUserRecruitedGroupsHook();

    await waitFor(() => result.current.query.isSuccess);

    expect(getUserRecruitedGroups).toBeCalledTimes(1);
    expect(result.current.query.data?.pages).toEqual([responseGroups]);
  });
});
