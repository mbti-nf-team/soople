import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { Alarm } from '@/models/alarm';
import { getUserAlarm } from '@/services/api/alarm';

import useFetchUserProfile from '../auth/useFetchUserProfile';
import useCatchErrorWithToast from '../useCatchErrorWithToast';

function useFetchAlarms() {
  const { data: user } = useFetchUserProfile();

  const query = useQuery<Alarm[], FirestoreError>(['alarms'], () => getUserAlarm(user?.uid as string), {
    enabled: !!user,
  });

  const { isError, error, data } = query;

  useCatchErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '알람을 불러오는데 실패했어요!',
  });

  return {
    ...query,
    data: data ?? [],
  };
}

export default useFetchAlarms;
