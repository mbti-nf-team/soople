import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { GroupQuery } from '@/models';
import { Applicant, Group } from '@/models/group';
import { deleteApplicant } from '@/services/api/applicants';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useCancelApply() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id: groupId } = router.query as GroupQuery;

  const mutation = useMutation<number, FirestoreError, string>((
    applicantId,
  ) => deleteApplicant({ applicantId, groupId }), {
    onSuccess: (numberApplicants: number, applicantId: string) => {
      queryClient.setQueryData<Applicant[]>(['applicants', groupId], filteredRemoveApplicant(applicantId));
      queryClient.setQueryData<Group | undefined>(['group', groupId], (group) => ({
        ...group as Group,
        numberApplicants,
      }));
    },
  });

  const { isError, error } = mutation;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '신청 취소에 실패했어요! 잠시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useCancelApply;

export const filteredRemoveApplicant = (removeId: string) => (
  applicants: Applicant[] = [],
) => applicants.filter(({ uid }) => uid !== removeId);
