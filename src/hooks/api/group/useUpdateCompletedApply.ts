import { useMutation, useQueryClient } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { AlarmForm } from '@/models/alarm';
import { Group } from '@/models/group';
import { postAddAlarm } from '@/services/api/alarm';
import { patchCompletedGroup } from '@/services/api/group';

import useCatchErrorWithToast from '../useCatchErrorWithToast';

type CompletedGroupResponse = {
  groupId: string;
  numberConfirmApplicants: number;
  alarmForms: AlarmForm[];
}

function useUpdateCompletedApply() {
  const queryClient = useQueryClient();

  const mutation = useMutation<[void, ...string[]], FirestoreError, CompletedGroupResponse>((
    { groupId, numberConfirmApplicants, alarmForms },
  ) => Promise.all([
    patchCompletedGroup(groupId, numberConfirmApplicants),
    ...alarmForms.map(postAddAlarm),
  ]), {
    onSuccess: (_: [void, ...string[]], {
      groupId, numberConfirmApplicants,
    }: CompletedGroupResponse) => {
      queryClient.setQueryData<Group>(['group', groupId], (preGroup) => ({
        ...preGroup as Group,
        numberApplicants: numberConfirmApplicants,
        isCompleted: true,
      }));

      queryClient.invalidateQueries('alarms');
    },
  });

  const { isError, error } = mutation;

  useCatchErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '모집 완료에 실패했어요! 짐시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useUpdateCompletedApply;
