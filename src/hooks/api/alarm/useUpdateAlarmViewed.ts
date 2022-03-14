import { useMutation, useQueryClient } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { Alarm } from '@/models/alarm';
import { patchAlarmViewed } from '@/services/api/alarm';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useUpdateAlarmViewed() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, FirestoreError, string>((
    alarmUid,
  ) => patchAlarmViewed(alarmUid), {
    onSuccess: (_, alarmUid) => {
      queryClient.setQueryData<Alarm[]>(['alarms'], updateAlarms(alarmUid));
    },
  });

  const { isError, error } = mutation;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '알람 상태를 업데이트하는데 실패했어요! 잠시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useUpdateAlarmViewed;

export const updateAlarms = (alarmUid: string) => (alarms: Alarm[] = []) => alarms.map((alarm) => {
  if (alarm.uid === alarmUid) {
    return {
      ...alarm,
      isViewed: true,
    };
  }

  return alarm;
});
