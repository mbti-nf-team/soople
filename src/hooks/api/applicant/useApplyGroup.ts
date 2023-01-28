import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import {
  Applicant, ApplyRequest, Group,
} from '@/models/group';
import { postAddAlarm } from '@/services/api/alarm';
import { postAddApplicant } from '@/services/api/applicants';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

type ApplyResponse = {
  uid: string;
  numberApplicants: number;
};

function useApplyGroup() {
  const queryClient = useQueryClient();

  const mutation = useMutation<[ApplyResponse, string], FirestoreError, ApplyRequest>(({
    applicant, group, introduce, portfolioUrl,
  }) => Promise.all([postAddApplicant({
    groupId: group.groupId, introduce, portfolioUrl, applicant,
  }), postAddAlarm({
    applicantUid: applicant.uid, group, userUid: group.writer.uid, type: 'applied',
  })]), {
    onSuccess: ([{ uid, numberApplicants }]: [ApplyResponse, string], {
      group, applicant, introduce, portfolioUrl,
    }: ApplyRequest) => {
      const applicantForm = {
        groupId: group.groupId, applicant, introduce, portfolioUrl,
      };

      queryClient.setQueryData<Applicant[]>(['applicants', group.groupId], (applicants = []) => [
        ...applicants,
        {
          ...applicantForm,
          uid,
          createdAt: new Date().toString(),
          isConfirm: false,
        },
      ]);

      queryClient.setQueryData<Group | undefined>(['group', group.groupId], (prevGroup) => ({
        ...prevGroup as Group,
        numberApplicants,
      }));

      queryClient.invalidateQueries(['alarms']);
    },
  });

  const { isError, error } = mutation;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '신청에 실패했어요! 짐시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useApplyGroup;
