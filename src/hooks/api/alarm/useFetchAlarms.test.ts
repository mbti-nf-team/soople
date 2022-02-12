import { renderHook } from '@testing-library/react-hooks';

import { getUserAlarm } from '@/services/api/alarm';
import wrapper from '@/test/ReactQueryWrapper';

import ALARM_FIXTURE from '../../../../fixtures/alarm';
import PROFILE_FIXTURE from '../../../../fixtures/profile';
import useGetUser from '../auth/useGetUser';

import useFetchAlarms from './useFetchAlarms';

jest.mock('@/services/api/alarm');
jest.mock('../auth/useGetUser');

describe('useFetchAlarms', () => {
  const useFetchAlarmsHook = () => renderHook(() => useFetchAlarms(), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetUser as jest.Mock).mockImplementation(() => ({
      data: PROFILE_FIXTURE,
    }));
    (getUserAlarm as jest.Mock).mockImplementation(() => (given.alarms));
  });

  context('useQuery반환값이 존재하지 않는 경우', () => {
    given('alarms', () => null);

    it('빈 배열을 반환해야만 한다', async () => {
      const { result, waitFor } = useFetchAlarmsHook();

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual([]);
    });
  });

  context('useQuery반환값이 존재하는 경우', () => {
    given('alarms', () => [ALARM_FIXTURE]);

    it('alarms에 대한 정보를 반환해야만 한다', async () => {
      const { result, waitFor } = useFetchAlarmsHook();

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual([ALARM_FIXTURE]);
    });
  });
});
