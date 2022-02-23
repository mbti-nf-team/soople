import { useMutation, useQueryClient } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import {
  Applicant, ApplyRequest, Group,
} from '@/models/group';
import { postAddAlarm } from '@/services/api/alarm';
import { postAddApplicant } from '@/services/api/applicants';

import useCatchErrorWithToast from '../useCatchErrorWithToast';

type ApplyResponse = {
  uid: string;
  numberApplicants: number;
}

function useApplyGroup() {
  const queryClient = useQueryClient();

  const mutation = useMutation<[ApplyResponse, string], FirestoreError, ApplyRequest>(({
    applicant, groupId, introduce, portfolioUrl, writerUid,
  }) => Promise.all([postAddApplicant({
    groupId, introduce, portfolioUrl, applicant,
  }), postAddAlarm({
    applicantUid: applicant.uid, groupId, userUid: writerUid, type: 'applied',
  })]), {
    onSuccess: ([{ uid, numberApplicants }]: [ApplyResponse, string], {
      groupId, applicant, introduce, portfolioUrl,
    }: ApplyRequest) => {
      const applicantForm = {
        groupId, applicant, introduce, portfolioUrl,
      };

      queryClient.setQueryData<Applicant[]>(['applicants', groupId], (applicants = []) => [
        ...applicants,
        {
          ...applicantForm,
          uid,
          createdAt: new Date().toString(),
          isConfirm: false,
        },
      ]);

      queryClient.setQueryData<Group | undefined>(['group', groupId], (group) => ({
        ...group as Group,
        numberApplicants,
      }));

      queryClient.invalidateQueries('alarms');
    },
  });

  const { isError, error } = mutation;

  useCatchErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '신청에 실패했어요! 짐시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useApplyGroup;
