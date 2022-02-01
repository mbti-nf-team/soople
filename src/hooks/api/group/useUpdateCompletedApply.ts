import { useMutation, useQueryClient } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { Group } from '@/models/group';
import { patchCompletedGroup } from '@/services/api/group';

import useCatchErrorWithToast from '../useCatchErrorWithToast';

type CompletedGroupResponse = {
  groupId: string;
  numberConfirmApplicants: number;
}

function useUpdateCompletedApply() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, FirestoreError, CompletedGroupResponse>((
    { groupId, numberConfirmApplicants },
  ) => patchCompletedGroup(groupId, numberConfirmApplicants), {
    onSuccess: (_: void, { groupId, numberConfirmApplicants }: CompletedGroupResponse) => {
      queryClient.setQueryData<Group>(['group', groupId], (group) => ({
        ...group as Group,
        numberApplicants: numberConfirmApplicants,
        isCompleted: true,
      }));
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
