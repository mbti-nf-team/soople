import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { AlertAlarm } from '@/models/alarm';
import { getUserAlertAlarm } from '@/services/api/alarm';
import { checkEmpty } from '@/utils/utils';

import useFetchUserProfile from '../auth/useFetchUserProfile';
import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchAlertAlarms() {
  const { data: user } = useFetchUserProfile();

  const query = useQuery<AlertAlarm[], FirestoreError>(['alertAlarms'], () => getUserAlertAlarm(user?.uid as string), {
    enabled: !!user,
  });

  const { isError, error, data } = query;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '알람을 불러오는데 실패했어요!',
  });

  return {
    ...query,
    data: checkEmpty(data),
  };
}

export default useFetchAlertAlarms;
