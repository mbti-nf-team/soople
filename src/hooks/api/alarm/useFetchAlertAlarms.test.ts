import { renderHook, waitFor } from '@testing-library/react';

import { getUserAlertAlarm } from '@/services/api/alarm';
import wrapper from '@/test/ReactQueryWrapper';

import ALARM_FIXTURE from '../../../../fixtures/alarm';
import PROFILE_FIXTURE from '../../../../fixtures/profile';
import useFetchUserProfile from '../auth/useFetchUserProfile';

import useFetchAlertAlarms from './useFetchAlertAlarms';

jest.mock('@/services/api/alarm');
jest.mock('../auth/useFetchUserProfile');

describe('useFetchAlertAlarms', () => {
  const useFetchAlertAlarmsHook = () => renderHook(() => useFetchAlertAlarms(), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: PROFILE_FIXTURE,
    }));
    (getUserAlertAlarm as jest.Mock).mockImplementation(() => (given.alarms));
  });

  given('alarms', () => [ALARM_FIXTURE]);

  it('alarms에 대한 정보를 반환해야만 한다', async () => {
    const { result } = useFetchAlertAlarmsHook();

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data).toEqual([ALARM_FIXTURE]);
  });
});
