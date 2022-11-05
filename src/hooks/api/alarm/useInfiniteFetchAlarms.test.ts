import { waitFor } from '@testing-library/react';

import { getUserAlarms } from '@/services/api/alarm';
import renderSuspenseHook from '@/test/renderSuspenseHook';

import ALARM_FIXTURE from '../../../../fixtures/alarm';
import PROFILE_FIXTURE from '../../../../fixtures/profile';
import useFetchUserProfile from '../auth/useFetchUserProfile';

import useInfiniteFetchAlarms from './useInfiniteFetchAlarms';

jest.mock('@/services/api/alarm');
jest.mock('../auth/useFetchUserProfile');
jest.mock('@/hooks/useIntersectionObserver');

describe('useInfiniteFetchAlarms', () => {
  const responseAlarms = {
    items: [ALARM_FIXTURE],
    lastUid: '1',
  };

  const useInfiniteFetchAlarmsHook = () => renderSuspenseHook(() => useInfiniteFetchAlarms({
    userUid: 'userUid',
  }));

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: PROFILE_FIXTURE,
    }));
    (getUserAlarms as jest.Mock).mockImplementation(() => (responseAlarms));
  });

  it('alarms에 대한 정보를 반환해야만 한다', async () => {
    const { result } = useInfiniteFetchAlarmsHook();

    await waitFor(() => result.current.query.isSuccess);

    expect(result.current.query.data.pages).toEqual([responseAlarms]);
  });
});
