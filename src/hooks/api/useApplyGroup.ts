import { useMutation, useQueryClient } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import {
  Applicant, ApplicantFields, Group,
} from '@/models/group';
import { postAddApplicant } from '@/services/api/applicants';

import useCatchErrorWithToast from '../useCatchErrorWithToast';

type AddApplicantResponse = {
  uid: string;
  numberApplicants: number;
}

function useApplyGroup() {
  const queryClient = useQueryClient();

  const mutation = useMutation<AddApplicantResponse, FirestoreError, ApplicantFields>((
    applicantForm,
  ) => postAddApplicant(applicantForm), {
    onSuccess: ({
      uid, numberApplicants,
    }: AddApplicantResponse, applicantForm: ApplicantFields) => {
      const { groupId } = applicantForm;

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
