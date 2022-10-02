import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import { Applicant } from '@/models/group';
import { putApplicant } from '@/services/api/applicants';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useUpdateApplicant() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, FirestoreError, Applicant>((
    applicantForm,
  ) => putApplicant(applicantForm), {
    onSuccess: (_: void, applicantForm: Applicant) => {
      queryClient.setQueryData<Applicant[]>(['applicants', applicantForm.groupId], updateApplicant(applicantForm));
    },
  });

  const { isError, error } = mutation;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '신청자 정보 변경에 실패했어요! 짐시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useUpdateApplicant;

export const updateApplicant = (newApplicant: Applicant) => (
  applicants: Applicant[] = [],
) => applicants.map((applicant) => {
  if (newApplicant.uid === applicant.uid) {
    return newApplicant;
  }

  return applicant;
});
