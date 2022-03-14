import { useMutation, useQueryClient } from 'react-query';

import { FirestoreError } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { AlarmForm } from '@/models/alarm';
import { CompletedGroupForm, Group } from '@/models/group';
import { postAddAlarm } from '@/services/api/alarm';
import { patchCompletedGroup } from '@/services/api/group';
import { successToast } from '@/utils/toast';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

type CompletedGroupResponse = {
  groupId: string;
  completedGroupForm: CompletedGroupForm;
  alarmForms: AlarmForm[];
}

function useUpdateCompletedApply() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<[void, ...string[]], FirestoreError, CompletedGroupResponse>((
    { groupId, completedGroupForm, alarmForms },
  ) => Promise.all([
    patchCompletedGroup(groupId, completedGroupForm),
    ...alarmForms.map(postAddAlarm),
  ]), {
    onSuccess: (_: [void, ...string[]], {
      groupId, completedGroupForm,
    }: CompletedGroupResponse) => {
      queryClient.setQueryData<Group>(['group', groupId], (preGroup) => ({
        ...preGroup as Group,
        ...completedGroupForm,
        isCompleted: true,
      }));

      queryClient.invalidateQueries('alarms');

      router.replace(`/detail/${groupId}`);
      successToast('팀 모집을 완료했어요.');
    },
  });

  const { isError, error } = mutation;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '모집 완료에 실패했어요! 짐시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useUpdateCompletedApply;
