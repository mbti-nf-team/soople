import { useMutation, useQueryClient } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { patchAlarmViewed } from '@/services/api/alarm';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useUpdateAlarmViewed() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, FirestoreError, string>((
    alarmUid,
  ) => patchAlarmViewed(alarmUid), {
    onSuccess: () => queryClient.invalidateQueries(['alarms']),
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
